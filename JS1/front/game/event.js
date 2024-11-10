class Event extends Phaser.Scene//このクラスは会話の長さと、ストーリーの進み具合をtalkクラスに送るクラス
{
    constructor() {super('event');}
    init(data) {this.event_story = data.event_story;}//現在のストーリーの進み具合取得
    preload(){}
    create()
    {
        start.Scene('talk',{'count':10,'story':this.event_story});//対話と会話合わせていくつなのかと現在の進み具合を送信
    }
}