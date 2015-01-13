'use strict';

var Batslap = (function () {
  var instance;

  var initialize = function () {
    var elements = document.getElementsByClassName('batslap');

    var i;
    for (i = 0; i < elements.length; i++) {
      addDialog(elements[i]);
    }
  }

  var addDialog = function (obj) {
    var items = ['rbn', 'bmn'];
    var item;
    var data;
    var i;
    
    for (i = 0; i < items.length; i++) {
      item = items[i];
      data = obj.dataset[item];
      if (data) {
        setBalloon(obj, item);
        obj.appendChild(
          dialog(parseText(data), item)
        );
      }
    }
  }

  var setBalloon = function (item, className) {
    var span = document.createElement('span');
    span.className = 'wordballoon wordballoon-' + className;

    item.appendChild(
      span
    );
  }

  var dialog = function (txt, className) {
    var span = document.createElement('span');
    span.innerHTML = txt;

    var p = document.createElement('p');
    p.className = className;
    p.appendChild(span);
    return p;
  }

  var parseText = function (txt) {
    if (txt) {
      return txt
        .replace(/\*\*(.+)\*\*/, '<strong>$1</strong>')
        .replace(/\*(.+)\*/, '<em>$1</em>');
    }
  }

  var Batslap = {
  };

  return {
    getInstance: function () {
      if (!instance) {
        initialize();
        instance = Batslap;
      }
      return instance;
    }
  }

})();

window.bs = Batslap.getInstance();