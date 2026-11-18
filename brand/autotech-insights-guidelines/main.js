/* AutoTech Insights × Jon Lamb — brand guidelines runtime (vanilla, no deps) */
(() => {
const RM = matchMedia('(prefers-reduced-motion: reduce)');
const reduced = () => RM.matches;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- progress + current section ---------- */
const prog = $('.progress'), nowNum = $('#nowNum'), nowTtl = $('#nowTtl');
const onScroll = () => {
  const h = document.documentElement; const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
  prog.style.transform = `scaleX(${p})`;
};
addEventListener('scroll', onScroll, { passive: true }); onScroll();
const secs = $$('[data-n]');
const so = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { nowNum.textContent = e.target.dataset.n; nowTtl.innerHTML = e.target.dataset.t; } });
}, { rootMargin: '-45% 0px -50% 0px' });
secs.forEach(s => so.observe(s));
const topObs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { nowNum.textContent = '00'; nowTtl.textContent = 'Thermal Signal'; } }, { rootMargin: '-45% 0px -50% 0px' });
topObs.observe($('#top'));

/* ---------- index overlay ---------- */
const idx = $('#index'), ib = $('#idxBtn');
const setIdx = o => { idx.classList.toggle('open', o); ib.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : ''; if (o) $('a', idx).focus(); else ib.focus(); };
ib.addEventListener('click', () => setIdx(true));
$('#idxClose').addEventListener('click', () => setIdx(false));
$$('a', idx).forEach(a => a.addEventListener('click', () => setIdx(false)));
addEventListener('keydown', e => { if (e.key === 'Escape' && idx.classList.contains('open')) setIdx(false); });

/* ---------- reveal ---------- */
const ro = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
$$('.rv').forEach(el => ro.observe(el));

/* ---------- copy to clipboard ---------- */
const toast = $('#toast');
let tt;
const say = (msg, col) => { $('span', toast).textContent = msg; $('i', toast).style.background = col || '#1F9D55'; toast.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove('on'), 1600); };
const copy = async (txt) => { try { await navigator.clipboard.writeText(txt); return true; } catch { const t = document.createElement('textarea'); t.value = txt; document.body.append(t); t.select(); const ok = document.execCommand('copy'); t.remove(); return ok; } };
$$('.sw').forEach(b => b.addEventListener('click', async () => { await copy(b.dataset.hex); say(`Copied ${b.dataset.hex}`, b.dataset.hex); }));
$('#copyTokens')?.addEventListener('click', async () => { await copy($('#tokens').innerText); say('Copied CSS tokens'); });

/* ---------- motion tokens ---------- */
const bez = (x1, y1, x2, y2) => {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sx = t => ((ax * t + bx) * t + cx) * t, sy = t => ((ay * t + by) * t + cy) * t, dx = t => (3 * ax * t + 2 * bx) * t + cx;
  return x => { let t = x; for (let i = 0; i < 8; i++) { const e = sx(t) - x; const d = dx(t); if (Math.abs(e) < 1e-5 || !d) break; t -= e / d; } return sy(Math.min(1, Math.max(0, t))); };
};
$$('svg[data-curve]').forEach(svg => {
  const [a, b, c, d] = svg.dataset.curve.split(',').map(Number); const f = bez(a, b, c, d);
  const SW = Math.max(200, Math.round(svg.getBoundingClientRect().width) || 200); svg.setAttribute('viewBox', `0 0 ${SW} 70`);
  let p = ''; for (let i = 0; i <= 80; i++) { const x = i / 80; p += (i ? 'L' : 'M') + (x * SW).toFixed(1) + ' ' + (66 - f(x) * 62).toFixed(1); }
  svg.innerHTML = `<path d="M0 66H${SW}M0 4H${SW}" stroke="currentColor" stroke-opacity=".15" stroke-width="1"/><path d="${p}" fill="none" stroke="#1F9D55" stroke-width="2"/><circle r="4" fill="#E6F4C7" cx="0" cy="66"/>`;
  const dot = $('circle', svg);
  if (!reduced()) { let t0 = performance.now(); const loop = n => { const T = 1600, k = ((n - t0) % (T + 700)) / T; const x = Math.min(1, k); dot.setAttribute('cx', x * SW); dot.setAttribute('cy', 66 - f(x) * 62); requestAnimationFrame(loop); }; requestAnimationFrame(loop); }
  else { dot.setAttribute('cx', SW); dot.setAttribute('cy', 4); }
});
if (!reduced()) $$('.track i').forEach(i => {
  const d = +i.dataset.d; const w = () => i.parentElement.clientWidth - 8;
  const run = () => i.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${w()}px)` }], { duration: d, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' }).finished.then(() => setTimeout(run, 900));
  run();
});

/* ---------- motion demos ---------- */
const playDemo = st => {
  st.classList.remove('play'); void st.offsetWidth; st.classList.add('play');
  if (st.hasAttribute('data-count')) {
    $$('[data-to]', st).forEach(n => { const to = +n.dataset.to, t0 = performance.now(), f = bez(.16, 1, .3, 1);
      const step = t => { const k = Math.min(1, (t - t0) / 1400); n.textContent = Math.round(f(k) * to); if (k < 1) requestAnimationFrame(step); };
      if (reduced()) n.textContent = to; else requestAnimationFrame(step); });
    $$('[data-w]', st).forEach(b => { b.style.transform = 'scaleX(0)'; void b.offsetWidth; b.style.transform = `scaleX(${b.dataset.w})`; });
  }
};
const dobs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { playDemo(e.target); dobs.unobserve(e.target); } }), { threshold: .5 });
$$('[data-demo]').forEach(s => { dobs.observe(s); $('.replay', s.parentElement)?.addEventListener('click', () => playDemo(s)); });

/* ---------- focus pull on scroll ---------- */
const fw = $('#focusWrap'), fd = $('#focusDemo'), fm = $('#fmeter');
if (fw) {
  const [e2, e1, sh] = $$('.big', fd);
  const upd = () => {
    const r = fw.getBoundingClientRect(); const span = r.height - innerHeight;
    let p = reduced() ? 1 : Math.min(1, Math.max(0, -r.top / Math.max(1, span * 0.7)));
    const ease = bez(.65, 0, .35, 1)(p);
    sh.style.filter = `blur(${(1 - ease) * 22}px)`; sh.style.opacity = 0.25 + 0.75 * ease;
    const b1 = 4 + ease * 22, b2 = 10 + ease * 50;
    e1.style.filter = `blur(${b1}px)`; e1.style.opacity = 0.9 - ease * 0.35; e1.style.transform = `translate(${ease * 0.06}em,${ease * 0.08}em)`;
    e2.style.filter = `blur(${b2}px)`; e2.style.opacity = 0.2 + ease * 0.3; e2.style.transform = `translate(${ease * 0.14}em,${ease * 0.18}em)`;
    fm.textContent = `Echo ${Math.round(b1)} px · ${Math.round((0.9 - ease * 0.35) * 100)}%`;
  };
  addEventListener('scroll', () => requestAnimationFrame(upd), { passive: true }); upd();
}

/* ---------- WebGL signal scan ---------- */
const VS = `attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}`;
const FS = `precision highp float;varying vec2 v;
uniform sampler2D uN,uF;uniform vec2 uR,uNs,uFs,uM;uniform float uT,uMA,uMode,uG,uH,uBand;
float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
float n2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float bl(sampler2D t,vec2 u,vec2 px){float s=0.;for(int i=-1;i<=1;i++)for(int j=-1;j<=1;j++){float w=(i==0&&j==0)?4.:(i==0||j==0)?2.:1.;s+=w*texture2D(t,u+vec2(float(i),float(j))*px).r;}return s/16.;}
vec3 c(float r,float g,float b){return vec3(r,g,b)/255.;}
vec3 ramp(float f){
 if(uMode<.5){vec3 a=c(11.,13.,16.),b=c(14.,59.,38.),d=c(31.,157.,85.),e=c(230.,244.,199.);
  if(f<.40)return mix(a,b,f/.40); if(f<.74)return mix(b,d,(f-.40)/.34); return mix(d,e,(f-.74)/.26);}
 vec3 a=c(243.,243.,240.),b=c(230.,244.,199.),d=c(31.,157.,85.),e=c(14.,59.,38.);
 if(f<.34)return mix(a,b,f/.34); if(f<.72)return mix(b,d,(f-.34)/.38); return mix(d,e,(f-.72)/.28);}
void main(){
 vec2 u=vec2(v.x,1.-v.y); float asp=uR.x/uR.y; vec2 q=vec2(u.x*asp,u.y);
 float near=bl(uN,u,1.4/uNs); float far=bl(uF,u,1.5/uFs); float vfar=bl(uF,u,5./uFs);
 float amb=n2(q*2.2+vec2(uT*.03,-uT*.02))*.6+n2(q*5.3-vec2(uT*.025,uT*.04))*.4;
 float rim=clamp(near-far*.85,0.,1.)*1.9;
 vec2 m=vec2(uM.x*asp,uM.y); float d=distance(q,m); float glow=exp(-d*d/.045)*uMA;
 float bx=fract(uT*.045)*1.8-.4; float band=exp(-pow((u.x-bx-(u.y-.5)*.25)*7.,2.))*uBand;
 float f=.02+.11*uH*amb+.34*vfar-.06*near+.78*rim+(.30*glow+.16*band)*(.35+far*1.4)+.10*glow*uH;
 f+=(h(gl_FragCoord.xy+fract(uT*7.)*91.)-.5)*uG*2.;
 vec3 col=ramp(clamp(f,0.,1.))*(1.+(h(gl_FragCoord.xy*1.37+fract(uT*3.))-.5)*.07);
 gl_FragColor=vec4(col,1.);}`;
let MARKS = null;
const marksP = fetch('img/marks.json').then(r => r.json()).then(m => (MARKS = m));

class Scan {
  constructor(cv, o) {
    this.cv = cv; this.o = Object.assign({ mode: 0, grain: .06, heat: .55, band: 1 }, o);
    const gl = cv.getContext('webgl', { antialias: false, premultipliedAlpha: false, preserveDrawingBuffer: true }); if (!gl) throw 0; this.gl = gl;
    const sh = (t, s) => { const x = gl.createShader(t); gl.shaderSource(x, s); gl.compileShader(x); if (!gl.getShaderParameter(x, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(x); return x; };
    const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr); gl.useProgram(pr); this.pr = pr;
    const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    this.U = {}; ['uN', 'uF', 'uR', 'uNs', 'uFs', 'uM', 'uT', 'uMA', 'uMode', 'uG', 'uH', 'uBand'].forEach(k => this.U[k] = gl.getUniformLocation(pr, k));
    this.tN = this.tex(); this.tF = this.tex();
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
        x.save(); x.translate(p.x / k, p.y / k); x.scale(sc, sc); x.translate(-x0, -y0); x.fill(new Path2D(mk.d)); x.restore(); }
      return c; };
    const n = draw(4), f = draw(18);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.tN); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, n);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, this.tF); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, f);
    this.ns = [n.width, n.height]; this.fs = [f.width, f.height];
  }
  frame() {
    const gl = this.gl, U = this.U; if (!this.ns) return;
    gl.viewport(0, 0, this.cv.width, this.cv.height);
    gl.uniform1i(U.uN, 0); gl.uniform1i(U.uF, 1);
    gl.uniform2f(U.uR, this.cv.width, this.cv.height); gl.uniform2fv(U.uNs, this.ns); gl.uniform2fv(U.uFs, this.fs);
    gl.uniform2fv(U.uM, this.m); gl.uniform1f(U.uMA, this.ma); gl.uniform1f(U.uT, this.t);
    gl.uniform1f(U.uMode, this.o.mode); gl.uniform1f(U.uG, this.o.grain); gl.uniform1f(U.uH, this.o.heat); gl.uniform1f(U.uBand, reduced() ? 0 : this.o.band);
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

marksP.then(() => {
  try {
    const hero = $('#heroScan');
    const hs = new Scan(hero, { track: $('#top'), heat: .5, grain: .06, place: (W, H) => {
      const mob = W < 760; const w = mob ? W * 0.84 : Math.min(W * 0.46, H * 1.1);
      return [{ mark: 'ati', w, x: mob ? W * 0.08 : W - w - W * 0.05, y: mob ? H * 0.2 : H * 0.17 }]; } });
    hs.resize(); hero.parentElement.querySelector('.fallback').style.display = 'none';
    const sc = $('#scanCanvas'); let mark = 'ati';
    const place = (W, H) => { const mk = MARKS[mark]; const [x0, y0, x1, y1] = mk.b; const ar = (y1 - y0) / (x1 - x0);
      let w = Math.min(W * (mark === 'jl' ? 0.42 : 0.74), H * 0.66 / ar); return [{ mark, w, x: (W - w) / 2, y: (H - w * ar) / 2 }]; };
    const s = new Scan(sc, { place, heat: .55, grain: .06 }); s.resize();
    const lab = $('#scanLabel'); let mode = 0;
    const L = () => { lab.textContent = `${mark === 'wm' ? 'wordmark' : mark} · ${mode ? 'light' : 'dark'} ramp`; $('#scanStage').style.background = mode ? '#F3F3F0' : '#0B0D10'; $('#scanStage .hud').style.color = mode ? '#0B0D10' : '#fff'; };
    $$('[data-mark]').forEach(b => b.addEventListener('click', () => { mark = b.dataset.mark; $$('[data-mark]').forEach(x => x.setAttribute('aria-pressed', x === b)); s.set({}); L(); }));
    $$('[data-mode]').forEach(b => b.addEventListener('click', () => { mode = +b.dataset.mode; $$('[data-mode]').forEach(x => x.setAttribute('aria-pressed', x === b)); s.set({ mode }); L(); }));
    $('#grainR')?.addEventListener('input', e => { s.o.grain = +e.target.value; s.frame(); });
    $('#heatR')?.addEventListener('input', e => { s.o.heat = +e.target.value; s.frame(); });
  } catch (e) { console.warn('WebGL scan unavailable', e); }
});
})();
