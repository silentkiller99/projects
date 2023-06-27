let nodesLengthArray = [];
let nodeCounter = 1;
let checkId = false;
let countMoveTreeLength = 0;

// let levels = nodesLengthArray.length + 1;
let levels = prompt("Enter No of levels");
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

initializeRestObjects(1, 0, nodesLengthArray[0], 1);

console.log(treeArray);

  let moveNodeId , nodeIndex ,nodeIdNewParent,nodeNewParentIndex;

function moveNode() {
  nodeCounter = 1;
  moveNodeId = +prompt("Enter node id to move");
  nodeIndex = treeArray.findIndex((node) => node.id === moveNodeId);

  nodeIdNewParent = +prompt("Enter node id of new parent");
  nodeNewParentIndex = treeArray.findIndex(
    (node) => node.id === nodeIdNewParent
  );
  if (nodeIndex > 0 && nodeNewParentIndex > 0 && nodeIndex !=nodeNewParentIndex)
      validateMove(1, nodesLengthArray[0], 1);
    console.log(countMoveTreeLength);
    moveNodeToLocation()
//   treeArray[nodeIndex].parent_id = treeArray[nodeNewParentIndex].id;
}

function validateMove(level, childNo, currentChild) {
  if (nodeCounter > nodes) return;
  if (currentChild <= childNo) {
    checkId = treeArray[nodeCounter].id === moveNodeId ? true : false;
    if (checkId) countMoveTreeLength++;
    nodeCounter++;
    if (level < levels && nodeCounter < nodes) {
      let nextChildNo;
      if (nodesLengthArray[level] === 0) nextChildNo = 1;
      else nextChildNo = Math.ceil(nodesLengthArray[level] / childNo);

      validateMove(level + 1, nextChildNo, 1);
    }
    if (currentChild <= childNo && nodeCounter < nodes) {
      validateMove(level, childNo, currentChild + 1);
    }
    if (treeArray[nodeCounter].id === moveNodeId) checkId = false;
  }
  return;
}

function moveNodeToLocation() {
  let children = treeArray.filter((child) => child.parent_id === moveNodeId);
  children.forEach((child) => {
    child.parent_id = nodeIdNewParent;
  });

  treeArray.splice(nodeIndex, 1);

  let newParentChildren = treeArray.filter(
    (child) => child.parent_id === nodeIdNewParent
  );
  let insertIndex = newParentChildren.length;

  node.parent_id = nodeIdNewParent;
  treeArray.splice(insertIndex, 0, node);
}
