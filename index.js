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
        { role: 'system', content: 'Responde como un asesor profesional de Seguros La Paz en México. Usa un tono cálido, agrega temas de consientización breves, emojis donde ayude, bullet points cuando sea lista, títulos cortos en <strong>, y al final invita a contactar a Seguros La Paz para asesoría o cotización. Responde en HTML limpio, no uses solo texto plano. Responde solo preguntas de seguros en México' },
        { role: 'user', content: question }
      ]
    });
    res.json({ reply: chat.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ message: 'Error al comunicarse con OpenAI' });
  }
});

