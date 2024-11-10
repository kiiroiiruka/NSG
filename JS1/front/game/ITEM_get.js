const config = 
{
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0x87CEEB,
    scene: 
    {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let ball;
let score = 0;
let scoreText;

function preload() 
{
    // ボールの画像をプリロード
    this.load.image('ball', 'https://example.com/path/to/ball.png'); // ここに実際のボール画像のURLを指定
}

function create() 
{
    // スコアテキストを作成
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

    // ボールを作成
    ball = this.physics.add.image(400, 300, 'ball');
    ball.setInteractive();
    ball.setCollideWorldBounds(true);
    ball.setBounce(1);

    // ボールをクリックしたときのイベント
    ball.on('pointerdown', () => 
    {
        score += 1; // スコアを増加
        scoreText.setText('Score: ' + score); // スコアを更新
        ball.setPosition(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500)); // ボールの位置をランダムに変更
    });

    // ボールを動かす
    this.tweens.add(
    {
        targets: ball,
        y: '+=100', // Y方向に移動
        duration: 2000,
        yoyo: true,
        repeat: -1
    });
}

function update() 
{
    // ここに更新処理を書くことができます
}