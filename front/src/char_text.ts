import Phaser, { GameObjects } from 'phaser';
export class Char_text 
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
        if (this.speed < 1)this.speed += 1; // 一文字を出す時間間隔をカウント
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
    this.text_go2=this.scene.add.text(0, 330, text_draw, 
    { 
      fontSize: '32px', 
      color: '#fff', 
      fontFamily: 'Arial', // フォント指定
    }).setOrigin(0, 0); // テキストを画面中央に表示
  }
}