export function randomizer(max, min = 0) {
    //min === undefined ? min = 0 : min = min;
    return Math.floor( Math.random() * (max - min + 1)) + min;
  }
