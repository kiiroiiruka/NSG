export class Character//Map内にドット絵で登場するプレイヤーに関するプログラムが書かれたクラス
{
    //x,yでプレイヤーの位置、playerTextureで当たり判定画像、mainPlayerTextureでプレイヤーのアニメーション画像、wallsGroupで当たり判定画像と衝突判定する壁のグループ
    constructor(scene, x, y, playerTexture, mainPlayerTexture, wallsGroup)
    {
        this.scene = scene;//seaneを受け取ると、受け取ったscene内のメソッドやプロパティを活用できるようになる
        this.player = scene.add.image(x, y, playerTexture);//マップ動くキャラクターの当たり判定を確かめる画像取得
        this.mainPlayerTexture=mainPlayerTexture;//キャラクターのアニメーション画像を読み込む
        this.main_player = scene.add.image(x, y - 30,this.mainPlayerTexture[0][0]);//マップ動くキャラクターの画像取得
        this.work_time =this.work = 0;//歩く時間計測(this.work_time)歩くアニメーションの管理変数(this.work)
        this.work_speed=10;//足を動かす速さ(値が小さいほど早い)
        this.player.setOrigin(0.5, 0.5);//画面中央に
        this.moveSpeed = 200; // 移動速度設定
        this.buttonPush = { up: false, left: false, right: false, down: false };//playerの移動のイベントを管理する辞書型変数みたいなやつ
        this.cursors = scene.input.keyboard.createCursorKeys();//画像操作で操作できるキャラクターなのでキーボード入力でも動かせるように設定
        this.key_push=false;//キー操作をインスタンス生成時はoffにしておく
        this.wallsGroup = wallsGroup; // wallsGroupでぶつかる壁のオブジェクト取得
        this.lastDirection = 'down'; // 最後に向いていた方向を記録
    }
    setButtons(buttons)//map_drawクラス内でどの画像が押されたらcharacterが動くようにするかを設定するときに呼び出す関数
    {
        this.buttons = buttons;//こっちのクラスのthis.buttons変数に外部クラスのオブジェクト入れる
        //それぞれ示すもの「directionは辞書型で言うkeyの部分を示す」「buttonは押されたとに反応する画像を示す」
        // (※Pythonの辞書型同様にkeyを基にbuttonの画像が決まる)
        Object.entries(this.buttons).forEach(([direction, button]) => 
        {
            button.on('pointerdown', () => this.move(direction));//pointerdownで画像をクリックた時反応
            button.on('pointerup', () => this.move_stop(direction));//pointerupで画像をクリックしてクリック離したとき
            button.on('pointerout', () => this.move_stop(direction));//pointeroutで画像クリックした後画像からタップ位置が離れた時
        });
        this.key_push=true;//タップ操作が可能に設定されたタイミングに同時にキー操作もできるように設定
    }
    move(direction)//map_drawクラス内でsetButtons関数呼び出してセットした画像が押された瞬間に動く関数(direction:どの画像が押されたのかを示すkeyの値)
    {
        this.buttonPush[direction] = true; // ボタン押した瞬間に移動フラグをtrueに設定
        console.log(direction + " ボタン押した");
        const buttonTextures = {up: 'button_on1',left: 'button_on2',right: 'button_on3',down: 'button_on4'};//keyの値を基に区別できるようにさせるために作成
        this.buttons[direction].setTexture(buttonTextures[direction]);//Keyの情報を基に、画像をボタン押している時の画像に変更
    }
    move_stop(direction)//map_drawクラス内でsetButtons関数呼び出してセットした画像を押している状態じゃなくなった瞬間に動く関数(direction:どの画像が押されたのかを示すkeyの値)
    {
        this.buttonPush[direction] = false; // ボタン離した瞬間に移動フラグをfalseに設定
        console.log(direction + " ボタン離した");
        const buttonTextures = {up: 'button1',left: 'button2',right: 'button3',down: 'button4'};//keyの値を基に区別できるようにさせるために作成
        this.buttons[direction].setTexture(buttonTextures[direction]);//画像を押していない時の元の画像に変更
    }
    update()//character移動プログラム
    {
        if(this.key_push)//生成したインスタンスが操作playerが操作するキャラクターの奴だったら
        {
            let deltaX = 0;
            let deltaY = 0;
            const delta = this.scene.game.loop.delta / 1000;
            let isMoving = false;
            let currentDirection = this.lastDirection;
            // ボタンとキーボード入力をチェック
            if (this.buttonPush.left || this.cursors.left.isDown) // 左移動判定
            {
                deltaX = -this.moveSpeed * delta; // 左移動
                currentDirection = 'left';
                isMoving = true;
            }
            else if (this.buttonPush.right || this.cursors.right.isDown)// 右移動判定
            {
                deltaX = this.moveSpeed * delta; // 右移動
                currentDirection = 'right';
                isMoving = true;
            }
            else if (this.buttonPush.up || this.cursors.up.isDown)// 上移動判定
            {   
                deltaY = -this.moveSpeed * delta; // 上移動
                currentDirection = 'up';
                isMoving = true;
            }
            else if (this.buttonPush.down || this.cursors.down.isDown)// 下移動判定 
            {
                deltaY = this.moveSpeed * delta; // 下移動
                currentDirection = 'down';
                isMoving = true;
            }
            if (isMoving)//歩いているか歩いていないか判定して起動するif文
            {
                this.work_time++;
                if (this.work_time % this.work_speed == 0)this.work = (this.work + 1) % 4;//「this.work = (this.work + 1) % 4;」で0~3の範囲を循環させる   
                const directionIndex = {up: 0, left: 1, right: 2, down: 3}[currentDirection];//currentDirectionに入ったKey情報もとに数値を directionIndexに入れる
                this.main_player.setTexture(this.mainPlayerTexture[directionIndex][this.work]);//
                this.lastDirection = currentDirection;//currentDirection歩くのやめたときにどっち方向を向いて止まればいいかを判断するためにthis.lastDirectionに向きのデータを入れておく
            } 
            else //歩いていなかったらリセットしておく
            {
                this.work_time = this.work = 0;//リセット
                const directionIndex = {up: 0, left: 1, right: 2, down: 3}[this.lastDirection];
                this.main_player.setTexture(this.mainPlayerTexture[directionIndex][0]);
            }
            if (!this.checkCollision(deltaX, deltaY)&&(deltaX !== 0 || deltaY !== 0)) //衝突していなければ
            {
                this.player.x += deltaX;// 衝突しなければ移動
                this.player.y += deltaY;// 衝突しなければ移動
                this.main_player.x += deltaX;// 衝突しなければ移動
                this.main_player.y += deltaY;// 衝突しなければ移動
            }
            if(this.checkCollision(deltaX, deltaY)&&(deltaX !== 0 || deltaY !== 0))//衝突していれば
            {
                this.player.x -= deltaX;// 衝突していれば逆移動
                this.player.y -= deltaY;// 衝突していれば逆移動
                this.main_player.x -= deltaX;// 衝突していれば逆移動
                this.main_player.y -= deltaY;// 衝突していれば逆移動
            }
            const camera = this.scene.cameras.main;
            camera.scrollX = this.player.x - camera.width / 2;//this.player.xに合わせて移動
            camera.scrollY = this.player.y - camera.height / 2;// this.main_player.yに合わせて移動
            this.updateButtonPositions();// 操作ボタンをプレイヤーの位置に合わせて移動   
        }
    }
    checkCollision(deltaX, deltaY)// プレイヤーの位置と壁との衝突しているかを引数の座標で判定
    {
        const newX = this.player.x + deltaX;// プレイヤーの新しい位置を計算
        const newY = this.player.y + deltaY;// プレイヤーの新しい位置を計算
        for (let wall of this.wallsGroup.getChildren())//ぶつかっている壁がないか確かめる
        {
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), wall.getBounds())) return true;// 衝突した場合true返す
        }
        return false; // 衝突していなければfalseを返す
    }
    updateButtonPositions()//操作ボタンの位置をプレイヤーの位置に合わせて更新
    {
        const buttonOffsetX = 72;  // プレイヤーの位置からボタンのオフセット（X軸）
        const buttonOffsetY = 72;  // プレイヤーの位置からボタンのオフセット（Y軸）
        this.buttons.up.setPosition(this.player.x+220, this.player.y - buttonOffsetY); // 各ボタンを更新
        this.buttons.down.setPosition(this.player.x+220, this.player.y + buttonOffsetY); // 各ボタンを更新
        this.buttons.left.setPosition(this.player.x - buttonOffsetX+220, this.player.y); // 各ボタンを更新
        this.buttons.right.setPosition(this.player.x + buttonOffsetX+220, this.player.y); // 各ボタンを更新
    }
    enableControl() {this.key_push = true;}// キャラクターを操作可能にするメソッド
    disableControl(){this.key_push = false;}//キャラクターを操作不可能にするメソッド
    setVisibility(isVisible)//playerが特定の現在地にいた時にだけ起動するメソッド
    {
        this.buttons.up.setVisible(isVisible);//操作ボタンの表示非表示の設定
        this.buttons.down.setVisible(isVisible);//操作ボタンの表示非表示の設定
        this.buttons.left.setVisible(isVisible);//操作ボタンの表示非表示の設定
        this.buttons.right.setVisible(isVisible);//操作ボタンの表示非表示の設定
        this.key_push = isVisible;//表示非表示と同時に操作の有無を設定
        this.player.setVisible(isVisible);  // playerキャラクターの表示・非表示
        this.main_player.setVisible(isVisible);  // main_playerキャラクターの表示・非表示
    }
}

//インスタンス生成→変数内を指定の値に変更したバージョンのプログラムを作成
//オーバーライド→関数内を指定のプログラムに変更したバージョンのクラスを作成
//継承→あるクラス内にあるプログラムを別クラスに導入すること
//ポリモーフィズム→インスタンスを引数として扱う関数を書くこと
//カプセル化→インスタンスにしたとき関数経由で値操作が可能なクラス作成 (値操作可能な関数をゲッターやセッターと呼んだりする)
//オーバーロード→クラス内におんなじ同じ名前の関数を二つ作る事 (引数の個数の違いなどで区別される)
//抽象化→オーバーライドする前提で空の関数をクラス内に導入すること

//：インスタンス生成→インスタンスのメソッド起動!という流れで活用