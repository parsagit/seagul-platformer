var startState = {

  preload: function () {
    //load assets
    game.load.image('sky', 'assets/background.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/seagull.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.audio('yodasong', '/assets/yodasong.mp3');
  },

  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //starting the menu state after loading assets and starting graphics engine
    game.state.start('menu');

  },

}
