export class Map 
{
    constructor(scene, layout) 
    {
        this.scene = scene;
        this.layout = layout;
        this.tileSize = 110;
        this.mapObjects = [];
        this.wallsGroup = this.scene.physics.add.staticGroup();//画像情報をたくさん入れられるオブジェクト作成
        //this.変数=this.scene.physics.add.staticGroup();で画像情報とその画像の座標情報をどんどん入れることが出来るオブジェクトを作成
        this.isVisible = true;  // 初期状態を表示に設定
    }
    create() 
    {
        console.log(this.layout); // layoutがundefinedかどうかを確認
        if (!this.layout) 
        {
            console.error("layout is undefined");
            return;
        }
        for (let y = 0; y < this.layout.length; y++) 
        {
            for (let x = 0; x < this.layout[y].length; x++) 
            {
                const tileType = this.layout[y][x];
                if (tileType === 1) 
                {
                    const wall = this.wallsGroup.create(x * this.tileSize, y * this.tileSize, 'wall');
                    wall.setOrigin(0, 0);
                } 
                else 
                {
                    const floor = this.scene.add.image(x * this.tileSize, y * this.tileSize, 'floor');
                    floor.setOrigin(0, 0);
                    this.mapObjects.push(floor);
                }
            }
        }
    }
    toggleVisibility()//マップの表示非表示を切り替えるメソッド 
    {
        this.isVisible = !this.isVisible;
        this.setVisibility(this.isVisible);
    }
    setVisibility(isVisible)// 表示状態を設定するメソッド 
    {
        this.mapObjects.forEach(obj => {obj.setVisible(isVisible);}); // マップオブジェクトの表示・非表示を変更
        this.wallsGroup.getChildren().forEach(wall => {wall.setVisible(isVisible);});// 壁グループも表示・非表示を変更
    }
    getObjects(){return this.mapObjects;}//外部からgetObjects()関数を呼び出すと、そのインスタンス内で作成した配列で示したマップの構造図を取得できる
    getWallsGroup(){return this.wallsGroup;}//外部からgetWallsGroup()関数を呼び出すと、そのインスタンス内で「this.wallsGroup=this.scene.physics.add.staticGroup();」という風に作成したオブジェクトを取得できる
}