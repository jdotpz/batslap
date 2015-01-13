'use strict';

var Batslap = (function () {
  var instance;

  function initialize() {
    var elements = document.getElementsByClassName('batslap');
    var dialogData = [];

    var i;
    for (i = 0; i < elements.length; i++) {
      addDialog(elements[i]);
    }

    function addDialog (obj) {
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
    }

    function setBalloon (item, className, data) {
      var span = document.createElement('span');
      span.className = 'wordballoon wordballoon-' + className;

      item.appendChild(
        span
      );

      item.appendChild(
        dialog(parseText(data), className)
      );
    }

    function dialog (txt, className) {
      var span = document.createElement('span');
      span.innerHTML = txt;

      var p = document.createElement('p');
      p.className = className;
      p.appendChild(span);
      return p;
    }

    function parseText (txt) {
      if (txt) {
        return txt
          .replace(/\*\*(.+)\*\*/, '<strong>$1</strong>')
          .replace(/\*(.+)\*/, '<em>$1</em>');
      }
    }

    function talk(txt, who, index) {
      if (index) {
        dialogData[index][who] = txt;
      }
      else {
        var i;
        for (i = 0; i < dialogData.length; i++) {
          dialogData[i][who] = txt;
        }
      }
    }

    return {
      rtalk: function (txt, index) {
        talk(txt, 'rbn', index);
      },

      btalk: function (txt, index) {
        talk(txt, 'bmn', index);
      }
    }
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = initialize();
      }
      return instance;
    }
  }

})();

window.Batslap = Batslap.getInstance();