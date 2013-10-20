/*!
 * smartquotes.js v0.1.0
 * http://github.com/kellym/smartquotesjs
 * MIT licensed
 *
 * Copyright (C) 2013 Kelly Martin, http://kelly-martin.com
 */

(typeof('jQuery') == 'function' ? jQuery : function ( callback ) {
  var addListener = document.addEventListener || document.attachEvent,
      removeListener = document.removeEventListener ? "removeEventListener" : "detachEvent",
      eventName = document.addEventListener ? "DOMContentLoaded" : "onreadystatechange";

  addListener.call(document, eventName, function() {
    document[removeListener](eventName, arguments.callee, false);
    callback();
  }, false);
})(function() {
  var root = document.body;
  var node = root.childNodes[0];
  while(node != null) {
    if(node.nodeType == 3) {
      node.nodeValue = node.nodeValue
       .replace(/(\s|^)"/g, '$1\u201c')
       .replace(/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g, '$1\u201d$2')
       .replace(/([^0-9])"/g,'$1\u201d')
       .replace(/(\s|^)'/g, '$1\u2018')
       .replace(/([a-z])'([a-z])/ig, '$1\u2019$2')
       .replace(/((\u2019[^']*)|[a-z])'([^0-9]|$)/ig, '$1\u2019$3')
       .replace(/(\u2018)([0-9]{2}[^\2019]*)(\u2018([^0-9]|$)|$)/g, '\u2019$2$3')
       .replace(/(\B|^)(\u2018)(([^u2019]*\b)|([^\u2019]*$))/ig, '$1\u2019$3')
       .replace(/'/g, '\u2032')
       .replace(/"/g, '\u2033');
    }
    if(node.hasChildNodes() && node.firstChild.nodeName != "CODE") {
      node = node.firstChild;
    } else {
      do {
        while(node.nextSibling == null && node != root) {
          node = node.parentNode;
        }
        node = node.nextSibling;
      } while (node && node.nodeName == "CODE");
    }
  }
});
