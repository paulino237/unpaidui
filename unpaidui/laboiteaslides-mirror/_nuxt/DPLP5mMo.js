//# allFunctionsCalledOnLoad
import{F as e,M as t,N as n,S as r,j as i}from"#entry";import{t as a}from"./BfrOQakY.js";import{t as o}from"./LrUeryJ3.js";var s=`varying vec2 vUv;

void main()
{
    vUv = uv;

    gl_Position = vec4(position.xy, .0, 1.0);
}`,c=`uniform float uTime;
uniform float uSpeed;
uniform float uCurveSharpness;
uniform float uNoiseStrength;
uniform float uWaveFrequency;
uniform float uWaveAmplitude;
uniform float uWaveSpeed;
uniform float uParallax;

uniform vec3 uColorTopInitial;
uniform vec3 uColorBottomInitial;
uniform vec3 uColorTopFinal;
uniform vec3 uColorBottomFinal;

uniform float uTransitionFinal;
uniform float uCurveAmountFinal;

#define UNIFORMS

varying vec2 vUv;

vec3 linearToSrgb(vec3 linear) {
    return mix(
        linear * 12.92,
        pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,
        step(0.0031308, linear)
    );
}

float computeCurvedLineMask(float transition, float curveSharpness, float curveAmount, float uvX, float uvY) {
    if (transition <= 0.0) {
        return 0.0;
    }

    
    
    float normalizedX = (uvX - 0.5) * 2.0;
    
    
    float curveOffset = normalizedX * normalizedX * curveAmount;
    
    
    
    
    float maxCurveOffset = abs(curveAmount);
    float baseHeight = mix(-maxCurveOffset, 1.0, transition);
    float curveHeight = baseHeight - curveOffset;
    
    
    curveHeight = clamp(curveHeight, 0.0, 1.0);
    
    
    
    float edgeSmooth = 0.015 * (10.0 - curveSharpness);
    return 1.0 - smoothstep(curveHeight - edgeSmooth, curveHeight + edgeSmooth, uvY);
}

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    float wave1      = sin((vUv.x + uTime * uWaveSpeed) * uWaveFrequency) * uWaveAmplitude;
    float wave2      = sin((vUv.x * 1.7 - uTime * uWaveSpeed * 1.3) * (uWaveFrequency * 0.6) + vUv.y * 3.14159) * (uWaveAmplitude * 0.6);
    float waveOffset = wave1 + wave2;

    float scroll       = fract(vUv.y + waveOffset + uTime * uSpeed);
    float curvedScroll = pow(scroll, 1.2);

    vec3 baseGradient = mix(linearToSrgb(uColorBottomInitial), linearToSrgb(uColorTopInitial), curvedScroll);

    #define GRADIENT

    baseGradient = mix(baseGradient, mix(linearToSrgb(uColorBottomFinal), linearToSrgb(uColorTopFinal), curvedScroll), computeCurvedLineMask(uTransitionFinal, uCurveSharpness, uCurveAmountFinal, vUv.x, vUv.y));

    float grain = noise(vec2(vUv.x * 4.0 + waveOffset * 2.0, vUv.y * 4.0 + uTime * 0.25));
    baseGradient += (grain - 0.5) * uNoiseStrength;

    float vignette = smoothstep(1.1, 0.35, distance(vUv, vec2(0.5)));
    baseGradient *= mix(0.85, 1.05, vignette + uParallax * waveOffset);

    gl_FragColor = vec4(baseGradient, 1.0);
}`,l=class l{static#e=[null,null];static#t=[null,null];static#n=[null,null];static#r=[null,null];static#i=[null,null];static#a=[null,null];static#o=[null,null];static#s={top:l.#t[0],bottom:l.#t[1],transition:1};static#c={top:l.#i[0],bottom:l.#i[1],transition:0};static#l=c.split(/#define\s*UNIFORMS|#define\s*GRADIENT/);static#u={uTime:{value:0},uSpeed:{value:.06},uCurveSharpness:{value:10},uNoiseStrength:{value:.12},uWaveFrequency:{value:2.3},uWaveAmplitude:{value:.59},uWaveSpeed:{value:.06},uParallax:{value:.15},uColorTopInitial:{value:l.#s.top},uColorBottomInitial:{value:l.#s.bottom},uColorTopFinal:{value:l.#c.top},uColorBottomFinal:{value:l.#c.bottom},uTransitionFinal:l.#E(l.#c),uCurveAmountFinal:{value:.3}};static#d=new Map;static#f=[];static#p=[l.#s];static#m=[];static#h=[];static#g=[[`LIFE`,l.#L],[`DEATH`,l.#R]];static#_=!1;static#v=0;static#y;static#b;static#x;static#S=null;static[t];static get COLOR_BLK(){return l.#e}static get COLOR_LGH(){return l.#t}static get COLOR_DRK(){return l.#n}static get COLOR_GRY(){return l.#r}static get COLOR_PRM(){return l.#i}static get COLOR_SCD(){return l.#a}static get COLOR_TRT(){return l.#o}static get BASE_UNIFORMS(){return l.#u}static get STATES(){return l.#p}static get mesh(){return l.#x}static#C(){l.#e[0]=l.#e[1]=new l[t].three.Color(o),l.#t[0]=l.#u.uColorTopInitial.value=l.#s.top=new l[t].three.Color(a.lgh1),l.#t[1]=l.#u.uColorBottomInitial.value=l.#s.bottom=new l[t].three.Color(15592941),l.#n[0]=new l[t].three.Color(a.drk1),l.#n[1]=new l[t].three.Color(1048637),l.#r[0]=new l[t].three.Color(a.gry1),l.#r[1]=new l[t].three.Color(13355979),l.#i[0]=l.#u.uColorTopFinal.value=l.#c.top=new l[t].three.Color(a.prm1),l.#i[1]=l.#u.uColorBottomFinal.value=l.#c.bottom=new l[t].three.Color(6369009),l.#a[0]=new l[t].three.Color(a.scd3),l.#a[1]=new l[t].three.Color(6417728),l.#o[0]=new l[t].three.Color(a.trt1),l.#o[1]=new l[t].three.Color(2608881),l.#y=l.#D(),l.#b=l.#O(),l.#x=l.#k(),l.#S=new l[t].Package(new(l[t].Plugin.get(`BASIC`))({eTick:l.#z}),l.#x)}static#w(){r.Thread.sub(l.#B)}static#T(){r.Event.sub(l.#g)}static[e](){l.#C(),l.#T(),l.#N()}static#E(e){return new Proxy({value:e.transition},{set:(t,n,r)=>(n===`value`&&(e.transition=r,l.#N()),t[n]=r,!0)})}static#D(){return new l[t].three.PlaneGeometry(2,2)}static#O(){let[e,n]=l.#A();return new l[t].three.ShaderMaterial({uniforms:e,vertexShader:s,fragmentShader:n,depthWrite:!1,depthTest:!1})}static#k(){let e=new l[t].three.Mesh(l.#y,l.#b);return e.frustumCulled=!1,e.renderOrder=-10,e}static#A(){let e={...l.#u},t=``,n=``;for(let r=0,i=l.#f.length;r<i;r++){let i=l.#f[r];Object.assign(e,i.sharedUniforms),t+=i.sUniforms,n+=i.sGradient}return[e,l.#l[0]+t+l.#l[1]+n+l.#l[2]]}static getTransitionInitialFrom(e){return 1-Math.min(e.offsetHeight/r.App.lh,1)}static getCurveAmountInitialFrom(e,t=.3){return Math.min(e.offsetHeight/r.App.lh,t)}static add(e,t,n){let r=n.length,i=l.#d.get(e);if(i){if(l.#_){let t=l.#h.indexOf(e);~t&&l.#h.splice(t,1)}if(i.length===r&&i.order===t)return i.uniforms;this.#j(e)}let a={},o={},s=0;for(let e=l.#f.length;s<e&&!(l.#f[s].order>t);s++);let c={order:t,length:r,uniforms:a,sharedUniforms:o,sUniforms:``,sGradient:``,states:Array(r)};for(let e=0,t=1;e<r;e++,t++){let[r,i]=n[e],s=`uColorTop${t}`,u=`uColorBottom${t}`,d=`uTransition${t}`,f=`uCurveAmount${t}`,p=`uColorTop${l.#v}`,m=`uColorBottom${l.#v}`,h=`uTransition${l.#v}`,g=`uCurveAmount${l.#v++}`;a[s]=o[p]={value:r},a[u]=o[m]={value:i},a[d]=o[h]=l.#E(c.states[e]={top:r,bottom:i,transition:0}),a[f]=o[g]={value:.3},c.sUniforms+=`uniform vec3 ${p};uniform vec3 ${m};uniform float ${h};uniform float ${g};`,c.sGradient+=`baseGradient = mix(baseGradient, mix(linearToSrgb(${m}), linearToSrgb(${p}), curvedScroll), computeCurvedLineMask(${h}, uCurveSharpness, ${g}, vUv.x, vUv.y));`}return l.#f.splice(s,0,c),l.#d.set(e,c),l.#w(),a}static#j(e){let t=l.#d.get(e);if(!t)return;let n=l.#f.indexOf(t);~n?l.#f.splice(n,1):i.warn(`BACKGROUND`,`UNABLE TO LOCATE THE DATA.`),l.#d.delete(e),l.#w()}static remove(e){l.#_?l.#h.push(e):l.#j(e)}static#M(){l.#b.dispose(),l.#x.material=l.#b=l.#O()}static#N(){l.#p.length!==1&&(l.#p.length=1);let e=l.#s;l.#p[0]=e;for(let e=0,t=l.#f.length;e<t;e++){let t=l.#f[e];for(let e=0;e<t.length;e++){let n=t.states[e];n.transition&&l.#V(n)}}l.#c.transition&&l.#V(l.#c);for(let e=0,t=l.#m.length;e<t;e++)l.#m[e](l.#p)}static#P(){l.#y?.dispose(),l.#b?.dispose(),l.#d.size&&l.#d.clear(),l.#f=[],l.#p=[l.#s],l.#m=[],l.#h=[],l.#S?.clear()}static#F(){r.Thread.unsub(l.#B)}static#I(){r.Event.unsub(l.#g)}static[n](){l.#P(),l.#F(),l.#I()}static#L(){l.#U()}static#R(){l.#W()}static#z(){l.#u.uTime.value+=l[t].Spider.delta}static#B(){l.#M(),l.#N()}static#V(e){let t=l.#p.length,n=t-1;do if(l.#p[n].transition>e.transition)break;while(--n>-1);l.#p.splice(n+1,t,e)}static#H(){let e=l.#h.length;if(e){for(let t=0;t<e;t++)l.#j(l.#h[t]);l.#h.length=0}}static#U(){l.#_=!1,l.#H()}static#W(){l.#_=!0}static sub(e){if(~l.#m.indexOf(e))return i.warn(`BACKGROUND`,`ALREADY SUBSCRIBED.`);l.#m.push(e),e(l.#p)}static unsub(e){let t=l.#m.indexOf(e);~t?l.#m.splice(t,1):i.warn(`BACKGROUND`,`NOT SUBSCRIBED.`)}static wait(){return r.Thread.wait(l.#B)}};export{l as t};