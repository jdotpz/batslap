'use strict';

var Batslap = (function () {
  var instance;

  function initialize() {
    var elements = document.getElementsByClassName('batslap');
    var dialogDom = [];
    var balloons = [];
    var skipindex = [];
    var i;

    // adds an array of indices to skip
    function skipIndices(indices) {
      skipindex = indices;
    }

    // Parses text to add strong and emphasis tags.
    function parseText(txt) {
      if (txt) {
        return txt
          .replace(/\*\*(.+)\*\*/, '<strong>$1</strong>')
          .replace(/\*(.+)\*/, '<em>$1</em>');
      }
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

    // Adds a word balloon with dialog gathered from data attribute.
    function addDialog(item, index) {
      var classNames = ['rbn', 'bmn'];
      var className;
      var n;

      for (n = 0; n < classNames.length; n++) {
        className = classNames[n];

        // Add a word balloon to the dom.
        addBalloon(item, className, item.dataset[className], index);
      }
    }

    function showHideBalloon(index, className, hide) {
      var bclass = balloons[index][className].className.split(' ');
      for (i = 0; i < bclass.length; i++) {
        if (bclass[i] === 'hide') {
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

      // if this is not an index we should skip...
      if (skipindex.indexOf(index) === -1) {
        balloons[index][className].className = bclass.join(' ');
      }
    }

    function changeText(txt, className, index, hide) {
      showHideBalloon(index, className, hide);

      if (!txt) {
        txt = '';
      }

      // if this is not an index we should skip...
      if (skipindex.indexOf(index) === -1) {
        dialogDom[index][className].innerHTML = txt;
      }
    }

    // Change text for all or one instance of batslap.
    function talk(txt, className, index) {
      var n;
      txt = parseText(txt);
      var hide = (!txt) ? true : false;

      if (index === false || index === undefined || index === null) {
        for (n = 0; n < dialogDom.length; n++) {
          changeText(txt, className, n, hide);
        }
      } else {
        changeText(txt, className, index, hide);
      }
    }

    // Create dom elements and load data.
    for (i = 0; i < elements.length; i++) {
      addDialog(elements[i], i);
    }

    return {
      rtalk: function (txt, index) {
        console.log(txt, index);
        talk(txt, 'rbn', index);
      },

      btalk: function (txt, index) {
        talk(txt, 'bmn', index);
      },

      skipIndices: function(indices) {
        skipIndices(indices);
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