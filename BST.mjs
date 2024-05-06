class Node{
   constructor(data){
      this.data=data,
      this.left=null,
      this.right=null;
   }
}
export default class Tree{
   constructor(){
      this.root=null;
   }

   removeDuplicates(array){
      // const seen= new Set();
      const newArr=[];
      for(const item of array){
         if(!newArr.includes(item)){
            // seen.add(item);
            newArr.push(item);
         }
      }
      return newArr;
   }

   buildTree(array){
      const singleData= this.removeDuplicates(array);
      array.sort((a,b)=>a-b);
      this.root=this.buildTreeHelper(singleData, 0, singleData.length-1);
      
     
   }
   buildTreeHelper(array, start, end){
      if(start>end){
         return null;
      }
      const mid=Math.floor((start+end)/2);
      const node= new Node(array[mid]);
      node.left= this.buildTreeHelper(array, start, mid-1);
      node.right= this.buildTreeHelper(array, mid+1, end);

      return node;

   }

   insert(value){
      this.root=this.insertHelper(this.root, value);
   }

   insertHelper(root, value){
      if(root==null){
         root= new Node(value);
         return root;
      }
      if(value>root.data){
         root.right=this.insertHelper(root.right, value);
      } else if(value<root.data){
         root.left=this.insertHelper(root.left, value);
      }
      return root;
   }

   inOrder(node){
      if(node!==null){
         this.inOrder(node.left);
         console.log(node.data+"");
         this.inOrder(node.right);
         
      }
   }
   minValue(node){
      let minV=node.data;
      while(node.left!==null){
         minV=node.left.data;
         node=node.left;
      }
      return minV;
   }

   deleteItem(root, value){
      if(root==null){
         return root;
      }
      if(value<root.data){
         root.left=this.deleteItem(root.left, value);
         
      } else if(value>root.data){
         root.right=this.deleteItem(root.right, value);
      } else{
         if(root.left==null){
            return root.right;
         } else if(root.right==null){
            return root.left;
         }
         root.data=this.minValue(root.right);
         root.right=this.deleteItem(root.right, root.data);
      }
      return root;

   }

   find(root, value){
      if(root==null){
         return root;
      }
      if(value<root.data){
         return this.find(root.left, value);
         
      } else if(value>root.data){
         return this.find(root.right, value);
      } else{
         return root;
      }
      
   }

   printNode(data){
      const value=[];
      value.push(data);
      console.log(value);
      // return value;
   }
   // level order using iteration
   levelOrder(root, array, callback){
      if(root==null){
         return root;
      }
      const queue=[];
      queue.push(root);
      
      while(queue.length){
         const currentNode=queue.shift();  
         if(callback){
            callback(currentNode.data);
         } 
         if(array){                 
            array.push(currentNode.data);          
         }     
         
         if(currentNode.left){
            queue.push(currentNode.left);
         }
         if(currentNode.right){
            queue.push(currentNode.right);
         }
         
      }
     
   }
   // level order using recursion
   levelOrderRecursion(root, array, callback){
      if(root==null){
         return root;
      }
      const queue=[];
      queue.push(root);
      function helper(queue){
         if(!queue.length){
            return;
         }
         
         for(let currentNode of queue){
            currentNode=queue.shift(); 
            if(callback){
               callback(currentNode.data);
            } 
            if(array){                 
               array.push(currentNode.data);          
            }
            if(currentNode.left){
               queue.push(currentNode.left);
            }
            if(currentNode.right){
               queue.push(currentNode.right);
            }
         }
         helper(queue);
      }
      helper(queue);
     
   }

   preOrder(root, array, callback){
      if(root==null){
         return;
      }

      if(callback){
         callback(root.data);
      } 
      if(array){                 
         array.push(root.data);          
      }
      this.preOrder(root.left, array, callback);
      this.preOrder(root.right, array, callback);
 
   }
   inOrder(root, array, callback){
      if(root==null){
         return;
      }

      this.inOrder(root.left, array, callback);
      if(callback){
         callback(root.data);
      } 
      if(array){                 
         array.push(root.data);          
      } 
      this.inOrder(root.right, array, callback);
 
   }
   postOrder(root, array, callback){
      if(root==null){
         return;
      }

      this.postOrder(root.left, array, callback);
      this.postOrder(root.right, array, callback);
   
      if(callback){
         callback(root.data);
      } 
      if(array){                 
         array.push(root.data);          
      }
 
   }

   // Height is defined as the number of edges in the longest path 
   // from a given node to a leaf node
   height(node){
      if(!node){
         return -1;
      }
      const leftHeight=this.height(node.left);
      const rightHeight=this.height(node.right);
      return Math.max(leftHeight, rightHeight)+1;
   }
   // Depth is defined as the number of edges in the path 
   // from a given node to the tree’s root node
   depth(root, value){
      if(!root){
         return -1;
      }
      if(root.data==value){
         return 0;
      }
      const leftDepth=this.depth(root.left, value);
      if(leftDepth!==-1){
         return leftDepth+1;
      }
      const rightDepth=this.depth(root.right, value);
      if(rightDepth!==-1){
         return rightDepth+1;
      }

      return -1; 
   }

   // balanced tree(difference between heights of left an right 
   // subtree of each node is not more than one )
   isBalanced(root){
      if(!root){
         return true;
      }
      const leftHeight=this.height(root.left);
      const rightHeight=this.height(root.right);
      const heightDiff=Math.abs(leftHeight-rightHeight);
      if(heightDiff>1){    
         return false;   
      } else{
         this.isBalanced(root.left)&& this.isBalanced(root.right);
         return true;
      }
   }

   rebalance(root){
      if(!root){
         return null;
      }
      const inOrderArray=[];
      this.inOrder(root, inOrderArray);
      this.buildTree(inOrderArray);
   }
   // print tree
   prettyPrint(node, prefix = "", isLeft = true){
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
   }
}


   



