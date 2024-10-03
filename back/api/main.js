"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//本体
const app = (0, express_1.default)();
const PORT = 5000;
//ハードより。いろいろアクセスできるようにする
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//http//の画面
app.get('/', (req, res) => {
    console.log("helloword");
    res.json({ t: "helloword" });
});
app.use((req, res, next) => {
    res.status(404).json({ error: true, msg: 'ドドドォ404ドン!!そんなページはない!!\n多分' });
});
//実行
app.listen(PORT, () => console.log(`Server running at http://127.0.0.1:${PORT}/`));
