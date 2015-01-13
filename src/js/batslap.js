'use strict';

define('Batslap',
  [
    '../html',
    '../imgs',
    '../fonts'
  ],
  function (html, imgs, fonts) {
    var balloons = [
      fs.readFileSync(
        __dirname + '/../img/rbn.jpg',
        'base64'
      ),
      fs.readFileSync(
        __dirname + '/../img/bmn.gif',
        'base64'
      )
    ];

    var mainImg = fs.readFileSync(
      __dirname + '/../img/batslap.jpg',
      'base64'
    );

    var Batslap = {
      init: function () {
        var obj;
        var data;
        var setBalloon = this.setBalloon;
        var dialog = this.dialog;
        var parseTxt = this.parse;

        $('.batslap').each(function (item) {
          obj = $(item);
          data = obj.data();
          obj.css(
            'background-image',
            'url(data:image/jpeg;base64,' + mainImg + ')'
          );

          if (data.r) {
            setBalloon(item, balloons[0], 'rbn');
          }

          if (data.b) {
            setBalloon(item, balloons[1], 'bmn');
          }

          obj.append(
            dialog(parseTxt(data.r), 'rbn')
          );

          obj.append(
            dialog(parseTxt(data.b), 'btmn')
          );
        });
      },

      setBalloon: function (item, img, className) {
        $(item).append(
          $('<span>', {
            class: 'wordballoon wordballoon-' + className
          })
            .css(
              'background-image',
              'url(data:image/jpeg;base64,' + img + ')'
            )
        );
      },

      dialog: function (txt, className) {
        return $('<p>', {
          attr: { class: className },
          html: $('<span>', { html: txt })
        });
      },

      parse: function (txt){
        if (txt) {
          return txt
            .replace(/\*\*(.+)\*\*/, '<strong>$1</strong>')
            .replace(/\*(.+)\*/, '<em>$1</em>');
        }
      }
    };

    return Batslap;
  });