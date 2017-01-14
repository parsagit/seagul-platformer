var game = new Phaser.Game(800, 600, Phaser.AUTO, "game");

Phaser.ScaleManager.EXACT_FIT = 1;

game.state.add('start', startState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);

game.state.start('start');
