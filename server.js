const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

const users = {}; // 仮のユーザーデータベース

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    if (users[email]) {
        return res.status(400).send('ユーザーは既に存在します');
    }
    users[email] = { password };
    res.status(200).send('登録が完了しました');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!users[email] || users[email].password !== password) {
        return res.status(400).send('メールアドレスまたはパスワードが正しくありません');
    }
    res.status(200).send('ログインが成功しました');
});

app.post('/submit_review', (req, res) => {
    const newReview = req.body;
    const filePath = path.join(__dirname, 'public', 'reviews.json');
    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        const reviews = JSON.parse(data);
        reviews.push(newReview);
        fs.writeFile(filePath, JSON.stringify(reviews, null, 2), (err) => {
            if (err) throw err;
            res.status(200).send('レビューが投稿されました');
        });
    });
});

app.listen(3000, () => {
    console.log('サーバーがポート3000で起動しました');
});
