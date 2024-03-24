/**
 * Creates and compiles a shader.
 *
 * @param {!HTMLCanvasElement} canvas The Canvas.
 *     FRAGMENT_SHADER.
 * @return {!WebGL2RenderingContext} The shader.
 */
function getGL(canvas) {
  return canvas.getContext("webgl2");
}

/**
 * Creates and compiles a shader.
 *
 * @param {!WebGL2RenderingContext} gl The WebGL Context.
 * @param {string} shaderSource The GLSL source code for the shader.
 * @param {number} shaderType The type of shader, VERTEX_SHADER or
 *     FRAGMENT_SHADER.
 * @return {!WebGLShader} The shader.
 */
function compileShader(gl, shaderSource, shaderType) {
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(`Could not compile shader: ${gl.getShaderInfoLog(shader)}`);
  }

  return shader;
}

/**
 * Creates a program from 2 shaders.
 *
 * @param {!WebGL2RenderingContext} gl The WebGL context.
 * @param {!WebGLShader} vertexShader A vertex shader.
 * @param {!WebGLShader} fragmentShader A fragment shader.
 * @return {!WebGLProgram} A program.
 */
function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`Program failed to link: ${gl.getProgramInfoLog(program)}`);
  }

  return program;
}

function resizeCanvasIfNeeded(canvas) {
  const { clientWidth, clientHeight } = canvas;
  if (canvas.width !== clientWidth || canvas.height !== clientHeight) {
    (canvas.width = clientWidth), (canvas.height = clientHeight);
  }
}

function initProgram(gl, program, vertexAttributeName, dimension) {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const vertexAttributeLocation = gl.getAttribLocation(
    program,
    vertexAttributeName
  );
  if (vertexAttributeLocation < 0) {
    throw new Error(
      `Attribute name: ${vertexAttributeName} not found on program.`
    );
  }
  resizeCanvasIfNeeded(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.useProgram(program);
  gl.enableVertexAttribArray(vertexAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(
    vertexAttributeLocation,
    dimension,
    gl.FLOAT,
    false,
    0,
    0
  );
}

export {
  getGL,
  compileShader,
  createProgram,
  resizeCanvasIfNeeded,
  initProgram,
};
