import * as admin from 'firebase-admin';
import * as serviceAccount from './path/to/firebase-adminsdk.json';


// Firebase Admin SDKを初期化
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

const db = admin.firestore();

// JSONデータの型を定義
interface UserData {
  name: string;
  age: number;
  city: string;
}

// 保存するJSONデータ
const jsonData: UserData = {
  name: "John",
  age: 30,
  city: "New York"
};

// コレクションとドキュメントへの参照
const docRef = db.collection('users').doc('user1');

// JSONデータを保存
docRef.set(jsonData).then(() => {
  console.log('データ保存に成功しました!');
}).catch((error) => {
  console.error('データ保存に失敗しました:', error);
});
