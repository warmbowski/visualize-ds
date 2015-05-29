BinarySearchTree = function() {
  this.head = null;
};

BinarySearchTree.prototype.insert = function(val) {
  var node = {
      value: val,
      right: null,
      left: null
  }
  var head = this.head,
      current = head;
  if(!head){
    this.head = node;
  } else {
    while(true) {
      if(val < current.value) {
        if(current.left === null) {
            current.left = node;
            break;
        } else {
            current = current.left;
        }
      } else if(val > current.value) {
        if(current.right === null) {
            current.right = node;
            break;
        } else {
            current = current.right;
        }
      } else {
        break;
      }
    }
  }
};
