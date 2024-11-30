"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var admin = require("firebase-admin");
var serviceAccount = require("./gnpwebgame-firebase-adminsdk-tzwuu-d4936dee6d.json");
// Firebase Admin SDKを初期化
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
// 保存するJSONデータ
var jsonData = {
    name: "John",
    age: 30,
    city: "New York"
};
// コレクションとドキュメントへの参照
var docRef = db.collection('users').doc('user1');
// JSONデータを保存
docRef.set(jsonData).then(function () {
    console.log('データ保存に成功しました!');
}).catch(function (error) {
    console.error('データ保存に失敗しました:', error);
});
