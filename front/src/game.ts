import Phaser from 'phaser';

class MyGame extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }

  preload() {
    // 画像などのアセットをロード
  }

  create() {
    this.add.text(100, 100, 'Hello Phaser!', { color: '#0f0' });
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: MyGame,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 300 },
      debug: false
    }
  }
};

new Phaser.Game(config);
