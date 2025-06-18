import express from 'express';
import cors from 'cors';
import { OpenAI } from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/chat', async (req, res) => {
  const question = req.body.question;
  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Eres un asesor experto en seguros GNP en México. Solo responde preguntas relacionadas con seguros en México.' },
        { role: 'user', content: question }
      ]
    });
    res.json({ reply: chat.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ message: 'Error al comunicarse con OpenAI' });
  }
});

