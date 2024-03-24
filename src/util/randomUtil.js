function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export { randInt, rand };
