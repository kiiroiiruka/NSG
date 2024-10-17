export class Map 
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