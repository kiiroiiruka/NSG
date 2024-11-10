export class Mene 
{
  constructor(){}// Homeクラスのシーン名を「home」に設定
  preload() 
  {
      this.on='True';//this.onでメニューのオンオフを管理する
      this.load.image('mene_screen','/front/game/img/mene.png'); // ホーム画面の壁紙画像を読み込む
  }
  create()//位置が変わらない画像は「this.load.image」変わる画像は「this.load.spritesheet」で読み込む必要がある
  {  
      this.mene_screen=this.add.image('mene_screen'); // ホーム画面の壁紙画像を読み込む
}
  on_mene()
  {
    console.log(this.on);//
    this.on=(!this.on);
  }//メニューの表示非表示を切り替える
  update(){this.mene_screen.setVisibility(this.on);}//メニュー画面表示
}