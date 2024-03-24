import { getSampleProgram } from "./webgl/example.js";
import { getGL, initProgram } from "./webgl/glUtil.js";
import { rand } from "./util/randomUtil.js";

const gl = getGL(document.querySelector("canvas.webgl"));
const program = getSampleProgram(gl);

const colorLocation = gl.getUniformLocation(program, "u_color");

// Set program
initProgram(gl, program, "vertexPosition", 2);

// Draw many rectangles
function setRectangle(gl, xMin, xMax, yMin, yMax) {
  //prettier-ignore
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
          xMin, yMin,
          xMin, yMax,
          xMax, yMax,
          xMax, yMax,
          xMax, yMin,
          xMin, yMin
      ]), gl.STATIC_DRAW)
}

function drawRectangle(gl, xMin, xMax, yMin, yMax) {
  setRectangle(gl, xMin, xMax, yMin, yMax);
  gl.uniform4f(colorLocation, Math.random(), Math.random(), Math.random(), 1);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

for (let i = 0; i < 50; i++) {
  // Setup a random rectangle
  drawRectangle(gl, rand(-1, 1), rand(-1, 1), rand(-1, 1), rand(-1, 1));
}
