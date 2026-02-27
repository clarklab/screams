export function createAtmosphere(
  canvas: HTMLCanvasElement,
  hue: number = 0.1
): { destroy: () => void; setHue: (h: number) => void } {
  let destroyed = false;
  let animationId: number;
  let currentHue = hue;

  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
  if (!gl) return { destroy: () => {}, setHue: () => {} };

  const dpr = Math.min(window.devicePixelRatio, 2);
  const resize = () => {
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  resize();
  window.addEventListener('resize', resize);

  const vertSrc = `
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const fragSrc = `
    precision mediump float;
    uniform float uTime;
    uniform float uHue;
    uniform vec2 uResolution;

    // Simplex-like noise
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                          -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
             + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                               dot(x12.zw, x12.zw)), 0.0);
      m = m * m;
      m = m * m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / uResolution;
      float n = snoise(uv * 3.0 + uTime * 0.15);
      float n2 = snoise(uv * 5.0 - uTime * 0.1);
      float fog = smoothstep(-0.3, 1.0, n * 0.5 + n2 * 0.3 + 0.2);

      // Shift color based on hue uniform
      vec3 warm = vec3(0.15, 0.08, 0.02);  // amber
      vec3 cold = vec3(0.02, 0.05, 0.15);  // blue
      vec3 base = mix(warm, cold, uHue);

      vec3 color = base * fog * 0.6;
      gl_FragColor = vec4(color, fog * 0.3);
    }
  `;

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };

  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vertSrc));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fragSrc));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(prog, 'position');
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(prog, 'uTime');
  const uHue = gl.getUniformLocation(prog, 'uHue');
  const uRes = gl.getUniformLocation(prog, 'uResolution');

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  const startTime = performance.now();

  const render = () => {
    if (destroyed) return;
    const t = (performance.now() - startTime) / 1000;
    gl.uniform1f(uTime, t);
    gl.uniform1f(uHue, currentHue);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    animationId = requestAnimationFrame(render);
  };

  render();

  return {
    destroy: () => {
      destroyed = true;
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    },
    setHue: (h: number) => { currentHue = h; },
  };
}
