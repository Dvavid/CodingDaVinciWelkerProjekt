/**
 *
 * This source requires Phaser 2.6.2
 */
var game = new Phaser.Game(1000, 800, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var bodies = [
  {
    filename: "P1_Koerper.png",
    name: "P1_Koerper",
    snapx: 325,
    snapy: -48,
    scale: 0.8,
    rot: 0,
    index: 1
  },
  {
    filename: "P2_Koerper.png",
    name: "P2_Koerper",
    snapx: 395,
    snapy: -55,
    scale: 1,
    rot: 15,
    index: 2
  },
  {
    filename: "P3_Koerper.png",
    name: "P3_Koerper",
    snapx: 285,
    snapy: 41,
    scale: 1,
    rot: 2,
    index: 3
  }
  ];

var heads = [
  {
    filename: "P1_Kopf.png",
    name: "P1_Kopf",
    index: 1
  },
  {
    "filename": "P2_Kopf.png",
    "name": "P2_Kopf",
    index: 2

  },
  {
    "filename": "P3_Kopf.png",
    "name": "P1_Kopf",
    index: 3

  }
  ];

var headindex=0;

function preload() {
  console.log(' preload');

  game.load.baseURL = 'assets/';
  game.load.crossOrigin = 'anonymous';

  var background;
  var dragPosition;

  for (var i=0; i<bodies.length; i++) {
    game.load.image(bodies[i]['name'], bodies[i]['filename']);
  }

  for (var i=0; i<heads.length; i++) {
    game.load.image(heads[i]['name'], heads[i]['filename']);
  }
}


function create() {

//Dropzone
  dropZone = game.add.sprite(400, 0);
  dropZone.width = 200;
  dropZone.height = 200;
  dropZone.alpha = 100;

//Load P1_Koerper
    P1_Koerper = game.add.sprite(100, 100, 'P1_Koerper');
    P1_Koerper.scale.setTo(0.5,0.5);
    P1_Koerper.inputEnabled = true;
    P1_Koerper.input.enableDrag();
    P1_Koerper.events.onInputOver.add(onOver, this);
    P1_Koerper.events.onInputOut.add(onOut, this);
    P1_Koerper.events.onDragStart.add(onDragStart, this);
    P1_Koerper.events.onDragStop.add(onDragStop, this);

//Load P2_Koerper
    P2_Koerper = game.add.sprite(100, 300, 'P2_Koerper');
    P2_Koerper.scale.setTo(0.5,0.5);
    P2_Koerper.inputEnabled = true;
    P2_Koerper.input.enableDrag();
    P2_Koerper.events.onInputOver.add(onOver, this);
    P2_Koerper.events.onInputOut.add(onOut, this);
    P2_Koerper.events.onDragStart.add(onDragStart, this);
    P2_Koerper.events.onDragStop.add(onDragStop, this);

//Load P3_Koerper
    P3_Koerper = game.add.sprite(100, 500, 'P3_Koerper');
    P3_Koerper.scale.setTo(0.5,0.5);
    P3_Koerper.inputEnabled = true;
    P3_Koerper.input.enableDrag();
    P3_Koerper.events.onInputOver.add(onOver, this);
    P3_Koerper.events.onInputOut.add(onOut, this);
    P3_Koerper.events.onDragStart.add(onDragStart, this);
    P3_Koerper.events.onDragStop.add(onDragStop, this);

//Load Head

    ActiveHead = game.add.sprite(400,0, heads[headindex]['name'])
    ActiveHead.index =heads[headindex]['index']
    //P1_Kopf = game.add.sprite(400, 0, 'P1_Kopf')
    //P1_Kopf.scale.setTo(1,1);

    dragPosition = new Phaser.Point(card.x, card.y);

}

function onOver(sprite, pointer) {

    sprite.tint = 0xefefef;

}

function onOut(sprite, pointer) {

    sprite.tint = 0xffffff;

}

function onDragStart(sprite, pointer) {

    dragPosition.set(sprite.x, sprite.y);

}

function onDragStop(sprite, pointer) {

    if (sprite.overlap(dropZone))
    {
      var dragbody = bodies.find(body => body.name === sprite.key);
      game.add.tween(sprite).to( {x: dragbody.snapx, y: dragbody.snapy}, 500, "Back.easeOut", true);
      game.add.tween(sprite.scale).to( {x: dragbody.scale, y: dragbody.scale}, 500, "Back.easeOut", true);
      game.add.tween(sprite).to( { angle: dragbody.rot }, 250, Phaser.Easing.Linear.None, true);

      console.log(sprite.key);
      console.log(dragbody.index);
      console.log(ActiveHead.key);
      console.log(ActiveHead.index);

      if (dragbody.index == ActiveHead.index) {
        console.log('yaay');
      }else {
       game.time.events.add(Phaser.Timer.SECOND * 2, disappear, this);
       function disappear(){
         game.add.tween(sprite).to( {x: sprite.x+0, y: sprite.y+1000}, 1000, "Back.easeOut", true);
       }

      }
    }
    //elseif dragtooriginallocation

    }



function update () {

}

function render () {

}
