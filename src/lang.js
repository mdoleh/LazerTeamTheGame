import idiom from 'idiom.js'

const lang = idiom({
  // en-US
  'default': {
    'title': 'Lazer Team the Movie the Game'
  }
})

export default lang(window.navigator.language)
