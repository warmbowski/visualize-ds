// from http://www.thatjsdude.com/interview/linkedList.html
CircularLinkedList = function() {  
  this.head = null;
};

CircularLinkedList.prototype.push = function(val) {
  var node = {
      value: val,
      next: null,
      previous: null
  };
  var head = this.head,
    current = head;
  if(!head) {
    node.next = node;
    node.previous = node;
    this.head = node;
  } else {
    while(current.next != head) {
      current = current.next;
    }
    node.next = head;
    node.previous = current;
    head.previous = node;
    current.next = node;
  }
};
