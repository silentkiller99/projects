let nodesLengthArray = [];
let nodeCounter = 1;
// let levels = nodesLengthArray.length + 1;
let levels = +prompt("Enter No of levels");
if (levels <= 0) {
  alert("Invalid input");
  location.reload();
}
for (let i = 0; i < levels - 1; i++)
  nodesLengthArray.push(+prompt(`Enter no of nodes in level${i + 1}`));

let nodes = nodesLengthArray.reduce((total, current) => total + current, 1);

let treeArray = [];
for (let i = 1; i <= nodes; i++) {
  let node = {
    id: 0,
    tag: 0,
    parent_id: null,
    domain_id: "tree",
    description: `level-0-noOfSiblings-${nodesLengthArray[0]}`,
    // family: [],
  };

  treeArray.push(node);
}

function initializeRestObjects(level, parentId, childNo, currentChild) {
  if (nodeCounter > nodes) return;
  if (currentChild <= childNo) {
    treeArray[nodeCounter].tag = nodeCounter;
    treeArray[nodeCounter].parent_id = parentId;
    treeArray[nodeCounter].id = +`${parentId}${currentChild}`;
    treeArray[
      nodeCounter
    ].description = `level-${level}-noOfSiblings-${childNo}`;
    // treeArray.family.push(parentId);
    nodeCounter++;
    if (level < levels && nodeCounter < nodes) {
      let nextChildNo;
      if (nodesLengthArray[level] === 0) nextChildNo = 1;
      else nextChildNo = Math.ceil(nodesLengthArray[level] / childNo);

      initializeRestObjects(
        level + 1,
        +`${parentId}${currentChild}`,
        nextChildNo,
        1
      );
    }
    if (currentChild <= childNo && nodeCounter < nodes) {
      initializeRestObjects(level, parentId, childNo, currentChild + 1);
    }
  }
  return;
}

// function initializeRestObjects(level, parentId, childNo, currentChild) {
//   if (nodeCounter >= nodes) return;
//   while (currentChild <= childNo && nodeCounter < nodes) {
//     treeArray[nodeCounter].tag = nodeCounter;
//     treeArray[nodeCounter].parent_id = parentId;
//     treeArray[nodeCounter].id = +`${parentId}${currentChild}`;
//     nodeCounter++;
//     if (level < levels && nodeCounter < nodes) {
//       let nextChildNo;
//       if (nodesLengthArray[level] === 0) nextChildNo = 1;
//       else nextChildNo = Math.ceil(nodesLengthArray[level] / childNo);

//       initializeRestObjects(
//         level + 1,
//         +`${parentId}${currentChild}`,
//         nextChildNo,
//         1
//       );
//     }
//     currentChild++;
//   }
//   return;
// }

initializeRestObjects(1, 0, nodesLengthArray[0], 1);

console.log(treeArray);