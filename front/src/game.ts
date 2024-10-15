import Phaser from 'phaser';

class MyGame extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }

  preload() {
    // アセットは何もロードしないので、ここは空
  }

  create() {
    // テキストを指定した位置に表示
    this.add.text(200, 250, 'Hello, Phaser!', {
      font: '48px Arial',
      color: '#ffffff',
      fontStyle: 'bold',
    });
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: MyGame,
  backgroundColor: '#000000', // 黒い背景
};

new Phaser.Game(config);