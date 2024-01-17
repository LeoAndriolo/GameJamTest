function preload() {
  this.load.image("fundo", "assets/fundo.png"); // Carrega a imagem de fundo
  this.load.image("ovni", "assets/ovni.png"); // Carrega a imagem do obstáculo
  this.load.image("meteoro", "assets/meteoro.png"); // Carrega a imagem do meteoro
  this.load.image("personagem", "assets/astronauta.png"); // Carrega a imagem do personagem
  this.load.image("red", "assets/red.png"); // Carrega o atlas de partículas
}

function create() {
  var fundo = this.physics.add
    .image(300, 2000, "fundo")
    .setScale(4)
    .setVelocityY(-400); // Cria o elemento de fundo

  // Adiciona o atlas de partículas ao personagem
  this.flame = this.add.particles(0, 0, "red", {
    //frame: 'white',
    color: [0xc90076, 0xc27ba0, 0x9f0404],
    colorEase: "quad.out",
    //lifespan: 2400,
    angle: { min: -100, max: -80 },
    scale: { start: 0.4, end: 0, ease: "sine.out" },
    speed: 100,
    //advance: 2000,
    blendMode: "ADD",
  });

  var ovni = this.physics.add.group({
    defaultKey: "ovni",
    collideWorldBounds: false,
  }); //adicionar mais da mesma imagem
  ovni.create(100, 200).setGravity(0, -300).setScale(0.75); //cria o ovni
  ovni.create(500, 250).setGravity(0, -300).setScale(0.75); //cria o ovni

  var meteoro = this.physics.add
    .image(300, 500, "meteoro")
    .setScale(0.75)
    .setSize(160, 5)
    .setOffset(0, 0)
    .setGravity(0, -300)
    .setMaxVelocity(0, 300);; // Cria o elemento de meteoro

  // var meteoro = this.physics.add.group(
  //   {
  //     defaultKey: 'meteoro',
  //     collideWorldBounds: false
  //   }
  // );//adicionar mais da mesma imagem
  // meteoro.create(300, 400).setGravity(0, -300).setScale(0.75);

  var personagem = this.physics.add
    .image(300, 80, "personagem")
    .setScale(0.5)
    .setSize(160, 5)
    .setOffset(0, 160)
    .setDrag(300, 300)
    .setMaxVelocity(600, 600); //cria o personagem
  // var personagem = this.physic.add.sprite(100, 330, 'personagem');//posição inicial do personagem
  personagem.setCollideWorldBounds(true); //personagem não sair para fora da plataforma
  //personagem.setGravity(0,3000); //personagem sofre gravidade

  // this.chao = chao;//atribui o chão a uma variável
  this.fundo = fundo; //atribui o fundo a uma variável
  this.meteoro = meteoro; //atribui o meteoro a uma variável
  this.personagem = personagem; //atribui o personagem a uma variavel
  this.ovni = ovni; //atribui a plataforma a uma variavel
  //this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);//seta para cima
  this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); //seta para esquerda
  // this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);//seta para baixo
  this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); //seta para direita
  this.physics.add.collider(this.personagem, this.ovni);
  // this.physics.add.collider(this.personagem, this.meteoro);

  this.vida = 3;
  this.textVidas = this.add.text(16, 16, "Vida: " + this.vida);
  // this.vida = vida;

  this.physics.add.overlap(
    this.meteoro,
    this.personagem,
    this.reduceLife,
    null,
    this,
  );

  this.flame.startFollow(personagem); // Adiciona rastro rosa ao personagem
}

function update() {
  // reduceLife(){
  //   this.vida--;
  //   this.add.text(16, 16, 'Vida: ' + this.vida);
  //   // if(this.vida <= 0){
  //   //   this.scene.start('GameOver');
  //   // }
  // }

  //var vida = this.vida;
  var fundo = this.fundo;
  let cursors = this.input.keyboard.createCursorKeys(); //cria as setas do teclado
  var personagem = this.personagem; //atribui o personagem a uma variavel
  var meteoro = this.meteoro; //atribui o meteoro a uma variavel
  
  if (cursors.left.isDown || this.a.isDown) {
    //se a seta esquerda ou a for pressionada
    personagem.setVelocityX(-300); //personagem move para a esquerda, com velocidade de 300 pixels por segundo
  } else if (cursors.right.isDown || this.d.isDown) {
    // senão se a seta direita ou d for pressionada
    personagem.setVelocityX(300); //personagem move para a direita, com velocidade de 300 pixels por segundo
  }

  //console.log(fundo.y);
  if (fundo.y < -1600) {
    fundo.y = 2000;
  }

  if (meteoro.y <= -50) {
    meteoro.setY(850);
    meteoro.setX(Phaser.Math.Between(50, 550));
  }
}

function reduceLife() {
  this.vida--;
  this.textVidas.setText("Vida: " + this.vida);
  this.personagem.setTint(0xff00ff, 0xff0000);
  // this.personagem.clearTint();
  if(this.vida <= 0){
    this.textVidas.setText("Vida: Game Over");
    this.scene.pause();
  }
}

const config = {
  type: Phaser.AUTO, // Canva ou WebGL
  width: 600, //largura
  height: 800, //altura
  backgroundColor: "#f9f9f9", //cor de fundo
  autoCenter: Phaser.Scale.CENTER_HORIZONTALLY, //centraliza o jogo
  physics: {
    //fisica
    default: "arcade", //tipo de fisica
    arcade: {
      gravity: {
        y: 0, //gravidade
      },
      debug: false,
    },
  },
  scene: {
    extend: {
      reduceLife: reduceLife, // <- function added to the scene
    },
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
