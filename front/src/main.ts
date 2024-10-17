import Phaser, { GameObjects } from 'phaser';
let hiritu=0.7;
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
class Char_text 
{
  private text: string[]; // セリフが入る
  private char_face: Phaser.GameObjects.Image[]; // キャラクターの表情
  private lengths: number[];
  private image_serihu!:Phaser.GameObjects.Image; //セリフのみだし

  private text_go: string = ''; // 表示される文章

  private speed: number = 0; // 一文字の表示スピード
  private text_count: number = 0; // 今何文字目を表示しているか
  private dannraku: number = 0; // 段落情報が入る

  private scene: Phaser.Scene; // シーンのインスタンスを保持
  private text_go2!:Phaser.GameObjects.Text;//表示テキスト入れるやつ(テキストの表示非表示変更できるようにするために必要)
  private next:Boolean=false;//次のテキストいくか行かないかの判断
  private start:Boolean=false;
  public serihuend:Boolean=false;

  constructor(scene: Phaser.Scene, text: string[], character: Phaser.GameObjects.Image[],midasi:Phaser.GameObjects.Image) 
  {
    this.scene = scene; // シーンを保持
    this.text = text; // 会話を保存
    this.char_face = character; // 表情を保存
    this.lengths = text.map(t => t.length); // 各セリフの文字数を計算
    this.image_serihu=midasi;//見出しセット
  }
  public displayText()
  {

    if(!this.start)this.char_face[0].setVisible(true);//次のキャラクター画像表示
    if(!this.start)this.start=true;
    
  }
  draw_text() 
  { 
    if(this.start)
    {
    if(this.text[this.dannraku]!='end')
    {
      this.image_serihu.setVisible(true);
        if (this.speed < 10)this.speed += 1; // 一文字を出す時間間隔をカウント
        else 
        {
        
        if(this.text_count!=this.lengths[this.dannraku])
        {
          this.next=false;//次の段落いくやつリセット
          this.speed = 0; // 時間間隔をリセット
          this.text_go += this.text[this.dannraku][this.text_count]; // 表示する文字を追加
          if(this.text_count!=0)this.text_go2.destroy();
          this.text_count += 1; // 次の文字に進む
          this.draw(this.text_go.padEnd(10)); // 画面に文字を表示
        }
      }
      if(this.text_count==this.lengths[this.dannraku]&&this.next)
      {
        this.char_face[this.dannraku].setVisible(false);//一セリフ終えたらキャラクター画像消す
        this.dannraku+=1;//次の会話段落へ移動
        this.char_face[this.dannraku].setVisible(true);//次のキャラクター画像表示
        this.text_go2.destroy();//画面に表示させたテキスト消す
        this.text_go='';//次の段落に行く前にリセット
        this.text_count = 0;//文字数カウントリセット
      }
   }
   else  
   {
    this.char_face[this.dannraku].setVisible(false);
    this.image_serihu.setVisible(false);
    this.serihuend=true;
   }   
  }
  }
  next_go()
  {
    this.next=true;
  }
  draw(text_draw: string) 
  {    
    this.text_go2=this.scene.add.text(0, 370, text_draw, 
    { 
      fontSize: '32px', 
      color: '#fff', 
      fontFamily: 'Arial', // フォント指定
    }).setOrigin(0, 0.8); // テキストを画面中央に表示
  }

}
// メインゲームクラス
class MyGame extends Phaser.Scene 
{
  private char_text!: Char_text; // Char_textクラスのインスタンスを保持する変数

  private map!: Map;  // mapプロパティを宣言
  private isPointerDown: boolean = false; // ポインターが押されているかどうか
  private moveLeft: boolean = false; // 左移動フラグ
  private moveRight: boolean = false; // 右移動フラグ
  private moveUp: boolean = false; // 上移動フラグ
  private moveDown: boolean = false; // 下移動フラグ
  private movemene: boolean = false; //メニュー画面表示非表示
  private moveITEM: boolean = false; //ITEM画面表示非表示
  private moveSAVE: boolean = false; //SAVE画面表示非表示
  private movePLACE: boolean = false; //PLACE画面表示非表示
  private moveBACK: boolean = false; //戻るボタン非表示
  private check_on: boolean = false; //調べるボタンの

  private check_serihu: boolean = true; //会話中メニューボタン表示されない

  private movemene_stop:integer=0;
  private image_mene!:Phaser.GameObjects.Image; // メニュー画面の画像
  private image_item!:Phaser.GameObjects.Image; // アイテム欄の画像
  private image_save!:Phaser.GameObjects.Image; // セーブ画面の表示
  private image_place!:Phaser.GameObjects.Image; // セーブ画面の表示
  private image_mene2!:Phaser.GameObjects.Image; 
  private image_serihu!:Phaser.GameObjects.Image; 


  private button_move_up!:Phaser.GameObjects.Graphics;//UPボタン入ったやつ
  private button_move_down!:Phaser.GameObjects.Graphics;//DOWNボタン入ったやつ
  private button_move_right!:Phaser.GameObjects.Graphics;//RIGHTボタン入ったやつ
  private button_move_left!:Phaser.GameObjects.Graphics;//LEFTボタン入ったやつ
  private button_move_mene!:Phaser.GameObjects.Graphics;//メニューボタン入ったやつ
  private button_move_ITEM!:Phaser.GameObjects.Graphics;//ITEMボタン入ったやつ
  private button_move_SAVE!:Phaser.GameObjects.Graphics;//SAVEボタン入ったやつ
  private button_move_NOW_PLACE!:Phaser.GameObjects.Graphics;//現在地確認ボタン入ったやつ
  private button_move_BACK!:Phaser.GameObjects.Graphics;//ゲームに戻るボタン入ったやつ
  private button_move_check!:Phaser.GameObjects.Graphics;//チェックボタン


  private button_text: { [key: string]: Phaser.GameObjects.Text } = {};//移動ボタンテキスト
  private stop_make_button_text:integer=1;//ボタンテキスト表示ストッパー

  constructor() 
  {
    super({ key: 'main' });
  }

  preload() 
  {
    // 画像をロード
    
    this.load.image('Replacement_tiles', 'src/assets/Replacement_tiles.png'); // タイルの画像のパスを指定
    this.load.image('player', 'src/assets/p5.png'); // p5.pngの画像のパスを指定
    this.load.image('mene', 'src/assets/mene.png');
    this.load.image('item', 'src/assets/Item.png');
    this.load.image('save', 'src/assets/save.png');
    this.load.image('place', 'src/assets/place.jpg');
    this.load.image('mene2', 'src/assets/mene2.jpg');
    this.load.image('char1', 'src/assets/char1.png');
    this.load.image('serihu', 'src/assets/serihu.png');
  }
  create() 
  {


    // Char_textクラスのインスタンスを作成


    // インスタンスのメソッドを呼び出す
   


    // マップを生成
    
    this.map = new Map(this, 'Replacement_tiles', 8, 6, 100);  // マップサイズを設定 (8x6 のマップ)
    // p5.pngを中央に表示
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'player');  
    this.image_mene=this.add.image(0, 0, 'mene'); //menu追加
 
    this.image_item=this.add.image(0, 0, 'item'); //item追加
    this.image_save=this.add.image(0, 0, 'save'); 
    this.image_place=this.add.image(0, 0, 'place'); 
    this.image_mene2=this.add.image(0, 0, 'mene2'); 


    this.button_move_mene=this.createButton(700, 400, 'メニュー',150,50, () => 
      {
        if(this.check_serihu)this.movemene = true;//会話中は反応しないようにする 
      }, () => {this.movemene = false; });//メニューボタン作成
    //character会話↓

    //一セリフごとのキャラクターの表示させるイラスト
    const charImages = 
    [
      this.add.image(150, 200, 'char1').setVisible(false),
      this.add.image(150, 200, 'char1').setVisible(false),
      this.add.image(150, 200, 'char1').setVisible(false)
    ];
    //セリフの見出し
    this.image_serihu=this.add.image(0, 1000, 'serihu').setVisible(false);//セリフの見出し
    //一会話文のセリフの文章 
    const text = ['このゲームでテストプレイ','うまく動けばベスト','end'];
    //インスタンス作成
    this.char_text = new Char_text(this, text, charImages,this.image_serihu); // newでインスタンス化
    //character会話↑

    // マウスやタッチ入力の設定
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => 
    {
      this.isPointerDown = true; // ポインターが押されたことを記録
    });

    this.input.on('pointerup', () => 
    {
      this.isPointerDown = false; // ポインターが離されたことを記録
    });

    // ボタンを作成
    this.button_move_left=this.createButton(700, 225, '←',50,50, () => { this.moveLeft = true; }, () => { this.moveLeft = false; });
    this.button_move_right=this.createButton(800, 225, '→',50,50, () => { this.moveRight = true; }, () => { this.moveRight = false; });
    this.button_move_up=this.createButton(750, 175, '↑',50,50, () => { this.moveUp = true; }, () => { this.moveUp = false; });
    this.button_move_down=this.createButton(750, 275, '↓',50,50, () => { this.moveDown = true; }, () => { this.moveDown = false; });
    this.button_move_check=this.createButton(750, 225, '',50,50, () => {this.check_on = true; }, () => {this.check_on = false; });
    this.button_move_ITEM=this.createButton(700, 100, 'ITEM',150,50, () => {this.moveITEM = true; }, () => {this.moveITEM = false; });
    this.button_move_ITEM.setVisible(false);
    this.button_text["ITEM"].destroy();
    this.button_move_SAVE=this.createButton(700, 200, 'SAVE',150,50, () => {this.moveSAVE = true; }, () => {this.moveSAVE = false; });
    this.button_move_SAVE.setVisible(false);
    this.button_text["SAVE"].destroy();
    this.button_move_NOW_PLACE=this.createButton(700, 300, 'PLACE',150,50, () => {this.movePLACE = true; }, () => {this.movePLACE = false; });
    this.button_move_NOW_PLACE.setVisible(false);
    this.button_text["PLACE"].destroy();
    this.button_move_BACK=this.createButton(10, 400, 'ゲームに戻る',150,50, () => {this.moveBACK = true; }, () => {this.moveBACK = false; });
    this.button_move_BACK.setVisible(false);
    this.button_text["ゲームに戻る"].destroy();
  }


  //itemButton.setVisible(!itemButton.visible);


  // ボタンを作成するヘルパーメソッド
// ボタンを作成するヘルパーメソッド
  createButton(x: number, y: number, label: string,sizex:integer,sizey:integer, onPress: () => void, onRelease: () => void) 
  {

    const buttonSizex = sizex; // ボタンのサイズを設定
    const buttonSizey = sizey; // ボタンのサイズを設定
    const buttonGraphics = this.add.graphics(); // Graphicsオブジェクトを作成

    // ボタンの背景を描画
    buttonGraphics.fillStyle(0x555555, 1); // 背景色
    buttonGraphics.fillRect(x, y, buttonSizex, buttonSizey); // 背景を描画

    // ボタンの枠を描画
    buttonGraphics.lineStyle(2, 0xffffff, 1); // 枠のスタイルを設定
    buttonGraphics.strokeRect(x, y, buttonSizex, buttonSizey); // 枠を描画

    // テキストを作成
    this.button_text[label] = this.add.text(x + buttonSizex / 2, y + buttonSizey / 2, label, 
    { 
        fontSize: '32px', 
        color: '#fff', 
        fontFamily: 'Arial', // フォント指定
    })
    .setOrigin(0.5); // テキストの位置を中央に設定
    // ボタンをインタラクティブに設定
    buttonGraphics.setInteractive(new Phaser.Geom.Rectangle(x, y, buttonSizex, buttonSizey), Phaser.Geom.Rectangle.Contains);
    
    // ボタンが押されたときの処理
    buttonGraphics.on('pointerdown', () => 
    {
        buttonGraphics.clear(); // ボタンの描画をクリア
        buttonGraphics.fillStyle(0xaa0000, 1); // 押されたときの背景色
        buttonGraphics.fillRect(x, y, buttonSizex, buttonSizey); // 押された背景を描画
        buttonGraphics.lineStyle(2, 0xffffff, 1); // 枠のスタイルを設定
        buttonGraphics.strokeRect(x, y, buttonSizex, buttonSizey); // 枠を描画
        onPress(); // onPressコールバックを呼び出す
    });

    // ボタンが離されたときの処理
    buttonGraphics.on('pointerup', () => 
    {
        buttonGraphics.clear(); // ボタンの描画をクリア
        buttonGraphics.fillStyle(0x555555, 1); // 元の背景色
        buttonGraphics.fillRect(x, y, buttonSizex, buttonSizey); // 元の背景を描画
        buttonGraphics.lineStyle(2, 0xffffff, 1); // 枠のスタイルを設定
        buttonGraphics.strokeRect(x, y, buttonSizex, buttonSizey); // 枠を描画
        onRelease(); // onReleaseコールバックを呼び出す
    });

    // ボタンから外れたときの処理
    buttonGraphics.on('pointerout', () => 
    {
        buttonGraphics.clear(); // ボタンの描画をクリア
        buttonGraphics.fillStyle(0x555555, 1); // 元の背景色
        buttonGraphics.fillRect(x, y, buttonSizex, buttonSizey); // 元の背景を描画
        buttonGraphics.lineStyle(2, 0xffffff, 1); // 枠のスタイルを設定
        buttonGraphics.strokeRect(x, y, buttonSizex, buttonSizey); // 枠を描画
        onRelease(); // onReleaseコールバックを呼び出す
    });
    return buttonGraphics;
  }

  more_draw_button(x: number, y: number, label: string,sizex:integer,sizey:integer,fontsize:string)
  { 
    const buttonSizex = sizex; // ボタンのサイズを設定
    const buttonSizey = sizey; // ボタンのサイズを設定
    this.button_text[label] = this.add.text(x + buttonSizex / 2, y + buttonSizey / 2, label, 
    { 
          fontSize: fontsize, 
          color: '#fff', 
          fontFamily: 'Arial', // フォント指定
    })
      .setOrigin(0.5); // テキストの位置を中央に設定
  }
  mene_modoru()
  {
    this.more_draw_button(700, 225, '←',50,50,'32px');
    this.more_draw_button(800, 225, '→',50,50,'32px');
    this.more_draw_button(750, 175, '↑',50,50,'32px');
    this.more_draw_button(750, 275, '↓',50,50,'32px');
    this.image_mene.setVisible(false);//メニュー画面表示
  }

  ITEM()//アイテム欄表示画面
  {
    if(this.movemene_stop==1)
    {
      this.image_mene2.setVisible(false);//メニュー画面非表示
      this.image_item.setVisible(true);//ITEM画面表示
      this.image_save.setVisible(false);//SAVE画面非表示
      this.image_place.setVisible(false);//PLACE画面非表示
      
    }
  }
  SAVE()//セーブ画面
  {
    if(this.movemene_stop==4)
    {
      this.image_mene2.setVisible(false);//メニュー画面非表示
      this.image_save.setVisible(true);//SAVE画面表示
      this.image_item.setVisible(false);//ITEM画面非表示
      this.image_place.setVisible(false);//PLACE画面非表示
    }
  }
  NOW_PLACE()//現在地表示画面
  {
    if(this.movemene_stop==5)
    {
      this.image_mene2.setVisible(false);//メニュー画面非表示
      this.image_place.setVisible(true);//PLACE画面表示
      this.image_save.setVisible(false);//SAVE画面非表示
      this.image_item.setVisible(false);//ITEM画面非表示
    }
  }
  MENE()
  {
    if(this.movemene_stop==2)
    {
      this.image_mene2.setVisible(true);
      this.image_place.setVisible(false);
      this.image_save.setVisible(false);
      this.image_item.setVisible(false);
    }
    this.image_mene.setVisible(true);//メニュー画面表示
    if(this.movemene_stop==0)this.image_mene.setVisible(false);//メニュー画面表示
  }

  mene_change()//menu表示非表示
  {   
    if(this.movemene_stop==3)
    {
      this.movemene_stop=0;
      this.button_move_right.setVisible(true);
      this.button_move_left.setVisible(true);
      this.button_move_up.setVisible(true);
      this.button_move_down.setVisible(true);
      this.button_move_check.setVisible(true);
      this.button_move_ITEM.setVisible(false);//ITEMボタン非表示
      this.button_move_SAVE.setVisible(false);//SAVEボタン非表示
      this.button_move_BACK.setVisible(false);//PLACEボタン表示
      this.button_move_NOW_PLACE.setVisible(false);//PLACEボタン非表示
      this.button_text["ITEM"].destroy();
      this.button_text["SAVE"].destroy();
      this.button_text["PLACE"].destroy();
      this.button_text["もどる"].destroy();
      if(this.stop_make_button_text==0)
      {
        this.stop_make_button_text=1;
        this.mene_modoru();//上下右左再表示
      }
    }
    if(this.movemene_stop==1)
    { 
     

      }  
      if(this.movemene)
      {
        this.button_move_right.setVisible(false);
        this.button_move_left.setVisible(false);
        this.button_move_up.setVisible(false);
        this.button_move_down.setVisible(false);
        this.button_move_check.setVisible(false);
        this.button_move_ITEM.setVisible(true);//ITEMボタン表示
        this.button_move_SAVE.setVisible(true);//SAVEボタン表示
        this.button_move_NOW_PLACE.setVisible(true);//PLACEボタン表示
        this.button_move_BACK.setVisible(true);//PLACEボタン表示
        if(this.stop_make_button_text==1)
        {
          this.stop_make_button_text=0;
          this.more_draw_button(700, 100, 'ITEM',150,50,'32px');//ITEMボタンのテキスト表示
          this.more_draw_button(700, 200, 'SAVE',150,50,'32px');
          this.more_draw_button(700, 300, 'PLACE',150,50,'32px');
          this.more_draw_button(10, 400, 'もどる',150,50,'32px');
        }
        
        this.button_text["↑"].destroy();
        this.button_text["↓"].destroy();
        this.button_text["←"].destroy();
        this.button_text["→"].destroy();
      }
      if(this.movemene)
      {
        this.movemene_stop=2;//メニュー開き終わる
      }
      if(this.moveITEM)
      {
          this.movemene_stop=1;//メニュー開き終わる
      }
      if(this.moveBACK)
      {
        this.movemene_stop=3;//メニュー閉じ終わる
      }
      if(this.moveSAVE)
      {
        this.movemene_stop=4;//メニュー開き終わる
      }
      if(this.movePLACE)
      {
        this.movemene_stop=5;//メニュー開き終わる
      }
      this.MENE();//メニュー画面表示
      this.ITEM();//アイテム欄表示
      this.SAVE();//セーブ画面表示
      this.NOW_PLACE();//現在地表示
      if(this.movemene_stop==0)
      {  
        this.image_save.setVisible(false);//SAVE画面表示
        this.image_item.setVisible(false);//ITEM画面非表示
        this.image_place.setVisible(false);//PLACE画面非表示
        this.image_mene2.setVisible(false);//PLACE画面非表示
      }   
      

  }

  update() 
  {
    let offsetX = 0;
    let offsetY = 0;
    // ボタンの入力に応じて移動
    if (this.moveLeft) offsetX = 2;  // 左ボタン
    if (this.moveRight) offsetX = -2;  // 右ボタン
    if (this.moveUp) offsetY = 2;  // 上ボタン
    if (this.moveDown) offsetY = -2;  // 下ボタン
    // マップを移動させる
  
    if (this.map) this.map.moveTiles(offsetX, offsetY);
    this.mene_change();//メニュー画面表示


//セリフ表示プログラム↓
    this.char_text.draw_text();//画面にテキスト表示
    if(this.check_on)
    {   
        this.check_serihu=false;//メニューボタン押せないようにする
        this.char_text.displayText();//テキスト表示開始
        this.char_text.next_go();//画面にテキスト表示
        if(this.char_text.serihuend)this.check_serihu=true;
    }
//セリフ表示プログラム↑   
  }



}


// ゲーム設定と初期化
const config: Phaser.Types.Core.GameConfig = 
{
  type: Phaser.AUTO,
  width: 1280 * hiritu, // 横幅
  height: 720 * hiritu, // 縦幅
  scale: 
  {
    mode: Phaser.Scale.FIT, // フィットモード
    autoCenter: Phaser.Scale.CENTER_BOTH, // 自動で中央に配置
  },
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
