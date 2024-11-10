class Game extends Phaser.Scene
{
    constructor() 
    {
      super('game');//Gameクラスのプログラムは「gome」というシーン 
      this.story
    }
    preload()//位置が変わらない画像が this.load.image　で変わる画像が　this.load.spritesheet　で読み込む必要がある
    {
      this.load.image('home_screen', '/front/game/img/home_screen.png');//ホーム画面の壁紙画像を読み込む
      this.load.image(
      [
        { key: 'home_button1', url: '/front/game/img/home_button1.png' },
        { key: 'home_button2', url: '/front/game/img/home_button2.png' },
      ]);//ホーム画面のボタンの画像を読み込む
    
    }
    create() 
    {
      this.add.image(0, 0, 'home_screen');//.setOrigin(0, 0);をつければの位置を左上に設定できる　※(1,1)だと右下が原点　(0.5,0.5)だと真ん中が原点になる
   
      this.add.image(500, 250, 'home_button2');
      const start_button = this.add.image(200, 250, 'home_button1').setInteractive({ useHandCursor: true });//home_button2に画像にクリック/タップイベントを追加
      start_button.on('pointerdown', () => 
      {
        
      });
    }
    update()
    {
      // フレームごとの更新処理
    }
}