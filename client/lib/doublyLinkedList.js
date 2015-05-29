// from http://www.thatjsdude.com/interview/linkedList.html
DoublyLinkedList = function() {
  this.head = null;
};

DoublyLinkedList.prototype.push = function(val) {
  var node = {
      value: val,
      next: null,
      previous: null
  };
  var head = this.head,
      current = head,
      previous = head;
  if(!head){
    this.head = {value: val, previous:null, next:null };
  } else {
    while(current && current.next) {
      previous = current;
      current = current.next;
    }     
    current.next = {value: val, previous:current, next:null}
  }
};