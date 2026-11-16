import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // Gemini AI Tutor API endpoint
  app.post('/api/ai-tutor', async (req, res) => {
    try {
      const { prompt, context } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY tanımlanmamış. Lütfen AI Studio ayarlarından anahtarınızı ekleyin.' });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `Sen profesyonel bir İK, Bordro ve Maliyet Muhasebesi Eğitmenisin. 
Kullanıcılara Türkiye'deki brütten nete maaş hesaplama mantığını, SGK primlerini (%14 işçi, %1 işsizlik), gelir vergisi matrahını, gelir vergisi dilimlerini (%15, %20 vb.) ve damga vergisini (binde 7.59) adım adım, anlaşılır ve pedagojik bir dille öğretiyorsun. 
Kullanıcının sorusuna veya mevcut adım durumuna (${context || 'genel'}) dayanarak net, teşvik edici ve öğretici yanıtlar ver. Yanıtlarını Türkçe ve Markdown formatında hazırla.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\nKullanıcı Sorusu: ${prompt}` }] }
        ],
      });

      res.json({ answer: response.text });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      res.status(500).json({ error: error.message || 'Yapay zeka yanıt oluştururken bir hata oluştu.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
  });
}

startServer();
