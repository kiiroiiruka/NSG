import Phaser from 'phaser';

// マップクラスを定義
class Map 
{
  private tiles: Phaser.GameObjects.Image[][];  // tilesプロパティを宣言

  constructor(scene: Phaser.Scene, tileTexture: string, mapWidth: number, mapHeight: number, tileSize: number) 
  {
    this.tiles = [];  // tiles配列を初期化
    for (let x = 0; x < mapWidth; x++)
    {
        this.tiles[x] = [];
        for (let y = 0; y < mapHeight; y++) 
        {
          const tileX = x * tileSize + tileSize / 2;
          const tileY = y * tileSize + tileSize / 2;
          this.tiles[x][y] = scene.add.image(tileX, tileY, tileTexture);
        }
    }
  }

  // 全タイルの位置を動かす
  moveTiles(offsetX: number, offsetY: number) 
  {
    for (let x = 0; x < this.tiles.length; x++) 
    {
      for (let y = 0; y < this.tiles[x].length; y++) 
      {
        const tile = this.tiles[x][y];
        if (tile) 
        {
          tile.x += offsetX;
          tile.y += offsetY;
        }
      }
    }
  }
}

// メインゲームクラス
class MyGame extends Phaser.Scene 
{
  private map!: Map;  // mapプロパティを宣言
  private cursors!: 
  {
    up: Phaser.Input.Keyboard.Key; 
    down: Phaser.Input.Keyboard.Key; 
    left: Phaser.Input.Keyboard.Key; 
    right: Phaser.Input.Keyboard.Key; 
  }; // カスタムキー入力管理
  private isPointerDown: boolean = false; // ポインターが押されているかどうか
  private pointerStartX: number = 0; // ポインターの開始X位置
  private pointerStartY: number = 0; // ポインターの開始Y位置
  private p5Image!: Phaser.GameObjects.Image; // p5.png画像のプロパティを追加
  constructor() 
  {
    super({ key: 'main' });
  }
  preload() 
  {
    // 画像をロード
    this.load.image('Replacement_tiles', 'src/assets/Replacement_tiles.png'); // タイルの画像のパスを指定
    this.load.image('p5', 'src/assets/p5.png'); // p5.pngの画像のパスを指定
  }
  create() 
  {
    // マップを生成
    this.map = new Map(this, 'Replacement_tiles', 8, 6, 100);  // マップサイズを設定 (8x6 のマップ)

    // p5.pngを中央に表示
    this.p5Image = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'p5');  
    // キー入力を管理するプロパティを初期化
    const keyboard = this.input.keyboard; // ここで `this.input.keyboard` を取得
    if (keyboard) 
    { // keyboardがnullでないか確認
      this.cursors = 
      {
        up: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        down: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        left: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        right: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      };
    } 
    else console.error('Keyboard input is not available.');

    // マウスやタッチ入力の設定
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => 
    {
      this.isPointerDown = true; // ポインターが押されたことを記録
      this.pointerStartX = pointer.x;
      this.pointerStartY = pointer.y;
    });
    this.input.on('pointerup', () => 
    {
      this.isPointerDown = false; // ポインターが離されたことを記録
    });
  }

  update() 
  {
    let offsetX = 0;
    let offsetY = 0;

    // WASDキーの入力に応じて移動
    if (this.cursors.up?.isDown)offsetY = 2;
    else if 
    (this.cursors.down?.isDown)offsetY = -2;
    // ポインターが押されている場合の処理
    if (this.isPointerDown) 
    {
      const centerX = this.cameras.main.centerX;
      const centerY = this.cameras.main.centerY;
      // 中心からの距離を計算
      const distanceX = this.pointerStartX - centerX;
      const distanceY = this.pointerStartY - centerY;

      // 縦移動と横移動を個別に処理
      if (Math.abs(distanceX) > Math.abs(distanceY))offsetX = distanceX * -0.01; // 横移動
      else offsetY = distanceY * -0.01; // 縦移動
    } 
    else 
    {
      // 縦移動が無い場合に横移動を処理
      if (offsetY === 0) 
      {
        if (this.cursors.left?.isDown)offsetX = 2;
        else if (this.cursors.right?.isDown)offsetX = -2;
      }
    }
    if (this.map) this.map.moveTiles(offsetX, offsetY); // マップを移動させる

    if (this.p5Image)
    {
      const p5PosX = this.p5Image.x; // p5ImageのX座標
      const p5PosY = this.p5Image.y; // p5ImageのY座標
      // ここでコンソールに出力する
    }
  }
}

// ゲーム設定と初期化
const config: Phaser.Types.Core.GameConfig = 
{
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: MyGame,
  physics: 
  {
    default: 'arcade',
    arcade: 
    {
      gravity: { x: 0, y: 0 }, // 重力をゼロに
      debug: false,
    },
  },
};

// ゲーム開始
new Phaser.Game(config);
