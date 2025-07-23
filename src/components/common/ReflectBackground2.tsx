"use client";
import { useEffect, useRef } from "react";

const vertexShaderSource = `
  attribute vec4 a_position;
  void main() {
    gl_Position = a_position;
  }
`;

const fragmentShaderSource = `
precision mediump float;
uniform vec2 iResolution;
uniform float iTime;

vec3 palette(float t) {
    vec3 c1 = vec3(0.0, 0.6, 1.0);    // Blue
    vec3 c2 = vec3(0.0, 1.0, 0.5);    // Green
    vec3 c3 = vec3(1.0, 1.0, 0.0);    // Yellow
    vec3 c4 = vec3(1.0, 1.0, 1.0);    // White
    vec3 c5 = vec3(1.0, 0.0, 0.0);    // Red
    vec3 c6 = vec3(0.0, 1.0, 1.0);    // Cyan
    float a = smoothstep(0.0, 1.0, sin(t));
    float b = smoothstep(0.0, 1.0, cos(t));
    float c = smoothstep(0.0, 1.0, sin(t + 2.0));
    float d = smoothstep(0.0, 1.0, cos(t + 2.0));
    float e = smoothstep(0.0, 1.0, sin(t + 4.0));
    float f = smoothstep(0.0, 1.0, cos(t + 4.0));
    return normalize(
        a * c1 +
        b * c2 +
        c * c3 +
        d * c4 +
        e * c5 +
        f * c6
    );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord.xy / iResolution.xy;
    float t = iTime * 0.3;
    float wave = sin(uv.x * 8.0 + t) + cos(uv.y * 8.0 - t);
    float mixval = 0.5 + 0.5 * sin(uv.x * 4.0 + uv.y * 4.0 + t);
    vec3 color = palette(wave + mixval + t);
    color = mix(color, vec3(1.0), 0.15); // add a bit of white for brightness
    fragColor = vec4(color, 1.0);
}
void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

export type BlurSize = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

interface ReflectBackground2Props {
  backdropBlurAmount?: BlurSize;
  className?: string;
}

const blurClassMap: Record<BlurSize, string> = {
  none: "backdrop-blur-none",
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
  "2xl": "backdrop-blur-2xl",
  "3xl": "backdrop-blur-3xl",
};

function ReflectBackground2({
  backdropBlurAmount = "sm",
  className = "",
}: ReflectBackground2Props): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    let animationId: number;
    let program: WebGLProgram | null = null;
    let vertexShader: WebGLShader | null = null;
    let fragmentShader: WebGLShader | null = null;
    let positionBuffer: WebGLBuffer | null = null;

    const compileShader = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
    const iTimeLocation = gl.getUniformLocation(program, "iTime");

    let startTime = Date.now();

    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);

      const currentTime = (Date.now() - startTime) / 1000;

      gl.uniform2f(iResolutionLocation, width, height);
      gl.uniform1f(iTimeLocation, currentTime);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (program) gl.deleteProgram(program);
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      // Optionally clear canvas
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    };
  }, []);

  const finalBlurClass = blurClassMap[backdropBlurAmount] || blurClassMap["sm"];

  return (
    <div className={`w-full max-w-screen h-full overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full max-w-screen h-full overflow-hidden"
        style={{ display: "block" }}
      />
      <div className={`absolute inset-0 ${finalBlurClass}`} />
    </div>
  );
}

export default ReflectBackground2; 