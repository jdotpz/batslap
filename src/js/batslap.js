'use strict';

var Batslap = (function () {
  var instance;

  var $ = require('jquery');

  var Batslap = {
    init: function () {
      var obj;
      var data;
      var setBalloon = this.setBalloon;
      var dialog = this.dialog;
      var parseTxt = this.parse;

      $('.batslap').each(function (index, item) {
        obj = $(item);
        data = obj.data();

        if (data.r) {
          setBalloon(item, 'rbn');
        }

        if (data.b) {
          setBalloon(item, 'bmn');
        }

        obj.append(
          dialog(parseTxt(data.r), 'rbn')
        );

        obj.append(
          dialog(parseTxt(data.b), 'btmn')
        );
      });
    },

    setBalloon: function (item, className) {
      $(item).append(
        $('<span>', {
          class: 'wordballoon wordballoon-' + className
        })
      );
    },

    dialog: function (txt, className) {
      return $('<p>', {
        attr: { class: className },
        html: $('<span>', { html: txt })
      });
    },

    parse: function (txt) {
      if (txt) {
        return txt
          .replace(/\*\*(.+)\*\*/, '<strong>$1</strong>')
          .replace(/\*(.+)\*/, '<em>$1</em>');
      }
    }
  };

  return {
    getInstance: function () {
      if (!instance) {
        instance = Batslap;
      }
      return instance;
    }
  }

})();

window.bs = Batslap.getInstance();
window.bs.init();