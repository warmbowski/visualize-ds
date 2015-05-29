jsonFixup = {
  // stringify and serializer based on code from json-stringify-safe npm package
  stringify: function(obj, replacer, spaces, cycleReplacer) {
    return JSON.stringify(obj, this.serializer(replacer, cycleReplacer), spaces)
  },

  serializer: function(replacer, cycleReplacer) {
    var stack = [], keys = []

    if (cycleReplacer == null) cycleReplacer = function(key, value) {
      if (stack[0] === value) return "[Circular ~]"
      return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
    }

    return function(key, value) {
      if (stack.length > 0) {
        var thisPos = stack.indexOf(this)
        ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
        ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
        if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
      } else {
        stack.push(value);
      }

      return replacer == null ? value : replacer.call(this, key, value)
    }
  },

// prettyPrint and replacer based on code from http://jsfiddle.net/unLSJ/
  replacer: function(match, pIndent, pKey, pVal, pEnd) {
    var key = '<span class=json-key>';
    var val = '<span class=json-value>';
    var str = '<span class=json-string>';
    var keyVal = '<span class=json-keyValue>';
    var r = pIndent || '';
    if (pKey)
      r = r + (pKey == '\"value\": ' ? keyVal : key) + pKey.replace(/[": ]/g, '') + '</span>: ';
    if (pVal)
      r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
    return r + (pEnd || '');
  },

  prettyPrint: function(obj) {
    var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
    return this.stringify(obj, null, 3)
      .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(jsonLine, this.replacer);
  }
};