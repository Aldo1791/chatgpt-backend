import express from 'express';
import cors from 'cors';
import { OpenAI } from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/chat', async (req, res) => {
  const question = req.body.question;
  // Validación por seguridad
  if (!question || question.trim() === '') {
    return res.status(400).json({ message: 'Pregunta no proporcionada' });
  }
  
  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'Eres un asesor profesional de Seguros La Paz. Solo puedes responder preguntas sobre seguros en México, especialmente seguros GNP. Responde en HTML amigable, usando emojis y bullet points cuando sea útil. No respondas preguntas fuera de ese tema. Si preguntan algo distinto, contesta amablemente que solo puedes ayudar sobre seguros y cotizaciones. Al final de cada respuesta, invita a contactar a Seguros La Paz para una asesoría o cotización más detallada. Nunca generes ni muestres código, imágenes, ni enlaces externos. Solo responde texto en HTML amigable relacionado exclusivamente con seguros GNP o cotizaciones en México.'},
        { role: 'user', content: question }
      ]
    });
    res.json({ reply: chat.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ message: 'Error al comunicarse con OpenAI' });
  }
});
// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en el puerto ${PORT}`);
});
