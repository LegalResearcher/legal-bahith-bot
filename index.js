const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config(); // لتفعيل متغيرات البيئة مثل OPENAI_API_KEY

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // لتقديم index.html من مجلد public

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // يجب إضافته في Render > Environment
});

const openai = new OpenAIApi(configuration);

app.post('/ask', async (req, res) => {
  const question = req.body.question;

  const finalPrompt = `أجب كخبير قانوني يمني معتمد، لا تخرج عن القوانين اليمنية. السؤال: ${question}`;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: finalPrompt }],
    });

    res.json({ answer: response.data.choices[0].message.content });
  } catch (error) {
    console.error('❌ خطأ في الاتصال بـ GPT:', error.message);
    res.status(500).json({ answer: 'حدث خطأ أثناء الاتصال بالخادم. حاول لاحقًا.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Legal bot server is running on port ${PORT}`);
});
