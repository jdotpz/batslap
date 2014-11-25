$ = require 'jquery'

class Batslap
  constructor: ->
    batslaps = $ '.batslap'
    
    for container in batslaps
      img = $ '<img>',
        attr:
          class: 'batslap'
        src: 'img/batslap.jpg'
      
      $obj = $(container)
      data = $obj.data()

      $obj.html img
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