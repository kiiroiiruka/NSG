export class Home extends Phaser.Scene 
{
  constructor(){super('home');}// Homeクラスのシーン名を「home」に設定
  preload() 
  {
      this.load.image('home_screen', '/front/game/img/home_screen.png'); // ホーム画面の壁紙画像を読み込む
      this.load.image('home_button1', '/front/game/img/home_button1.png'); // ホームボタン1の画像
      this.load.image('home_button2', '/front/game/img/home_button2.png'); // ホームボタン2の画像
  }
  create()//位置が変わらない画像は「this.load.image」変わる画像は「this.load.spritesheet」で読み込む必要がある
  {  
      //.setOrigin(0, 0);をつければの位置を左上に設定できる　※(1,1)だと右下が原点　(0.5,0.5)だと真ん中が原点になる
      this.add.image(0, 0, 'home_screen').setOrigin(0, 0); // 位置を左上に設定して背景画像追加     
      this.add.image(500, 250, 'home_button2'); // ボタン2の画像の追加（位置を調整）
      const start_button = this.add.image(200, 250, 'home_button1').setInteractive({ useHandCursor: true });//.setInteractive({ useHandCursor: true });でクリック可能状態を示す
      start_button.on('pointerdown', () => 
      {this.scene.start('story', { new_story: 0 });});//スタートボタン押されたらストーリー進み具合0の状態でstoryクラス起動
  }
}