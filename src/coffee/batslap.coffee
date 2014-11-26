$ = require 'jquery'
insertCss = require 'insert-css'
fs = require 'fs'

css = fs.readFileSync __dirname + '/../../dist/batslap.css', 'utf8'
img = fs.readFileSync __dirname + '/../img/batslap.jpg', 'base64'

fnt = fs.readFileSync(
  __dirname + '/../fonts/unmaskedbb_ot/UnmaskedBB.otf'
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
      }"

    $('head').append style
    insertCss css
    
    for container in batslaps
      $obj = $(container)
      data = $obj.data()

      $obj.css 'background-image', 'url(data:image/jpeg;base64,' + img + ')'
      console.log img

      $obj.append @dialog(data.r, 'rbn')
      $obj.append @dialog(data.b, 'btmn')

  dialog: (txt, className)->
    s = $ '<span>',
      text: txt

    obj = $ '<p>',
      attr:
        class: className
      html: s

    return obj

batslap = new Batslap

module.exports = Batslap