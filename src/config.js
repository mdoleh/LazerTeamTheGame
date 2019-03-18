export default {
  type: Phaser.AUTO,
  gameWidth: 760,
  gameHeight: 400,
  localStorageName: 'phaseres6webpack',
  webfonts: ['Bangers'],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  }
}
