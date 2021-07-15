class Node{
  constructor(data){
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function addNodes(arr, node, i){
  if(i <arr.length){
    var tempNode = new Node(arr[i]);
    node = tempNode;
    node.left = addNodes(arr, node.left,2*i+1);
    node.right = addNodes(arr, node.right,2*i+2);
  }
  return node;
}

function createTree(arr){
  var root;
  root = addNodes(arr, root, 0)
  return root;
}

var arr= [1,2,3,4,5,6,7,8];
var out = createTree(arr);
console.log(JSON.stringify(out, null, 4));

function getleafNodeValue(node, depth){
  if(node === null){
    return 0;
  }
  if(depth === 1){
    return node.data;
  }
  return (getleafNodeValue(node.left, depth - 1) + getleafNodeValue(node.right, depth - 1));
}
function getMaxDepth(node){
  if(node == null){
    return 0;
  }
  return 1 + Math.max(getMaxDepth(node.left) , getMaxDepth(node.right));
}
function maxDepthSum(tree){
  var sum = 0;
  var depth = getMaxDepth(tree)
  console.log(depth);
  
  sum = getleafNodeValue(tree, depth);
 console.log(sum);
  return sum;
  
}
maxDepthSum(out);





console.log('end');





