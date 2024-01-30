// Preload - função que é chamada antes do início do jogo para carregar assets

function preload() {
  // Imagens
  this.load.image("background", "assets/background.png"); // Fundo de início
  this.load.image("fundo", "assets/fundo.png"); // Fundo do gameplay
  this.load.image("ovni", "assets/ovni.png"); // Objeto Ovni
  this.load.image("meteoro", "assets/meteoro.png"); // Objeto Meteoro
  this.load.image("personagem", "assets/astronauta.png"); // Objeto Personagem
  this.load.image("red", "assets/red.png"); // Efeito rosa
  this.load.image("geleia", "assets/geleia.png"); // Objeto Geleia
  this.load.image("titulo", "assets/titulo.png"); // Imagem do título
  // Áudio
  this.load.audio("start_theme", "assets/audio/DavidKBD_Cosmic_Journey.ogg"); // Música de início
  this.load.audio("play_theme", "assets/audio/DavidKBD_Nebula_Run.ogg"); // Música de gameplay
  
}

// Create - função que é chamada uma única vez, no início do jogo

function create() {
  //====================================================
  // Tela de início
  //====================================================
  // Load title and background
  var titulo = this.titulo = this.add
  .image(this.sys.scale.width / 2, this.sys.scale.height - 380, "titulo")
  .setOrigin(0.5)
  .setScale(0.9)
  .setDepth(3);
  this.background = this.add
    .image(0, 0, "background")
    .setOrigin(0, 0)
    .setDepth(2);
  // Load Music
  const start_theme = this.sound.add("start_theme", { volume: 0.1 });
  const play_theme = this.sound.add("play_theme", { volume: 0.1 });
  // Play Start Theme Music
  start_theme.play();

  // Create Start Button
  var startButtonBox = this.add.rectangle(this.sys.scale.width / 2, this.sys.scale.height - 300, 290, 50, 0x000000, 1);
  startButtonBox.setInteractive().setDepth(2);
  var startbuttonText = this.add.text(this.sys.scale.width / 2, this.sys.scale.height - 300, "Start Game").setOrigin(0.5).setDepth(2);
  // Instruction Text
  var instructions = ["Use A or W or Arrows to move",
                      "",
                      "Help the Astronaut avoid the meteors"];
  var instructionsText = this.add
    .text(this.sys.scale.width / 2, this.sys.scale.height - 230, instructions)
    .setOrigin(0.5)
    .setDepth(2)
    .setAlign("center");
  // Pause physics logic
  this.physics.pause();
  // Run game on button click
  startButtonBox.on('pointerdown', () => {
    this.sound.pauseAll();  
    this.background.destroy();
    startButtonBox.destroy();
    startbuttonText.destroy();
    instructionsText.destroy();
    titulo.destroy();
    // this.background.setDepth(0);
    // startButtonBox.setDepth(0);
    // startbuttonText.setDepth(0);
    this.physics.resume();
    play_theme.play();
  });

  // Hover button properties
  startButtonBox.on('pointerover', () => {
      startButtonBox.setFillStyle(0x000000, 1);
      this.input.setDefaultCursor('pointer');
  });

  startButtonBox.on('pointerout', () => {
      startButtonBox.setFillStyle(0x222222, 1);
      this.input.setDefaultCursor('default');
  });
  
  //====================================================
  // Tela de Gameplay
  //====================================================
  var fundo = this.physics.add // Cria o elemento de fundo
    .image(300, 2000, "fundo")
    .setScale(4)
    .setDepth(1)
    .setVelocityY(-400); 

  // Adiciona o efeito de partículas rosa ao personagem
  // Obs: É necessário consultar a API para verificar os atributos comentados 
  this.flame = this.add.particles(0, 0, "red", { 
    //frame: 'white',
    color: [0xc90076, 0xc27ba0, 0x9f0404],
    colorEase: "quad.out",
    //lifespan: 2400,
    angle: { min: -100, max: -80 },
    scale: { start: 0.4, end: 0, ease: "sine.out" },
    speed: 100,
    //advance: 2000,
    blendMode: "ADD"
  }).setDepth(1);

  // Cria um grupo de objetos Ovni
  var ovni = this.physics.add.group({ // Permite adicionar mais da mesma imagem
    defaultKey: "ovni",
    collideWorldBounds: false,
  }); 
  // Cria um objeto Meteoro
  ovni.create(100, 200)
      .setGravity(0, -300)
      .setScale(0.5)
      .setDepth(1)
      .setSize(160, 5) // Tamanho da colisão
      .setOffset(0, 0)
      .setDepth(1)
      .setGravity(0, -300)
      .setMaxVelocity(0, 400); 
  // ovni.create(500, 250).setGravity(0, -300).setScale(0.75); //cria o ovni

  // Cria um objeto Meteoro
  var meteoro = this.physics.add
    .image(100, 600, "meteoro")
    .setScale(0.75)
    .setSize(160, 5) // Tamanho da colisão
    .setOffset(0, 0)
    .setDepth(1)
    .setGravity(0, -300)
    .setMaxVelocity(0, 400); // Cria o elemento de meteoro

  // Cria um objeto Geleia
  var geleia = this.physics.add
    .image(400, 800, "geleia")
    .setScale(0.75)
    .setSize(80, 40)
    .setOffset(0, 0)
    .setDepth(1)
    .setGravity(0, -300)
    .setMaxVelocity(0, 400); //

  // Cria um objeto Personagem
  var personagem = this.physics.add
    .image(300, 80, "personagem")
    .setScale(0.5)
    .setSize(160, 5)
    .setOffset(0, 160)
    .setDrag(300, 300) // Arrasto/Movimento tipo gelo do personagem
    .setDepth(1)
    .setMaxVelocity(600, 600); //cria o personagem
  personagem.setCollideWorldBounds(true); //personagem não sair para fora da plataforma
  
  this.fundo = fundo; //atribui o fundo a uma variável
  this.meteoro = meteoro; //atribui o meteoro a uma variável
  this.personagem = personagem; //atribui o personagem a uma variavel
  this.ovni = ovni; //atribui a plataforma a uma variavel
  this.geleia = geleia; //atribui a geleia a uma variavel

  // Atribuição de inputs para o Personagem
  // Horizontais
  this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); //seta para esquerda
  this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); //seta para direita
  // Verticais (Não usados)
  // this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);//seta para cima
  // this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);//seta para baixo

  // Adição de colisão entre objetos (Não usado)
  // this.physics.add.collider(this.personagem, this.ovni);
  // this.physics.add.collider(this.personagem, this.meteoro);

  // Inicialização da variável de Vida do Personagem
  this.vida = 3;
  this.textVidas = this.add.text(16, 16, "Vida: " + this.vida).setDepth(1);
  // this.vida = vida;

  // Adição de sobreposição entre objetos Meteoro e Personagem
  this.physics.add.overlap(
    this.meteoro,
    this.personagem,
    this.reduceLife,
    null,
    this,
  );

  // Adição de sobreposição entre objetos Ovni e Personagem
  this.physics.add.overlap(
    this.ovni,
    this.personagem,
    this.reduceLife,
    null,
    this,
  );
  
  // Adição de sobreposição entre objetos Geleia e Personagem
  this.physics.add.overlap(
    this.geleia,
    this.personagem,
    this.powerUp,
    null,
    this,
  );

  this.flame.startFollow(personagem); // Adiciona rastro rosa ao personagem

  // Reset Button
  const buttonBox = this.add.rectangle(this.sys.scale.width / 2, this.sys.scale.height - 300, 290, 50, 0x000000, 1);
  buttonBox.setInteractive().setDepth(1);
  const buttonText = this.add.text(this.sys.scale.width / 2, this.sys.scale.height - 300, "Restart").setOrigin(0.5).setDepth(1);

  buttonBox.on('pointerdown', () => {
      this.scene.restart();
  });
  
  // Hover button properties
  buttonBox.on('pointerover', () => {
      buttonBox.setFillStyle(0x222222, 1); // Muda cor botão para cinza
      this.input.setDefaultCursor('pointer'); // Muda ícone do mouse para mãozinha
  });

  buttonBox.on('pointerout', () => {
      buttonBox.setFillStyle(0x000000, 1); // Muda cor do botão para branco
      this.input.setDefaultCursor('default'); // Muda ícone do mouse para seta
  });

  // Hide Button
  buttonBox.setAlpha(0);
  buttonText.setAlpha(0);

  this.buttonBox = buttonBox;
  this.buttonText = buttonText;
}

function update() {
  var fundo = this.fundo;
  let cursors = this.input.keyboard.createCursorKeys(); //cria as setas do teclado
  var personagem = this.personagem; //atribui o personagem a uma variavel
  var meteoro = this.meteoro; //atribui o meteoro a uma variavel
  var buttonBox = this.buttonBox;
  var buttonText = this.buttonText;
  var geleia = this.geleia;
  var vida = this.vida;
  
  if (cursors.left.isDown || this.a.isDown) {
    //se a seta esquerda ou a for pressionada
    personagem.setVelocityX(-300); //personagem move para a esquerda, com velocidade de 300 pixels por segundo
  } else if (cursors.right.isDown || this.d.isDown) {
    // senão se a seta direita ou d for pressionada
    personagem.setVelocityX(300); //personagem move para a direita, com velocidade de 300 pixels por segundo
  }
  
  // Ajusta a velocidade do fundo
  if (fundo.y < -1600) {
    fundo.y = 2000;
  }
  // Ajusta a posição do meteoro
  if (meteoro.y <= -50) {
    meteoro.setY(850); // meteoro volta para baixo
    meteoro.setX(Phaser.Math.Between(50, 550)); // posição aleatória do meteoro
  }
  if (geleia.y <= -50) {
    geleia.setAlpha(1);
    geleia.setY(Phaser.Math.Between(850, 1050)); // meteoro volta para baixo
    geleia.setX(Phaser.Math.Between(50, 550)); // posição aleatória do meteoro
  }

  if (vida <= 0) {
    this.add
      .text(this.sys.scale.width / 2, this.sys.scale.height - 370,  "Game Over")
      .setOrigin(0.5)
      // .setFontSize(64)
      .setDepth(1)
      .setScale(2)
      .setColor("#e00434")
      .setFont("40px Arial")
      .setAlign("center");

    
    this.physics.pause();
    this.sound.pauseAll();
    buttonBox.setAlpha(1);
    buttonText.setAlpha(1);
    
  }

  if (vida > 3) {
    this.vida = 3;
    this.textVidas.setText("Vida: " + this.vida);
  }
  
}

function reduceLife() {
  this.vida--;
  this.textVidas.setText("Vida: " + this.vida);
  this.personagem.setTint(0xff00ff, 0xff0000);
  this.personagem.setScale(0.55);
  this.time.delayedCall(300, this.clearTint, [], this);

}

function clearTint(){
  this.personagem.clearTint();
  this.personagem.setScale(0.5);
}

function powerUp() {
  this.vida++;
  this.textVidas.setText("Vida: " + this.vida);
  this.personagem.setTint(0x42f545, 0x32c0f0);
  this.personagem.setScale(0.55);
  this.time.delayedCall(300, this.clearTint, [], this);
  // this.geleia.setAlpha(0);
  // this.geleia.destroy();
  this.geleia.disableBody(true, true);
  this.geleia.enableBody(true,
                         Phaser.Math.Between(50, 550), // Random x
                         Phaser.Math.Between(1000, 1150), // Random y
                         true, true);
}

// function flashColor(color) {
//     this.setTint(color);
//     this.scene.time.addEvent({
//            delay: 500,
//            callback: function(){ this.clearTint(); },
//            callbackScope: this,
//         });
// }

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
      debug: true,
    },
  },
  scene: {
    extend: {
      reduceLife: reduceLife,// <- function added to the scene
      powerUp: powerUp,
      clearTint: clearTint
    },
    preload: preload,
    create: create,
    update: update
  },
};

const game = new Phaser.Game(config);