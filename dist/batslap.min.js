'use strict';

var Batslap = (function () {
  var instance;

  function initialize() {
    var elements = document.getElementsByClassName('batslap');
    var dialogDom = [];
    var balloons = [];
    var i;

    // Create dom elements and load data.
    for (i = 0; i < elements.length; i++) {
      addDialog(elements[i], i);
    }

    // Adds a word balloon with dialog gathered from data attribute.
    function addDialog(item, index) {
      var classNames = ['rbn', 'bmn'];
      var className;
      var i;

      for (i = 0; i < classNames.length; i++) {
        className = classNames[i];

        // Add a word balloon to the dom.
        addBalloon(item, className, item.dataset[className], index);
      }
    }

    // Adds a word balloon to dom.
    function addBalloon(item, className, data, index) {
      var span = document.createElement('span');
      var classNames = ['wordballoon', 'wordballoon-' + className];

      if (!data) {
        classNames.push('hide');
      }

      if (!balloons[index]) {
        balloons[index] = {};
      }

      span.className = classNames.join(' ');

      balloons[index][className] = span;

      item.appendChild(
        span
      );

      item.appendChild(
        addText(parseText(data), className, index)
      );
    }

    // Adds text to dom.
    function addText(txt, className, index) {
      var span = document.createElement('span');

      if (txt) {
        span.innerHTML = txt;
      }

      if (!dialogDom[index]) {
        dialogDom[index] = {};
      }
      dialogDom[index][className] = span;

      var p = document.createElement('p');
      p.className = className;
      p.appendChild(span);
      return p;
    }

    // Parses text to add strong and emphasis tags.
    function parseText(txt) {
      if (txt) {
        return txt
          .replace(/\*\*(.+)\*\*/, '<strong>$1</strong>')
          .replace(/\*(.+)\*/, '<em>$1</em>');
      }
    }

    // Change text for all or one instance of batslap.
    function talk(txt, className, index) {
      var i;
      var txt = parseText(txt);
      var hide = (!txt) ? true : false;

      if (index === false || index === undefined) {
        for (i = 0; i < dialogDom.length; i++) {
          changeText(txt, className, i, hide);
        }
      } else {
        changeText(txt, className, index, hide);
      }
    }

    function changeText(txt, className, index, hide) {
      showHideBalloon(index, className, hide);
      if (!txt) {
        txt = '';
      }
      dialogDom[index][className].innerHTML = txt;
    }

    function showHideBalloon(index, className, hide) {
      var bclass = balloons[index][className].className.split(' ');
      for (i = 0; i < bclass.length; i++) {
        if (bclass[i] == 'hide') {
          if (!hide) {
            bclass[i] = undefined;
          } else {
            hide = false;
          }
        }
      }

      if (hide) {
        bclass.push('hide');
      }

      balloons[index][className].className = bclass.join(' ');
    }

    return {
      rtalk: function (txt, index) {
        talk(txt, 'rbn', index);
      },

      btalk: function (txt, index) {
        talk(txt, 'bmn', index);
      }
    };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = initialize();
      }
      return instance;
    }
  };

})();

window.Batslap = Batslap.getInstance();