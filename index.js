const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// لجعل مجلد "public" متاح للوصول إليه (يحتوي على index.html)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// نقطة استلام الأسئلة من المستخدم
app.post('/ask', async (req, res) => {
  const question = req.body.question;

  if (!question) {
    return res.status(400).json({ answer: 'يرجى كتابة سؤال.' });
  }

  // هنا تربط بـ ChatGPT أو تضع إجابة وهمية مؤقتًا
  const dummyAnswer = `سؤالك كان: "${question}" ✅ (هنا سيتم الرد الحقيقي من GPT)`;

  res.json({ answer: dummyAnswer });
});

app.listen(port, () => {
  console.log(`✅ Legal Bot is running on port ${port}`);
});
