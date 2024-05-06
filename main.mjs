import Tree from "./BST.mjs";

// Function to create random array number
function randomArray(array){
   // const array=[]
   for(let i=0; i<13; i++){
      array.push(Math.floor(Math.random()*100));    
   }
   // console.log(array);  
}

// create a balanced BST
const randomArr=[];
randomArray(randomArr);
console.log(randomArr);
const binaryTree=new Tree(randomArr);
binaryTree.buildTree(randomArr);
console.log(binaryTree.prettyPrint(binaryTree.root));

// Confirm that the tree is balanced
console.log(`Is this tree balanced : ${binaryTree.isBalanced(binaryTree.root)}`);

// Print out all elements in level, pre, post, and in order
const preOrderArray=[];
binaryTree.preOrder(binaryTree.root, preOrderArray);
const inOrderArray=[];
binaryTree.inOrder(binaryTree.root, inOrderArray);
const postOrderArray=[];
binaryTree.postOrder(binaryTree.root, postOrderArray);
console.log(preOrderArray, inOrderArray, postOrderArray);

// Unbalance the tree by adding several numbers > 100.
function randomInt() {
   for(let i=0; i<5; i++){
      binaryTree.insert(Math.floor(Math.random()*100)+101);
      
   }
}
randomInt();
console.log(binaryTree.prettyPrint(binaryTree.root));

// Confirm that the tree is unbalanced 
console.log(`Is this tree balanced : ${binaryTree.isBalanced(binaryTree.root)}`);

// rebalance the tree
console.log(binaryTree.rebalance(binaryTree.root));
console.log(binaryTree.prettyPrint(binaryTree.root));
// Confirm that the tree is balanced 
console.log(`Is this tree balanced : ${binaryTree.isBalanced(binaryTree.root)}`);

// Print out all elements in level, pre, post, and in order
const preOrderArrayNew=[];
binaryTree.preOrder(binaryTree.root, preOrderArray);
const inOrderArrayNew=[];
binaryTree.inOrder(binaryTree.root, inOrderArray);
const postOrderArrayNew=[];
binaryTree.postOrder(binaryTree.root, postOrderArray);
console.log(preOrderArray, inOrderArray, postOrderArray);