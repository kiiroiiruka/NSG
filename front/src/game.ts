import Phaser, { GameObjects } from 'phaser';
// マップクラスを定義
import {Map} from './map.ts';//map.tsファイルからMapクラスを持ってくる
import {Pause} from './pause.ts';//map.tsファイルからMapクラスを持ってくる
import {Story} from './story.ts';//map.tsファイルからMapクラスを持ってくる
import {Player} from './player.ts';//map.tsファイルからMapクラスを持ってくる
import {Character} from './character.ts';//map.tsファイルからMapクラスを持ってくる
import {Monster} from './monster.ts';//map.tsファイルからMapクラスを持ってくる
// メインゲームクラス+
export class Game extends Phaser.Scene 
{
  private age:number;
  constructor();
  constructor(age: number);

  // 実装
  constructor(age?: number) {
    super({ key: 'Game' , active: false});
    this.age = age !== undefined ? age : 0;
  }
  preload() 
  {
    // 画像をロード

  }
  create() 
  {
    // マップを生成

  }
  update()//
  {
  
  }
}
// ゲーム設定と初期化

// ゲーム開始
