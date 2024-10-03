//import
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
//本体
const app = express();
const PORT =5000;

//ハードより。いろいろアクセスできるようにする
app.use(cors());
app.use(express.json());


//http//の画面
app.get('/', (req, res) => {
  console.log("helloword");
  res.json({t:"helloword"})
  });
app.use((req, res,next) => {
  res.status(404).json({error:true,msg:'ドドドォ404ドン!!そんなページはない!!\n多分'});
});


//実行
app.listen(PORT, () => console.log(`Server running at http://127.0.0.1:${PORT}/`),);
