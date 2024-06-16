const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

const users = {}; // 仮のユーザーデータベース

// ユーザー登録エンドポイント
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    if (users[email]) {
        return res.status(400).send('ユーザーは既に存在します');
    }
    users[email] = { password };
    res.status(200).send('登録が完了しました');
});

// ユーザーログインエンドポイント
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!users[email] || users[email].password !== password) {
        return res.status(400).send('メールアドレスまたはパスワードが正しくありません');
    }
    res.status(200).send('ログインが成功しました');
});

// レビュー投稿エンドポイント
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

// サーバーの起動
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`サーバーがポート${PORT}で起動しました`);
});