// Authentic simulation engine extracted from original Kilowatt bundle

export const HOME_CONFIG = {
  battery: 13.5,
  batteryPower: 5,
  reserve: 0.2,
  overnightTarget: 0.9,
  solarPeak: 4.4,
  car: { power: 7, from: 3, to: 4.5 },
  flat: { price: 24.5, export: 15, carFrom: 18, carTo: 19.5 },
  peak: { from: 16, to: 19, sell: 1.6 },
  heatPump: [
    [6.5, 9],
    [15, 16],
    [19, 21.5],
  ],
  backupLoad: 1,
};

const slotToHour = (slot: number) => slot / 2;

export const DAY_PRICES = Array.from({ length: 48 }, (_, i) => {
  const h = slotToHour(i);
  return h < 1.5
    ? 13.4 - 2.2 * h
    : h < 5
    ? 7.2 + 0.9 * Math.abs(h - 3.2)
    : h < 7
    ? 9 + (h - 5) * 6.4
    : h < 16
    ? 21.6 + 3.1 * Math.sin(((h - 7) / 9) * Math.PI)
    : h < 19
    ? 34.8 + 3.4 * Math.sin(((h - 16) / 3) * Math.PI)
    : 24.5 - (h - 19) * 2.3;
}).map((p) => Math.round(10 * p) / 10);

export const EXPORT_PRICES = DAY_PRICES.map((p) => Math.round(0.55 * p * 10) / 10);

export const SOLAR_PROFILE = Array.from({ length: 48 }, (_, i) => {
  const h = slotToHour(i) + 0.25;
  if (h < 6 || h > 19.5) return 0;
  const rad = Math.sin(((h - 6) / 13.5) * Math.PI) ** 1.6;
  return Math.round(HOME_CONFIG.solarPeak * rad * (h > 11 && h < 12.5 ? 0.45 : 1) * 10) / 10;
});

export const LOAD_PROFILE = Array.from({ length: 48 }, (_, i) => {
  const h = slotToHour(i);
  let base = 0.35;
  if (h >= 6.5 && h < 9) base += 1.3;
  if (h >= 12 && h < 13.5) base += 0.5;
  if (h >= 15 && h < 16) base += 1.4;
  if (h >= 17 && h < 21.5) base += 1.6;
  if (h >= 21.5 && h < 23) base += 0.6;
  return Math.round(10 * base) / 10;
});

export interface SlotState {
  h: number;
  price: number;
  solar: number;
  load: number;
  car: number;
  soc: number;
  saved: number;
  cost: number;
  flows: {
    solarHouse: number;
    solarBattery: number;
    solarGrid: number;
    batteryHouse: number;
    batteryGrid: number;
    gridHouse: number;
    gridBattery: number;
    gridCar: number;
  };
}

export const SLOTS_DATA: SlotState[] = (() => {
  let battStored = 0.34 * HOME_CONFIG.battery;
  let accumulatedSavings = 0;
  const list: SlotState[] = [];

  for (let p = 0; p < 48; p++) {
    const h = slotToHour(p);
    const carCharge =
      h >= HOME_CONFIG.car.from && h < HOME_CONFIG.car.to ? HOME_CONFIG.car.power : 0;
    const flows = {
      solarHouse: 0,
      solarBattery: 0,
      solarGrid: 0,
      batteryHouse: 0,
      batteryGrid: 0,
      gridHouse: 0,
      gridBattery: 0,
      gridCar: carCharge,
    };

    const maxChargeRate = (HOME_CONFIG.battery - battStored) / 0.5;
    const availableDischarge =
      Math.max(0, battStored - HOME_CONFIG.battery * HOME_CONFIG.reserve) / 0.5;
    let remLoad = LOAD_PROFILE[p];

    flows.solarHouse = Math.min(SOLAR_PROFILE[p], remLoad);
    remLoad -= flows.solarHouse;
    let remSolar = SOLAR_PROFILE[p] - flows.solarHouse;

    flows.solarBattery = Math.min(remSolar, maxChargeRate, HOME_CONFIG.batteryPower);
    remSolar -= flows.solarBattery;
    flows.solarGrid = remSolar;

    const isOvernightCheap = h >= 1.5 && h < 5;
    const isEveningPeak = h >= HOME_CONFIG.peak.from && h < HOME_CONFIG.peak.to;

    if (isOvernightCheap) {
      flows.gridBattery = Math.min(
        Math.max(0, (HOME_CONFIG.battery * HOME_CONFIG.overnightTarget - battStored) / 0.5),
        HOME_CONFIG.batteryPower
      );
      flows.gridHouse = remLoad;
    } else if (remLoad > 0 && DAY_PRICES[p] > 18 && availableDischarge > 0) {
      flows.batteryHouse = Math.min(remLoad, availableDischarge, HOME_CONFIG.batteryPower);
      flows.gridHouse = remLoad - flows.batteryHouse;
    } else {
      flows.gridHouse = remLoad;
    }

    if (isEveningPeak) {
      const leftoverDischarge = availableDischarge - flows.batteryHouse;
      flows.batteryGrid = Math.max(
        0,
        Math.min(HOME_CONFIG.peak.sell, leftoverDischarge, HOME_CONFIG.batteryPower - flows.batteryHouse)
      );
    }

    battStored +=
      (flows.solarBattery + flows.gridBattery - flows.batteryHouse - flows.batteryGrid) * 0.5;
    battStored = Math.min(HOME_CONFIG.battery, Math.max(0, battStored));

    const totalImport = flows.gridHouse + flows.gridBattery + flows.gridCar;
    const totalExport = flows.solarGrid + flows.batteryGrid;
    const slotCost = (totalImport * DAY_PRICES[p] - totalExport * EXPORT_PRICES[p]) * 0.5 / 100;

    const flatCar =
      h >= HOME_CONFIG.flat.carFrom && h < HOME_CONFIG.flat.carTo ? HOME_CONFIG.car.power : 0;
    const directSolar = Math.min(SOLAR_PROFILE[p], LOAD_PROFILE[p]);
    const baselineCost =
      ((LOAD_PROFILE[p] - directSolar + flatCar) * HOME_CONFIG.flat.price -
        (SOLAR_PROFILE[p] - directSolar) * HOME_CONFIG.flat.export) *
      0.5 /
      100;

    accumulatedSavings += baselineCost - slotCost;

    list.push({
      h,
      price: DAY_PRICES[p],
      solar: SOLAR_PROFILE[p],
      load: LOAD_PROFILE[p],
      car: carCharge,
      soc: battStored / HOME_CONFIG.battery,
      saved: accumulatedSavings,
      cost: slotCost,
      flows,
    });
  }

  return list;
})();

export function getSlotAt(hours: number): SlotState {
  const norm = ((hours % 24) + 24) % 24;
  const idx = Math.min(47, Math.max(0, Math.floor(norm * 2)));
  return SLOTS_DATA[idx];
}

export function getGridKw(slot: SlotState): number {
  return (
    slot.flows.gridHouse +
    slot.flows.gridBattery +
    slot.flows.gridCar -
    slot.flows.solarGrid -
    slot.flows.batteryGrid
  );
}

export function formatClock(hours: number): string {
  const norm = ((hours % 24) + 24) % 24;
  const totalMinutes = Math.round(norm * 60);
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
