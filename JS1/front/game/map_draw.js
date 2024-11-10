import { Character } from './character.js';//extends Phaser.Sceneがついてないクラス使う時はここにimportでファイルの読み込み処理呼び出し書く
import { Map } from './map.js';//extends Phaser.Sceneがついてないクラス使う時はここにimportでファイルの読み込み処理呼び出し書く
import { Map_data } from './map_data.js';//extends Phaser.Sceneがついてないクラス使う時はここにimportでファイルの読み込み処理呼び出し書く
import { Mene } from './menu.js';//extends Phaser.Sceneがついてないクラス使う時はここにimportでファイルの読み込み処理呼び出し書く
export class Map_draw extends Phaser.Scene 
{
    constructor() {super('map_draw');}//このクラスをmap_drawというsceneに設定
    preload() 
    {
        this.now_place = 2;//現在地の番号
        this.map_go = []; // 生成したMapインスタンスが全て入る配列
        this.character = []; // 各マップでの操作キャラクターのインスタンスが全て入る配列
        this.character_img=[];
        this.map_data = new Map_data(); // 全体マップのデータ入ったインスタンス(※map_dataクラスからとってきたマップデータでmapインスタンスを作成)
        this.load.image('wall', '/front/game/img/wall.png');// 壁画像のロード
        this.load.image('floor', '/front/game/img/floor.png');// 床画像ロード
        this.load.image('player', '/front/game/img/player1_atari.png');// 操作playerの当たり判定感知用画像ロード
        this.load.image('up_1', '/front/game/img/up_1.png');// 操作playerの画像ロード
        this.load.image('up_2', '/front/game/img/up_2.png');// 操作playerの画像ロード
        this.load.image('up_3', '/front/game/img/up_3.png');// 操作playerの画像ロード
        this.load.image('left_1', '/front/game/img/left_1.png');// 操作playerの画像ロード
        this.load.image('left_2', '/front/game/img/left_2.png');// 操作playerの画像ロード
        this.load.image('left_3', '/front/game/img/left_3.png');// 操作playerの画像ロード
        this.load.image('right_1', '/front/game/img/right_1.png');// 操作playerの画像ロード
        this.load.image('right_2', '/front/game/img/right_2.png');// 操作playerの画像ロード
        this.load.image('right_3', '/front/game/img/right_3.png');// 操作playerの画像ロード
        this.load.image('down_1', '/front/game/img/down_1.png');// 操作playerの画像ロード
        this.load.image('down_2', '/front/game/img/down_2.png');// 操作playerの画像ロード
        this.load.image('down_3', '/front/game/img/down_3.png');// 操作playerの画像ロード
        this.load.image('button1', '/front/game/img/walk_button1.png');// 移動ボタン画像ロード
        this.load.image('button2', '/front/game/img/walk_button2.png');// 移動ボタン画像ロード
        this.load.image('button3', '/front/game/img/walk_button3.png');// 移動ボタン画像ロード
        this.load.image('button4', '/front/game/img/walk_button4.png');// 移動ボタン画像ロード
        this.load.image('button_on1', '/front/game/img/walking_button1.png');// 移動ボタン画像ロード
        this.load.image('button_on2', '/front/game/img/walking_button2.png');// 移動ボタン画像ロード
        this.load.image('button_on3', '/front/game/img/walking_button3.png');// 移動ボタン画像ロード
        this.load.image('button_on4', '/front/game/img/walking_button4.png');// 移動ボタン画像ロード
        this.load.image('mene_button', '/front/game/img/mene_button.png');//メニュー画面移動ボタン
    }
    create() 
    {  
        // this.map_data.get()でmap_dataクラス内で生成したMapの個数取得
        for (let i = 0; i < this.map_data.get(); i++)//this.map_data.get()で取得した個数分Mapインスタンス、characterインスタンス作成
        {
            //ーーーーーーーーーーーーーーーーーー↓マップ生成区間↓ーーーーーーーーーーーーーーーーーーーーー
            // インスタンス=(どのscene上で利用するか、map_dataクラスから取得したそのマップの構造)
            this.map_go[i] = new Map(this, this.map_data.heya[i]); // 各部屋のマップのインスタンス作成
            this.map_go[i].create(); // マップ生成開始
            //ーーーーーーーーーーーーーーーーーー↑マップ生成区間↑ーーーーーーーーーーーーーーーーーーーーー
            //ーーーーーーーーーーーーーーーーー↓キャラクター生成区間↓ーーーーーーーーーーーーーーーーーーー
            this.character_img[i] = 
            [
                ['up_1','up_2','up_1','up_3'],
                ['left_1','left_2','left_1','left_3'],
                ['right_1','right_2','right_1','right_3'],
                ['down_1','down_2','down_1','down_3']
            ];//操作キャラクターのanimationの画像設定
            //　インスタンス=(どのscene上で利用するか、画像のx座標、画像のy座標、当たり判定画像、characterの画像集、ぶつかったら止まる壁のグループ)
            this.character[i] = new Character(this, 330, 250, 'player', this.character_img[i], this.map_go[i].getWallsGroup());//各部屋で操作するcharacterのインスタンス作成
            const buttons = 
            {
                up: this.add.image(570, 208, 'button1').setInteractive(),//.setInteractive()付けた画像はbuttonとして活用可能
                left: this.add.image(498, 280, 'button2').setInteractive(),//.setInteractive()付けた画像はbuttonとして活用可能
                right: this.add.image(642, 280, 'button3').setInteractive(),//.setInteractive()付けた画像はbuttonとして活用可能
                down: this.add.image(570, 352, 'button4').setInteractive()//.setInteractive()付けた画像はbuttonとして活用可能
            };//Pythonで作れる buttons{'up':Actor('button1'),'left':Actor('button2'),'right':Actor('button3'),'down':Actor('button4')}と似たようなもの
            this.character[i].setButtons(buttons);//buttonsに入っているボタンが押されたらキャラクターが動くように設定
            //ーーーーーーーーーーーーーーーーー↑キャラクター生成区間↑ーーーーーーーーーーーーーーーーーーー
            if (i == 0)this.cameras.main.startFollow(this.character[i].player, true, 0.1, 0.1);
            // カメラをthis.character[i]インスタンスのplayerの画像に追従させるように設定。
        }
        this.mene_button=this.add.image(600, 450,'mene_button').setScrollFactor(0);//ゲーム画面からメニューに移動するボタン表示
        this.mene_button.setInteractive()
        this.mene1=new Mene();//meneインスタンス作成
        this.mene_button.on('pointerdown', () =>{this.mene1.on_mene();});//this.mene_buttonという画像クリックされた時に「this.mene1.on_mene();」を起動
    }
    update() 
    {
        for (let i = 0; i < this.map_data.get(); i++)//現在地と一致したMapインスタンスとcharacterインスタンスを探す
        {
            if (this.now_place == i)//現在地と一致したインスタンスがあれば起動
            {
                this.character[i].setVisibility(true);//インスタンス内のキャラクタークラスを操作できるように変更   
                this.map_go[i].setVisibility(true);//そのインスタンスと同タイミングで作成されたマップインスタンスも表示させる
                this.character[i].update();//そのインスタンスで操作(動くのはthis.character[i].setVisibility(true)に反応したインスタンスのみ)
                if (this.cameras.main._follow !== this.character[i].player)this.cameras.main.startFollow(this.character[i].player, true, 0.1, 0.1);
                //(※this.cameras.main._followは追従させたthis.character[i]インスタンスのplayerの画像を示す、マップ移動して別のになってたら変更)
            } 
            else //一致しないインスタンスは起動させない
            {
                this.character[i].setVisibility(false);//インスタンス内のキャラクタークラスを操作できないように変更(characterも非表示になる)
                this.map_go[i].setVisibility(false);//そのインスタンスと同タイミングで作成されたマップインスタンスも表示させる
            }
        }
    }
}
