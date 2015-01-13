'use strict';

(function (window) {
  var instance;

  var initialize = function () {
    var elements = document.getElementsByClassName('batslap');

    var i;
    for (i = 0; i < elements.length; i++) {
      addDialog(elements[i]);
    }
  };

  var addDialog = function (obj) {
    var items = ['rbn', 'bmn'];
    var item;
    var data;
    var i;

    for (i = 0; i < items.length; i++) {
      item = items[i];
      data = obj.dataset[item];
      if (data) {
        setBalloon(obj, item, data);
      }
    }
  };

  var setBalloon = function (item, className, data) {
    var span = document.createElement('span');
    span.className = 'wordballoon wordballoon-' + className;

    item.appendChild(
      span
    );

    item.appendChild(
      dialog(parseText(data), className)
    );
  };

  var dialog = function (txt, className) {
    var span = document.createElement('span');
    span.innerHTML = txt;

    var p = document.createElement('p');
    p.className = className;
    p.appendChild(span);
    return p;
  };

  var parseText = function (txt) {
    if (txt) {
      return txt
        .replace(/\*\*(.+)\*\*/, '<strong>$1</strong>')
        .replace(/\*(.+)\*/, '<em>$1</em>');
    }
  };

  var changeText = function (txt, className) {
    var elements = document.getElementsByClassName(className);
    var i;
    var elems;
    for (i = 0; i < elements.length; i++) {
      elems = elements[i].getElementsByTagName('span');
      elems[0].innerHTML = parseText(txt);
    }
  };

  var Batslap = {
    talk: changeText
  };

  initialize();

  return {
    getInstance: function () {
      if (!instance) {
        instance = Batslap;
      }
      return instance;
    }
  }

})(window);