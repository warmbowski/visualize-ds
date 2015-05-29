Meteor.startup(function() {
  Session.set('values', '');
  Session.set('sll', true);
  Session.set('dll', false);
  Session.set('cll', false);
  Session.set('bst', false);
  
  document.getElementById('sll').checked = Session.get('sll');
  document.getElementById('dll').checked = Session.get('dll');
  document.getElementById('cll').checked = Session.get('cll');
  document.getElementById('bst').checked = Session.get('bst');
})

Template.dataStructures.helpers({
  showSll: function() {
    return Session.get('sll');
  },

  showDll: function() {
    return Session.get('dll');
  },

  showCll: function() {
    return Session.get('cll');
  },

  showBst: function() {
    return Session.get('bst');
  },

  sLL: function() {
    var values = Session.get('values');
    var sll = new LinkedList();
    if (values[0] || values[0] === 0) {
      for (i=0; i<values.length; i++) {
        sll.push(values[i]);
      }
    }
    var html = jsonFixup.prettyPrint(sll);
    return Spacebars.SafeString(html);
  },

  dLL: function() {
    var values = Session.get('values');
    var dll = new DoublyLinkedList();
    if (values[0] || values[0] === 0) {
      for (i=0; i<values.length; i++) {
        dll.push(values[i]);
      }
    }
    var html = jsonFixup.prettyPrint(dll);
    return Spacebars.SafeString(html);
  },

  cLL: function() {
    var values = Session.get('values');
    var cll = new CircularLinkedList();
    if (values[0] || values[0] === 0) {
      for (i=0; i<values.length; i++) {
        cll.push(values[i]);
      }
    }
    var html = jsonFixup.prettyPrint(cll);
    return Spacebars.SafeString(html);
  },

  bST: function() {
    var values = Session.get('values');
    var bst = new BinarySearchTree();
    if (values[0] || values[0] === 0) {
      for (i=0; i<values.length; i++) {
        bst.insert(values[i]);
      }
    }
    var html = jsonFixup.prettyPrint(bst);
    return Spacebars.SafeString(html);
  }
});

Template.dataStructures.events({
  'keypress input#list-in': function (evt, template) {
    if (evt.which === 13) {
      var inputList = event.target.value;
      var inputArray = inputList.split(",");
      for (i=0; i<inputArray.length; i++) {
        var value = inputArray[i].trim()
        if (value.indexOf('\"') > -1 || value.indexOf('\'') > -1) {
          inputArray[i] = value.substring(1, value.length -1);
        } else if (!isNaN(parseInt(value))){
          inputArray[i] = parseInt(inputArray[i]);
        }
      }
      Session.set('values', inputArray);
    }
  },

  'click #data-struct > input': function (evt, template) {
    if (Session.get(evt.target.id) === true) {
      Session.set(evt.target.id, false);
    } else {
      Session.set(evt.target.id, true);
    }
  }
});
