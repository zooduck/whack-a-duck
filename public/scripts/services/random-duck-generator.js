export function randomDuckGenerator(grid = {rows: 4, columns: 4}) {
  const coords = {
    x: Math.floor(Math.random() * (grid.columns || 4)),
    y: Math.floor(Math.random() * (grid.rows || 4))
  };
  const prefix = '_' + Math.random().toString().slice(2) + '_';
  const id = (prefix + Object.keys(coords).map( (key) => coords[key]).join(':'));
  return {
    get coords() {
      return coords;
    },
    get id() {
      return id;
    }
  }
}
