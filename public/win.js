var winState = {
  preload: function() {

    game.load.image('bg', 'assets/yoda.png');

  },
  create: function(){
    game.add.image(0, 0, 'bg');

    var winLabel = game.add.text(400, 300, 'You Won! Yoda Approves!',{font: '50px Arial', fill: '#00ff00'});
    var startLabel = game.add.text(400, 400, 'Tap the screen to restart',{font: '30px Arial', fill: '#fff'});

    winLabel.anchor.x = 0.5;
    winLabel.anchor.y = 0.8;
    startLabel.anchor.x = 0.5;
    startLabel.anchor.y = 0.8;

  },
  update: function(){
    if (game.input.mousePointer.isDown || game.input.pointer1.isDown){
      game.state.start('play');
    };
  },
}
