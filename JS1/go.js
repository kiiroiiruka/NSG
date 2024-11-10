const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 1001;

// 静的ファイルの提供
app.use(express.static(path.join(__dirname))); // 現在のディレクトリを静的ファイルのルートに設定
app.use(cors());
app.use(express.json());

// ルートエンドポイント
app.get('/', (req, res) => 
{
    console.log("起動されました");
    // huronnto_2フォルダ内のjavascript1.htmlを指定
    //res.sendFile(path.join(__dirname, 'huronnto_2', 'main_game.html')); // ここを修正
    res.sendFile(path.join(__dirname,'front','main.html')); // ここを修正
});

// サーバーをリッスン
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));