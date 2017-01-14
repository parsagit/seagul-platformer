var menuState = {
  preload: function() {

    game.load.image('bg', 'assets/sky.png');

  },

  create: function(){
    game.add.image(0, 0, 'bg');

    var nameLabel = game.add.text(game.world.centerX, game.world.centerY, 'Smack the evil Seagulls!',{font: '50px Arial', fill: '#fff'});
    var startLabel = game.add.text(game.world.centerX, game.world.centerY + 100, 'Tap the screen to restart',{font: '30px Arial', fill: '#fff'});
    nameLabel.anchor.x = 0.5;
    nameLabel.anchor.y = 0.8;
    startLabel.anchor.x = 0.5;
    startLabel.anchor.y = 0.8;


  },

  update: function(){
    if (game.input.mousePointer.isDown || game.input.pointer1.isDown){
      game.state.start('play');
    };
  },

}
