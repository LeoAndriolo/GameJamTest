  function preload() {
    this.load.image('fundo', 'assets/sky.png');// Carrega a imagem de fundo
    this.load.image('obstaculo', 'assets/platform.png');// Carrega a imagem do obstáculo
    this.load.spritesheet('personagem', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });//tamanho de cada sprite
  }

  function create() {
    this.add.image(300, 200, 'fundo');//cria o fundo e o posiciona no centro da tela
    var chao = this.physics.add.staticGroup();//cria um grupo de chão
    chao.create(300, 385, 'obstaculo').setScale(2).refreshBody();//cria o chao e o posiciona no centro da tela

    var platform = this.physics.add.group(
      {
          defaultKey: 'obstaculo',
          collideWorldBounds: true
      }
    );//adicionar mais da mesma imagem
    // platform.create(50, 150, 'obstaculo');//cria a plataforma
    // platform.create(550, 250, 'obstaculo');//cria a plataforma
    platform.create(50, 200).setGravity(0, -300);//cria a plataforma
    platform.create(550, 250).setGravity(0, -300);//cria a plataforma
    // platform.setGravity(0, -3000);//define a gravidade

    var personagem = this.physics.add.sprite(100, 330, 'personagem');//posição inicial do personagem
    personagem.setCollideWorldBounds(true);//personagem não sair para fora da plataforma
    //personagem.setGravity(0,3000); //personagem sofre gravidade

    this.anims.create({//cria o personagem parado
      key: 'parado',
      frames: [{ key: 'personagem', frame: 4 }],//onde está o personagem parado na imagem
    });

    this.anims.create({//cria o personagem andando para a esquerda
      key: 'esquerda',
      frames: this.anims.generateFrameNumbers('personagem', { start: 0, end: 3 }),//frame que começa e acaba
      frameRate: 10,//velocidade que muda o sprite
      repeat: -1//??
    });

    this.anims.create({//cria o personagem andando para a direita
      key: 'direita',
      frames: this.anims.generateFrameNumbers('personagem', { start: 5, end: 8 }),//frame que começa e acaba
      frameRate: 10,//velocidade que muda o sprite
      repeat: -1//??
    });
    this.chao = chao;//atribui o chão a uma variável
    this.personagem = personagem;//atribui o personagem a uma variavel
    this.platform = platform;//atribui a plataforma a uma variavel
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);//seta para cima
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);//seta para esquerda
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);//seta para baixo
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);//seta para direita
    this.physics.add.collider(this.personagem, this.platform);
    this.physics.add.collider(this.personagem, this.chao);
  }

  function update() {
    let cursors = this.input.keyboard.createCursorKeys();//cria as setas do teclado
    var personagem = this.personagem;//atribui o personagem a uma variavel

    if (cursors.left.isDown || this.a.isDown) { //se a seta esquerda ou a for pressionada
      personagem.setVelocityX(-160);//personagem anda para a esquerda, com velocidade de 160 pixels por segundo
      personagem.anims.play('esquerda', true);//ativa animaçao de andar para a esquerda	
    } else if (cursors.right.isDown || this.d.isDown) { // senão se a seta direita ou d for pressionada
      personagem.setVelocityX(160);//personagem anda para a direita, com velocidade de 160 pixels por segundo
      personagem.anims.play('direita', true);//ativa animaçao de andar para a direita
    } else { //senão 
      personagem.setVelocityX(0);//personagem parado
      personagem.anims.play('parado');//ativa animaçao de parado
    }
    if (cursors.up.isDown || this.w.isDown) { //senão se a seta cima ou w for pressionada
      personagem.setVelocityY(-160);//personagem anda para cima, com velocidade de 160 pixels por segundo
    } else if (cursors.down.isDown || this.s.isDown) { //senão se a seta baixo ou s for pressionada
      personagem.setVelocityY(160);//personagem anda para baixo, com velocidade de 160 pixels por segundo
    } else {
      personagem.setVelocityY(0);//personagem parado
    }

  }

  const config = {
    type: Phaser.AUTO, // Canva ou WebGL
    width: 600,//largura
    height: 400,//altura
    backgroundColor: '#f9f9f9',//cor de fundo
    autoCenter: Phaser.Scale.CENTER_BOTH,//centraliza o jogo
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