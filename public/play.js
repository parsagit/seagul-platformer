var player;
var platforms;
var cursors;
var sky;

var music;

var stars;
var score = 0;
var scoreText;


var playState = {
    create: function () {

    //music

    music = game.add.audio('yodasong');

    music.play();

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  how to make camera follow work nicely?
    sky = game.add.tileSprite(0, 0, 800, 1920, 'sky');


    game.world.setBounds(0, 0, 800, 1920);

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(10, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //Now let's generate random ledges

    var platformY = 1700;

    for (var i = 0; i < 15; i++){
    ledge = platforms.create((Math.random() * 500), platformY - (i*100 + Math.random() * 10), 'ground')
    ledge.body.immovable = true;

    }
    // The player and its settings
    player = game.add.sprite(game.world.centerX, 1800, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.3;
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //seagull explosion animation

    //  Finally some stars to collect
    stars = game.add.group();

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 500;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.1 + Math.random() * 0.2;
    }

    //  The score
    scoreText = game.add.text(player.body.x, player.body.y, 'score: 0', { fontSize: '32px', fill: '#fff' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    //camera and text follow
    game.camera.follow(player);

    scoreText.fixedToCamera = true;
    scoreText.cameraOffset.setTo(0, 0);
  },

  update: function (){
    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, this.collectStar, null, this);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;


    //mouse movement
    //left
    if (game.input.mousePointer.isDown && (game.input.mousePointer.x < player.body.x)){
      player.body.velocity.x = -200;

      player.animations.play('left');
      if((player.body.touching.down || player.body.touching.right || player.body.touching.left) && (game.input.mousePointer.x - player.body.x) > -150)
      {

          player.body.velocity.y = -600;
      }
    }
    //right
    if (game.input.mousePointer.isDown && (game.input.mousePointer.x > player.body.x)){
      player.body.velocity.x = 200;

      player.animations.play('right');

      if((player.body.touching.down || player.body.touching.right || player.body.touching.left) && (game.input.mousePointer.x - player.body.x) < 150)
      {
          player.body.velocity.y = -600;
      }
    }
    //stand still
    if (game.input.mousePointer.isDown && (game.input.mousePointer.x < player.body.x) && (10 > (game.input.mousePointer.x - player.body.x)) && (-10 < (game.input.mousePointer.x - player.body.x))){

      player.animations.stop();

      player.frame = 4;
    }


    //touch screen movement
    //left
    if (game.input.pointer1.isDown && (game.input.pointer1.x < player.body.x)){
      player.body.velocity.x = -200;

      player.animations.play('left');

      //jump left
      if((player.body.touching.down || player.body.touching.right || player.body.touching.left) && (game.input.pointer1.x - player.body.x) > -350)
      {
          player.body.velocity.y = -600;
      }
    }
    //right
    if (game.input.pointer1.isDown && (game.input.pointer1.x > player.body.x)){
      player.body.velocity.x = 200;

      player.animations.play('right');

      //jump right
      if((player.body.touching.down || player.body.touching.right || player.body.touching.left) && (game.input.mousePointer.x - player.body.x) < 350)
      {
          player.body.velocity.y = -600;
      }
    }
    //stand still
    if (game.input.pointer1.isDown && (game.input.pointer1.x < player.body.x) && (10 > (game.input.pointer1.x - player.body.x)) && (-10 < (game.input.pointer1.x - player.body.x))){

      player.animations.stop();

      player.frame = 4;
    }


    //keyboard movement
    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -200;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 200;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && (player.body.touching.down || player.body.touching.right || player.body.touching.left))
    {
        player.body.velocity.y = -600;
    }

  },

  collectStar: function (player, star) {

      // Removes the star from the screen
      star.kill();

      //  Add and update the score
      score += 10;
      scoreText.text = 'Score: ' + score;

      if (score == 120) {
        this.Win();
      }

  },

  Win: function(){
    score = 0;
    music.stop();
    game.state.start('win', this);
  }


}
