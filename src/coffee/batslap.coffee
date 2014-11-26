$ = require 'jquery'
insertCss = require 'insert-css'
fs = require 'fs'

css = fs.readFileSync __dirname + '/../../dist/batslap.css', 'utf8'
img = fs.readFileSync __dirname + '/../img/batslap.jpg', 'base64'
balloonA = fs.readFileSync __dirname + '/../img/rbn.jpg', 'base64'
balloonB = fs.readFileSync __dirname + '/../img/bmn.gif', 'base64'

fnt = fs.readFileSync(
  __dirname + '/../fonts/unmaskedbb_ot/UnmaskedBB.otf'
  'base64'
)

fnt_b = fs.readFileSync(
  __dirname + '/../fonts/unmaskedbb_ot/UnmaskedBB_bold.otf'
  'base64'
)

fnt_i = fs.readFileSync(
  __dirname + '/../fonts/unmaskedbb_ot/UnmaskedBB_ital.otf'
  'base64'
)

class Batslap
  constructor: ->
    batslaps = $ '.batslap'

    style = $ '<style>'
    style.type = 'text/css'
    style.append document.createTextNode "\
      @font-face {\
        font-family: 'unmasked';\
        src: url('data:font/opentype;base64,#{fnt}');\
      }
      @font-face {\
        font-family: 'unmasked-bold';\
        src: url('data:font/opentype;base64,#{fnt_b}');\
      }
      @font-face {\
        font-family: 'unmasked-ital';\
        src: url('data:font/opentype;base64,#{fnt_i}');\
      }"
    $('head').append style
    insertCss css
    
    for container in batslaps
      $obj = $(container)
      data = $obj.data()

      $obj.css 'background-image', 'url(data:image/jpeg;base64,' + img + ')'

      if data.r?
        wordballoonA = $ '<span>',
          class: 'wordballoon wordballoon-rbn'
        wordballoonA.css(
          'background-image', 'url(data:image/jpeg;base64,' + balloonA + ')'
        )
        $obj.append wordballoonA

      if data.b?
        wordballoonB = $ '<span>',
          class: 'wordballoon wordballoon-bmn'
        wordballoonB.css(
          'background-image', 'url(data:image/jpeg;base64,' + balloonB + ')'
        )
        $obj.append wordballoonB

      $obj.append @dialog(data.r, 'rbn', data.style)
      $obj.append @dialog(data.b, 'btmn', data.style)

  dialog: (txt, className, style)->
    if txt
      strong = /\*\*(.+)\*\*/
      em = /\*(.+)\*/
      txt = txt.replace strong, '<strong>$1</strong>'
      txt = txt.replace em, '<em>$1</em>'

      s = $ '<span>',
        html: txt

      obj = $ '<p>',
        attr:
          class: className
        html: s

      return obj

batslap = new Batslap

module.exports = Batslap