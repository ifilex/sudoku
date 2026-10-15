import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI Cognitive Insight API endpoint
  app.post('/api/ai-cognitive-insight', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        res.status(400).json({ error: 'GEMINI_API_KEY_MISSING' });
        return;
      }

      const { stats, language } = req.body;
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `
You are an expert Cognitive Neuroscientist and Master Sudoku Trainer.
Analyze the user's Sudoku cognitive performance statistics:
${JSON.stringify(stats, null, 2)}

Provide a personalized, encouraging cognitive insight and 3 tailored mental agility recommendations in language "${language || 'es'}".
Format your response as valid JSON with the following structure:
{
  "summary": "Short 2-sentence cognitive assessment of their current performance, speed, accuracy, and memory retention",
  "strengths": ["Strength 1", "Strength 2"],
  "focusAreas": ["Area for growth 1", "Area for growth 2"],
  "tip": "Actionable strategy tip for next game"
}
Output ONLY the JSON object, with no markdown code blocks or additional surrounding text.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const responseText = response.text || '';
      // Clean json fences if present
      const cleanedJson = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsedData = JSON.parse(cleanedJson);

      res.json({ success: true, data: parsedData });
    } catch (err: any) {
      console.error('Error generating cognitive insight:', err);
      res.status(500).json({
        error: 'FAILED_TO_GENERATE_INSIGHT',
        details: err?.message || 'Unknown error',
      });
    }
  });

  // Vite development middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cognitive Sudoku Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
