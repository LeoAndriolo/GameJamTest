function preload() {
  this.load.image('fundo', 'assets/fundo.png');// Carrega a imagem de fundo
  this.load.image('ovni', 'assets/ovni.png');// Carrega a imagem do obstáculo
  this.load.image('meteoro', 'assets/meteoro.png');//this.load.spritesheet('personagem', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });//tamanho de cada sprite
  this.load.image('personagem', 'assets/astronauta.png');// Carrega a imagem do personagem
}

function create() {
  var fundo = this.physics.add
    .image(300, 2000, 'fundo')
    .setScale(4)
    .setVelocityY(-400);// Cria o elemento de fundo
  //fundo.create(300, 2400, 'fundo').setScale(4).setGravityY(-300);
  // this.add.image(300, 2400, 'fundo').setScale(4);//cria o fundo e o posiciona no centro da tela
  // var chao = this.physics.add.staticGroup();//cria um grupo de chão
  // chao.create(300, 385, 'obstaculo').setScale(2).refreshBody();//cria o chao e o posiciona no centro da tela

  var ovni = this.physics.add.group(
    {
      defaultKey: 'ovni',
      collideWorldBounds: false
    }
  );//adicionar mais da mesma imagem
  // platform.create(50, 150, 'obstaculo');//cria a plataforma
  // platform.create(550, 250, 'obstaculo');//cria a plataforma
  ovni.create(100, 200).setGravity(0, -300).setScale(0.75);//cria a plataforma
  ovni.create(500, 250).setGravity(0, -300).setScale(0.75);//cria a plataforma
  // platform.setGravity(0, -3000);//define a gravidade
  var meteoro = this.physics.add.group(
    {
      defaultKey: 'meteoro',
      collideWorldBounds: false
    }
  );//adicionar mais da mesma imagem
  // platform.create(50, 150, 'obstaculo');//cria a plataforma
  // platform.create(550, 250, 'obstaculo');//cria a plataforma
  meteoro.create(300, 400).setGravity(0, -300).setScale(0.75);//cria a plataforma

  var personagem = this.physics.add
    .image(300, 80, 'personagem')
    .setScale(0.5)
    .setDrag(300, 300)
    .setMaxVelocity(600, 600);//cria o personagem
  // var personagem = this.physic.add.sprite(100, 330, 'personagem');//posição inicial do personagem
  personagem.setCollideWorldBounds(true);//personagem não sair para fora da plataforma
  //personagem.setGravity(0,3000); //personagem sofre gravidade

  // this.chao = chao;//atribui o chão a uma variável
  this.fundo = fundo;//atribui o fundo a uma variável
  this.meteoro = meteoro;//atribui o meteoro a uma variável
  this.personagem = personagem;//atribui o personagem a uma variavel
  this.ovni = ovni;//atribui a plataforma a uma variavel
  //this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);//seta para cima
  this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);//seta para esquerda
 // this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);//seta para baixo
  this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);//seta para direita
  this.physics.add.collider(this.personagem, this.ovni);
  this.physics.add.collider(this.personagem, this.meteoro);
  
  var vida = 3;
  this.add.text(16, 16, 'Vida: ' + vida);
  this.vida = vida;
  
  // console.log('Vida: '+this.vida);
  // this.physics.add.overlap(this.personagem, this.meteoro, vida--, null, this);
  // console.log('Vida depois: '+this.vida);
}

function update() {
  //var vida = this.vida;
  var fundo = this.fundo;
  let cursors = this.input.keyboard.createCursorKeys();//cria as setas do teclado
  var personagem = this.personagem;//atribui o personagem a uma variavel

  if (cursors.left.isDown || this.a.isDown) { //se a seta esquerda ou a for pressionada
    personagem.setVelocityX(-300);//personagem anda para a esquerda, com velocidade de 160 pixels por segundo
    // personagem.anims.play('esquerda', true);//ativa animaçao de andar para a esquerda	
  } else if (cursors.right.isDown || this.d.isDown) { // senão se a seta direita ou d for pressionada
    personagem.setVelocityX(300);//personagem anda para a direita, com velocidade de 160 pixels por segundo
    // personagem.anims.play('direita', true);//ativa animaçao de andar para a direita
  }
  // else { //senão 
  //   personagem.setVelocityX(0);//personagem parado
  //   // personagem.anims.play('parado');//ativa animaçao de parado
  // }
  // if (cursors.up.isDown || this.w.isDown) { //senão se a seta cima ou w for pressionada
  //   personagem.setVelocityY(-160);//personagem anda para cima, com velocidade de 160 pixels por segundo
  // } else if (cursors.down.isDown || this.s.isDown) { //senão se a seta baixo ou s for pressionada
  //   personagem.setVelocityY(160);//personagem anda para baixo, com velocidade de 160 pixels por segundo
  // } else {
  //   personagem.setVelocityY(0);//personagem parado
  // }
  //console.log(fundo.y);
  if (fundo.y < -1600) {
    fundo.y = 2000;
  }
  
}

const config = {
  type: Phaser.AUTO, // Canva ou WebGL
  width: 600,//largura
  height: 800,//altura
  backgroundColor: '#f9f9f9',//cor de fundo
  autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,//centraliza o jogo
  physics: { //fisica
    default: 'arcade', //tipo de fisica
    arcade: {
      gravity: {
        y: 0 //gravidade
      },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);