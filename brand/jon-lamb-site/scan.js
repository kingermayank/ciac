/* Jon Lamb site runtime: the signal scan and the photo screen, shared with the brand guidelines. */
(() => {
const RM = matchMedia('(prefers-reduced-motion: reduce)');
const reduced = () => RM.matches;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
/* ---------- ramp swatches: the same 45 degree screen, drawn once on a 2D canvas ---------- */
const STOPS = [[[11, 13, 16], [14, 59, 38], [31, 157, 85], [230, 244, 199], [.40, .74]], [[243, 243, 240], [230, 244, 199], [31, 157, 85], [14, 59, 38], [.34, .72]]];
const rampRGB = (mode, f) => { const [a, b, d, e, [s1, s2]] = STOPS[mode]; const mx = (p, q, t) => p.map((v, i) => Math.round(v + (q[i] - v) * t));
  return f < s1 ? mx(a, b, f / s1) : f < s2 ? mx(b, d, (f - s1) / (s2 - s1)) : mx(d, e, (f - s2) / (1 - s2)); };
const drawRamp = cv => { const mode = +cv.dataset.ramp, r = cv.getBoundingClientRect(); if (!r.width) return; const dpr = Math.min(devicePixelRatio || 1, 2);
  cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr); const x = cv.getContext('2d'), W = cv.width, H = cv.height, c = 5 * dpr * Math.SQRT2;
  x.fillStyle = 'rgb(' + rampRGB(mode, 0) + ')'; x.fillRect(0, 0, W, H);
  for (let j = -1; j * c / 2 < H + c; j++) for (let i = -1; i * c < W + c; i++) { const px = i * c + (j & 1) * c / 2, py = j * c / 2, v = Math.min(1, Math.max(0, px / W));
    const h = c / 2 * Math.sqrt(Math.pow(v, .85)) * 1.02; if (h < .3) continue; x.fillStyle = 'rgb(' + rampRGB(mode, Math.min(1, v * .96 + .04)) + ')'; x.beginPath(); x.moveTo(px, py - h); x.lineTo(px + h, py); x.lineTo(px, py + h); x.lineTo(px - h, py); x.fill(); } };
$$('canvas[data-ramp]').forEach(cv => { drawRamp(cv); new ResizeObserver(() => drawRamp(cv)).observe(cv); });

/* ---------- photography: a portrait read through the ramp, as a duotone or through the 45 degree screen ---------- */
const photoData = (img, w, h, fy) => { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
  const k = Math.max(w / img.naturalWidth, h / img.naturalHeight), dw = img.naturalWidth * k, dh = img.naturalHeight * k;
  x.imageSmoothingQuality = 'high'; x.drawImage(img, (w - dw) / 2, (h - dh) * fy, dw, dh); return x.getImageData(0, 0, w, h).data; };
const tone = (d, i) => Math.pow(Math.min(1, Math.max(0, ((d[i] * .2126 + d[i + 1] * .7152 + d[i + 2] * .0722) / 255 - .16) / .66)), 1.08);
const drawPhoto = (cv, img) => { const mode = +(cv.dataset.mode || 0), r = cv.getBoundingClientRect(); if (!r.width || !img.naturalWidth) return;
  const dpr = Math.min(devicePixelRatio || 1, 2), W = cv.width = Math.round(r.width * dpr), H = cv.height = Math.round(r.height * dpr), x = cv.getContext('2d'), fy = +(cv.dataset.fy || .5);
  if (cv.dataset.treat === 'duo') { const d = photoData(img, W, H, fy), vg = +(cv.dataset.vig || .78), out = x.createImageData(W, H), lut = Array.from({ length: 256 }, (_, i) => rampRGB(mode, mode ? 1 - i / 255 * .96 : i / 255 * .97 + .03));
    for (let i = 0; i < d.length; i += 4) { const q = i / 4, dx = (q % W) / W - .5, dy = Math.floor(q / W) / H - (fy * .3 + .33), k = 1 - vg * Math.min(1, Math.max(0, (Math.hypot(dx, dy * .9) - .3) / .34)); const tv = tone(d, i); const c = lut[Math.round((mode ? 1 - (1 - tv) * k : tv * k) * 255)]; out.data[i] = c[0]; out.data[i + 1] = c[1]; out.data[i + 2] = c[2]; out.data[i + 3] = 255; } x.putImageData(out, 0, 0); return; }
  const c = (+cv.dataset.cell || 5) * dpr * Math.SQRT2, hc = c / 2, sw = Math.ceil(W / hc) + 2, sh = Math.ceil(H / hc) + 2, d = photoData(img, sw, sh, fy);
  x.fillStyle = 'rgb(' + rampRGB(mode, 0) + ')'; x.fillRect(0, 0, W, H);
  for (let j = 0; j < sh; j++) for (let i = 0; i * c < W + c; i++) { const px = i * c + (j & 1) * hc, py = j * hc, sx = Math.min(sw - 1, Math.round(px / hc)), v = tone(d, (j * sw + sx) * 4), vg = +(cv.dataset.vig || .78), kk = 1 - vg * Math.min(1, Math.max(0, (Math.hypot(px / W - .5, (py / H - (fy * .3 + .33)) * .9) - .3) / .34)), t = (mode ? 1 - v : v) * kk;
    const h = hc * Math.sqrt(t) * 1.03; if (h < .35) continue; x.fillStyle = 'rgb(' + rampRGB(mode, Math.min(1, t * .9 + .1)) + ')'; x.beginPath(); x.moveTo(px, py - h); x.lineTo(px + h, py); x.lineTo(px, py + h); x.lineTo(px - h, py); x.fill(); } };
const photoImgs = {};
$$('canvas[data-photo]').forEach(cv => { const src = cv.dataset.photo; const im = photoImgs[src] || (photoImgs[src] = Object.assign(new Image(), { src }));
  const go = () => { drawPhoto(cv, im); new ResizeObserver(() => drawPhoto(cv, im)).observe(cv); }; im.complete && im.naturalWidth ? go() : im.addEventListener('load', go); });
window.ATIPhoto = { drawPhoto };

/* ---------- WebGL signal scan ---------- */
const VS = `attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}`;
const FS = `precision highp float;varying vec2 v;
uniform sampler2D uN,uF,uW;uniform vec2 uR,uNs,uFs,uWs,uM;uniform float uT,uMA,uMode,uG,uH,uBand,uStyle,uCell,uLayer;
float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
float n2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float bl(sampler2D t,vec2 u,vec2 px){float s=0.;for(int i=-1;i<=1;i++)for(int j=-1;j<=1;j++){float w=(i==0&&j==0)?4.:(i==0||j==0)?2.:1.;s+=w*texture2D(t,u+vec2(float(i),float(j))*px).r;}return s/16.;}
vec3 c(float r,float g,float b){return vec3(r,g,b)/255.;}
vec3 ramp(float f){
 if(uMode<.5){vec3 a=c(11.,13.,16.),b=c(14.,59.,38.),d=c(31.,157.,85.),e=c(230.,244.,199.);
  if(f<.40)return mix(a,b,f/.40); if(f<.74)return mix(b,d,(f-.40)/.34); return mix(d,e,(f-.74)/.26);}
 vec3 a=c(243.,243.,240.),b=c(230.,244.,199.),d=c(31.,157.,85.),e=c(14.,59.,38.);
 if(f<.34)return mix(a,b,f/.34); if(f<.72)return mix(b,d,(f-.34)/.38); return mix(d,e,(f-.72)/.28);}
float gNear,gHalo;
float heat(vec2 u){
 float asp=uR.x/uR.y; vec2 q=vec2(u.x*asp,u.y);
 float near=bl(uN,u,1.4/uNs); float far=bl(uF,u,1.5/uFs); float vfar=bl(uF,u,5./uFs);
 float amb=n2(q*2.2+vec2(uT*.03,-uT*.02))*.6+n2(q*5.3-vec2(uT*.025,uT*.04))*.4;
 float rim=clamp(near-far*.85,0.,1.)*1.9; float wide=bl(uW,u,1.2/uWs); gNear=near; gHalo=wide;
 vec2 m=vec2(uM.x*asp,uM.y); float d=distance(q,m); float glow=exp(-d*d/.045)*uMA;
 float bx=fract(uT*.045)*1.8-.4; float band=exp(-pow((u.x-bx-(u.y-.5)*.25)*7.,2.))*uBand;
 return .02+.11*uH*amb+.30*vfar+.17*wide-.06*near+.78*rim+(.30*glow+.16*band)*(.35+far*1.4)+.10*glow*uH;}
void main(){
 vec2 u=vec2(v.x,1.-v.y); float f=heat(u); float nearv=gNear,halo=gHalo;
 float gr=h(gl_FragCoord.xy*1.37+fract(uT*3.))-.5;
 if(uStyle<.5){
  f+=(h(gl_FragCoord.xy+fract(uT*7.)*91.)-.5)*uG*2.;
  gl_FragColor=vec4(ramp(clamp(f,0.,1.))*(1.+gr*.07),1.); return;}
 vec2 px=vec2(gl_FragCoord.x,uR.y-gl_FragCoord.y);
 const float s=.70710678; mat2 R=mat2(s,-s,s,s); mat2 Ri=mat2(s,s,-s,s);
 vec2 g=R*px/uCell; vec2 id=floor(g); vec2 cc=fract(g)-.5;
 float fc=clamp(heat((Ri*((id+.5)*uCell))/uR),0.,1.);
 float r=.53*sqrt(pow(clamp((fc-.022)/.74,0.,1.),.85));
 float aa=1.1/uCell; float dotm=1.-smoothstep(r-aa,r+aa,max(abs(cc.x),abs(cc.y)));
 vec3 bg=ramp(clamp(f*.40,0.,1.)); vec3 fg=ramp(clamp(fc*1.04+.19,0.,1.));
 if(uLayer>1.5)bg=ramp(0.);
 vec3 col=(uLayer>.5&&uLayer<1.5)?ramp(clamp(f*.62,0.,1.)):mix(bg,fg,dotm);
#ifdef ISO
 if(uLayer<1.5){float w=fwidth(halo)*.8+1e-5; float iso=0.;
  iso=max(iso,1.-smoothstep(.5,1.,abs(halo-.52)/w));
  iso=max(iso,(1.-smoothstep(.5,1.,abs(halo-.30)/w))*.85);
  iso=max(iso,(1.-smoothstep(.5,1.,abs(halo-.14)/w))*.7);
  iso=max(iso,(1.-smoothstep(.5,1.,abs(halo-.045)/w))*.55);
  float off=1.-smoothstep(.02,.25,nearv);
  col=mix(col,ramp(.93),iso*off*(uLayer>.5?.6:.34));}
#endif
 gl_FragColor=vec4(col*(1.+gr*(.025+uG*.55)),1.);}`;
let MARKS = null; let ScanClass = null;
const marksP = fetch('img/marks.json').then(r => r.json()).then(m => (MARKS = Object.assign(m, { bar: { b: [0, 0, 10, 100], d: 'M0 0H10V100H0Z' }, chev: { b: [0, 0, 60, 100], d: 'M0 0L22 0L60 50L22 100L0 100L38 50Z' } })));

class Scan {
  constructor(cv, o) {
    this.cv = cv; this.o = Object.assign({ mode: 0, grain: .06, heat: .55, band: 1, style: 1, cell: 5, layer: 0 }, o);
    const gl = cv.getContext('webgl', { antialias: false, premultipliedAlpha: false, preserveDrawingBuffer: true }); if (!gl) throw 0; this.gl = gl; this.ext = gl.getExtension('OES_standard_derivatives');
    const sh = (t, s) => { const x = gl.createShader(t); gl.shaderSource(x, s); gl.compileShader(x); if (!gl.getShaderParameter(x, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(x); return x; };
    const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, (this.ext ? '#extension GL_OES_standard_derivatives : enable\n#define ISO\n' : '') + FS)); gl.linkProgram(pr); gl.useProgram(pr); this.pr = pr;
    const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    this.U = {}; ['uN', 'uF', 'uW', 'uR', 'uNs', 'uFs', 'uWs', 'uM', 'uT', 'uMA', 'uMode', 'uG', 'uH', 'uBand', 'uStyle', 'uCell', 'uLayer'].forEach(k => this.U[k] = gl.getUniformLocation(pr, k));
    this.tN = this.tex(); this.tF = this.tex(); this.tW = this.tex();
    this.m = [.7, .5]; this.mt = [.7, .5]; this.ma = 0; this.mat = 0; this.t = 0; this.vis = false;
    const pm = e => { const r = cv.getBoundingClientRect(); this.mt = [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height]; this.mat = 1; if (reduced()) this.frame(); };
    (o.track || cv).addEventListener('pointermove', pm, { passive: true });
    (o.track || cv).addEventListener('pointerleave', () => { this.mat = 0; });
    new ResizeObserver(() => this.resize()).observe(cv);
    new IntersectionObserver(([e]) => { this.vis = e.isIntersecting; if (this.vis) this.loop(); }).observe(cv);
  }
  tex() { const gl = this.gl, t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t); [gl.TEXTURE_MIN_FILTER, gl.TEXTURE_MAG_FILTER].forEach(p => gl.texParameteri(gl.TEXTURE_2D, p, gl.LINEAR)); [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach(p => gl.texParameteri(gl.TEXTURE_2D, p, gl.CLAMP_TO_EDGE)); return t; }
  resize() {
    const r = this.cv.getBoundingClientRect(); if (!r.width) return; const dpr = Math.min(devicePixelRatio || 1, 1.5);
    this.cv.width = Math.round(r.width * dpr); this.cv.height = Math.round(r.height * dpr); this.W = r.width; this.H = r.height;
    this.masks(); this.frame();
  }
  masks() {
    if (!MARKS) return; const gl = this.gl, W = this.W, H = this.H;
    const draw = (k) => { const s = Math.max(8, Math.round(W / k)), sh = Math.max(8, Math.round(H / k)); const c = document.createElement('canvas'); c.width = s; c.height = sh; const x = c.getContext('2d');
      x.fillStyle = '#000'; x.fillRect(0, 0, s, sh); x.fillStyle = '#fff';
      for (const p of this.o.place(W, H)) { const mk = MARKS[p.mark]; const [x0, y0, x1, y1] = mk.b; const sc = p.w / (x1 - x0) / k;
        x.save(); x.globalAlpha = p.a == null ? 1 : p.a; x.translate(p.x / k, p.y / k); x.scale(sc, sc); x.translate(-x0, -y0); x.fill(new Path2D(mk.d)); x.restore(); }
      return c; };
    const n = draw(3), f = draw(18);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.tN); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, n);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, this.tF); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, f);
    /* a wide, smooth halo field: shrink the far mask twice, then grow it back in steps */
    const rs = (src, w, h) => { const c = document.createElement('canvas'); c.width = Math.max(4, Math.round(w)); c.height = Math.max(4, Math.round(h)); const x = c.getContext('2d'); x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high'; x.fillStyle = '#000'; x.fillRect(0, 0, c.width, c.height); x.drawImage(src, 0, 0, c.width, c.height); return c; };
    let wd = rs(rs(rs(f, f.width / 2, f.height / 2), f.width / 4, f.height / 4), f.width / 7, f.height / 7);
    wd = rs(rs(rs(wd, f.width / 4, f.height / 4), f.width / 2, f.height / 2), f.width, f.height);
    gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, this.tW); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, wd);
    this.ns = [n.width, n.height]; this.fs = [f.width, f.height]; this.ws = [wd.width, wd.height]; this.wd = wd; this.o.onMasks && this.o.onMasks(this);
  }
  frame() {
    const gl = this.gl, U = this.U; if (!this.ns) return;
    gl.viewport(0, 0, this.cv.width, this.cv.height);
    gl.uniform1i(U.uN, 0); gl.uniform1i(U.uF, 1); gl.uniform1i(U.uW, 2); gl.uniform2fv(U.uWs, this.ws);
    gl.uniform2f(U.uR, this.cv.width, this.cv.height); gl.uniform2fv(U.uNs, this.ns); gl.uniform2fv(U.uFs, this.fs);
    gl.uniform2fv(U.uM, this.m); gl.uniform1f(U.uMA, this.ma); gl.uniform1f(U.uT, this.t);
    gl.uniform1f(U.uMode, this.o.mode); gl.uniform1f(U.uG, this.o.grain); gl.uniform1f(U.uH, this.o.heat); gl.uniform1f(U.uBand, reduced() ? 0 : this.o.band); gl.uniform1f(U.uStyle, this.o.style); gl.uniform1f(U.uCell, this.o.cell * this.cv.width / this.W); gl.uniform1f(U.uLayer, this.o.layer);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  loop() {
    if (this.running) return; this.running = true; let last = performance.now();
    const step = n => {
      if (!this.vis) { this.running = false; return; }
      const dt = Math.min(.05, (n - last) / 1000); last = n;
      if (!reduced()) this.t += dt;
      const k = reduced() ? 1 : 1 - Math.pow(.0015, dt);
      this.m[0] += (this.mt[0] - this.m[0]) * k; this.m[1] += (this.mt[1] - this.m[1]) * k; this.ma += (this.mat - this.ma) * k * .6;
      this.frame();
      if (reduced()) { this.running = false; return; }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  set(o) { Object.assign(this.o, o); this.masks(); this.frame(); }
}

window.ATIScan = { ready: marksP, get Scan() { return ScanClass; }, get MARKS() { return MARKS; } };
ScanClass = Scan;
marksP.then(() => {
  try {
    const hero = $('#heroScan'); if (!hero) return;
    const hs = new Scan(hero, { track: $('#top'), heat: .5, grain: .05, place: (W, H) => { const mk = MARKS.jl, ar = (mk.b[3] - mk.b[1]) / (mk.b[2] - mk.b[0]), mob = W < 760;
      const w = mob ? W * .3 : Math.min(W * .17, H * .46 / ar); return [{ mark: 'jl', w, x: mob ? W * .6 : W - w - W * .13, y: mob ? H * .14 : H * .2 }]; } });
    hs.resize(); hero.parentElement.querySelector('.fallback').style.display = 'none';
  } catch (e) { console.warn('WebGL scan unavailable', e); }
});
})();
