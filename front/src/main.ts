import Phaser, { GameObjects } from 'phaser';
// マップクラスを定義
import { Game } from './game.ts';//map.tsファイルからMapクラスを持ってくる
import { Tell,Record} from './othergame.ts';//map.tsファイルからMapクラスを持ってくる

// メインゲームクラス
class Home extends Phaser.Scene 
{
  constructor() 
  {
    super({ key: 'Home' , active: true});
  }
  preload() 
  {
   
  }
  create() 
  {
    // マップを生成
    
  }


  update()//
  {

  }
}
let hiritu=0.7;
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
  scene: [Home,Tell,Record,Game],
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
