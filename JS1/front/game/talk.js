export class Talk extends Phaser.Scene 
{
    constructor() {super('talk');}//このクラスをtalkというsceneに設定
    init(data) 
    {
        this.count = data.count;
        this.story = data.story;
        this.id = data.id;
    }
    preload()//会話で表示される画像などを表示
    {
        this.load.image('text_box', '/front/game/img/text_box.png');//テキストの見出しの画像
        this.load.image('next_text_button', '/front/game/img/next_text1.png');//次のセリフに進む押しボタンの画像
    }
    create() 
    {
        this.story_go=0;//会話によるストーリーの進行具合管理
        this.start_button = this.add.image(100, 75, 'next_text_button').setInteractive({ useHandCursor: true });//.setInteractiveで画像をボタンと同様に活用できるようにする
        this.text_box = this.add.image(350, 400, 'text_box');//会話の吹き出し部分
        this.start_button.on('pointerdown', () => {this.on = true;});// ボタンがクリックされたときの動作
        this.on = true;//初期状態は会話ストッパーを外しておく
        this.Text = this.add.text(0, 316, '', //表示されるセリフが入るthis.TextというString変数のようなもの作成
        {
            fontFamily: 'Arial',//テキストのフォント
            fontSize: '30px',//テキストのサイズ
            color: '#f0f0f0',//テキストの色
            wordWrap: { width: 700, useAdvancedWrap: true },  // 折り返し設定
            padding: { x: 5, y: 5 },
            //backgroundColor: 'rgba(0, 51, 51, 0.8)',//R　G　B　の数値で色決めて、4つめ(一番右)の数値で透明度決められる
            stroke: '#f0fff',
            strokeThickness: 2
        });
        this.Text.setVisible(true);//起動した瞬間セリフ表示
        this.scene.bringToTop();//他のシーンとの表示位置が重なった時、このシーンの表示結果を先頭に表示させる
    }
    typeText(text, speed = 0)//受け取ったテキストを一文字づつ表示させる関数
    {
        this.Text.setText('');  // テキストをリセット
        let currentIndex = 0;
        let now=this.count;//文章を表示している最中に次の文進んだ際に表示する為に動いている再起関数を止めるか止めないか判断するために値取得
        const addCharacter = () => 
        {
            if(text[currentIndex]=='\n')speed=35;//改行文字が来たら名前を表示し終わった事になるのでスピードを通常の文章を表示させるスピードに変更
            //※if(this.count>=now-1)で文章表示中に次の文章を表示し始めた時に前表示中だったテキストの文字の追加を行えなくするようにしている。
            if(this.count>=now-1)this.Text.text += text[currentIndex];//ジャバスクリプトでもPython同様に「文章は言った変数[インデックス]」で文字を抜き取ることが可能
            currentIndex++;//インデックスプラス1進める
            if(currentIndex < text.length)this.time.delayedCall(speed, addCharacter, [], this);//テキストの長さは.lengthで取得可能、その長さに達するまで再起的に表示を繰り返す
        };
        addCharacter();
    }
    talk(talk_count)
    {
        if(this.story==0&&this.id==0)//進み具合0でIDが0の時の会話(※ストーリーの進み具合とIDで実行する会話イベントを判定)
        {
            this.story_go=1;//ストーリ進展のイベントの会話の時は進行具合を1にしておく
            if (talk_count === 10)this.typeText("[ナレーション]\nどうして誰も気づかなかったのだろうか、ある日、世界を動かすほどの大きなシステムの開発に成功したチームのリーダーが消えた");
            if (talk_count === 9) this.typeText("[ナレーション]\nそのチームは、いまだかつてない功績を残した、それはコンピュータウィルスに対抗できる偉大なセキュリティ対策ソフトウェアを作成したのだ");
            if (talk_count === 8) this.typeText("[ナレーション]\n様々な機密データがデジタル化される時代の中、このソフトウェアは社会からかなりの評価を得て、一躍有名となった");
            if (talk_count === 7) this.typeText("[ナレーション]\nそのきっかけもあり、ソフトウェアを開発したチームはメディアを通じて一躍世間に広く知れ渡った");
            if (talk_count === 6) this.typeText("[ナレーション]\nそしてメディアでちょうど注目を浴びていた時のことだった、ソフトウェアの開発の中心を担っていた、チームリーの唐鎌が消えた、");
            if (talk_count === 5) this.typeText("[ナレーション]\nちょうどチームが注目を浴びていたこともあり、唐鎌の失踪はSNSの中で広く知れ渡ることになる");
            if (talk_count === 4) this.typeText("[ナレーション]\nその時、ある一人の投稿者がこんなことをささやいていた、「唐鎌のメモがA県B市C区のD山の林の中に落ちていたと」");
            if (talk_count === 3) this.typeText("[ナレーション]\nしかし、そこは明らかに信じがたい場所だった、人気もない田舎道、車での通行はできず、約4時間歩かなければいけない場所だった");
            if (talk_count === 2) this.typeText("[ナレーション]\nまた、投稿されたメモの写真があまりにもボロボロで読めなかったこともあり、誰もがその情報を偽物だと判断し、投稿者は軽く炎上を浴びることとなる");
            if (talk_count === 1) this.typeText("[ナレーション]\nしかし、その投稿を信じたものがいた、それはチームで共同開発をしていたメンバーの一人の村田だった、村田はその投稿を目にした後目的地に向かった");
        }
        if(talk_count === 0)this.Text.setVisible(false);//ID関係なく会話終了したら文章テキストの表示を非表示にする
    }
    update() 
    {
        if (this.count >= 0 && this.on === true)//会話が続いている間はこのif文が起動する
        {
            this.talk(this.count);  // this.talk としてメソッドを呼び出す
            this.count -= 1;  // 次の文章に進む   
            this.on = false;  // ストッパーをリセット
        }
        if (!this.Text.visible)//会話が終わるとこのif文が起動する
        {
            this.scene.start('story', { new_story: this.story + this.story_go});//全て表示したらstoryクラスに戻る
            this.story_go=0;//ストーリーの進行具合を0に戻す
        }
    }
}