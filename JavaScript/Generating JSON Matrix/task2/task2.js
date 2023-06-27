let size = +prompt("Enter Size Of Matrix", "3");
let nodes = [];
let edges = [];

for (let row = 0; row < size; row++) {
  for (let coloum = 0; coloum < size; coloum++) {
    let source = `N${row}-${coloum}`;

    nodes.push({ data: { id: source } });
    if (row === 0) edgeInitialize(source, "S", row + 1, coloum);
    else if (row === size - 1) edgeInitialize(source, "N", row - 1, coloum);
    else {
      edgeInitialize(source, "S", row + 1, coloum);
      edgeInitialize(source, "N", row - 1, coloum);
    }
    if (coloum === 0) edgeInitialize(source, "E", row, coloum + 1);
    else if (coloum === size - 1) edgeInitialize(source, "W", row, coloum - 1);
    else {
      edgeInitialize(source, "E", row, coloum + 1);
      edgeInitialize(source, "W", row, coloum - 1);
    }
    if (row < size - 1 && coloum > 0)  edgeInitialize(source, "SW", row + 1, coloum - 1);
    if (coloum < size - 1 && row > 0)  edgeInitialize(source, "NE", row - 1, coloum + 1);
    if (row < size - 1 && coloum < size - 1)  edgeInitialize(source, "SE", row + 1, coloum + 1);
    if (row > 0 && coloum > 0)  edgeInitialize(source, "NW", row - 1, coloum - 1);
  }
}

function edgeInitialize(source, direction, targetRow, targetCol) {
  let row = +source.split("")[1];
  let coloum = +source.split("-")[1];
  edges.push({ data: { id: `${row}-${coloum}${direction}`, source: source, target: `N${targetRow}-${targetCol}`}});
}
let output = { nodes: nodes, edges: edges };
console.log(output);