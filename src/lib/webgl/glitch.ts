export function createGlitch(
  canvas: HTMLCanvasElement,
  duration: number = 200
): Promise<void> {
  return new Promise((resolve) => {
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) { resolve(); return; }

    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);

    const vertSrc = `
      attribute vec2 position;
      void main() { gl_Position = vec4(position, 0.0, 1.0); }
    `;

    const fragSrc = `
      precision mediump float;
      uniform float uTime;
      uniform float uProgress;
      uniform vec2 uResolution;

      float rand(vec2 co) {
        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution;

        float scanline = sin(uv.y * uResolution.y * 1.5 + uTime * 50.0) * 0.04;
        float noise = rand(uv + uTime) * 0.15;
        float rgbShift = sin(uTime * 30.0) * 0.02 * uProgress;

        float r = noise + scanline;
        float g = noise * 0.7 + scanline;
        float b = noise * 0.5 + scanline;

        r += step(0.99, rand(vec2(uTime * 5.0, uv.y * 10.0))) * 0.3;

        float alpha = (noise + abs(scanline)) * uProgress * 2.0;

        gl_FragColor = vec4(r + rgbShift, g, b - rgbShift, alpha);
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
    const uProgress = gl.getUniformLocation(prog, 'uProgress');
    const uRes = gl.getUniformLocation(prog, 'uResolution');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const startTime = performance.now();

    const render = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const t = elapsed / 1000;

      gl.uniform1f(uTime, t);
      gl.uniform1f(uProgress, progress < 0.5 ? progress * 2 : (1 - progress) * 2);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (elapsed < duration) {
        requestAnimationFrame(render);
      } else {
        gl.deleteProgram(prog);
        gl.deleteBuffer(buf);
        resolve();
      }
    };

    render();
  });
}
