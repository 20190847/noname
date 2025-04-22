const express = require('express');
const app = express();

const { MongoClient } = require('mongodb')

let db
const url = 'mongodb+srv://admin:1234@cluster0.3vmjrky.mongodb.net/'
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공')
  db = client.db('forum')
}).catch((err)=>{
  console.log(err)
})

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', async (요청, 응답) => {
    let result = await db.collection('post').find().toArray();
    응답.render('index', { 글목록: result });
});

app.listen(3000, () => {
    console.log('서버 실행 중: http://localhost:3000');
});
app.get('/intro', async (요청, 응답) => {
  응답.render('intro');
});