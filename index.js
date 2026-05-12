import express from 'express'; // importa o Express usando ES Modules

const app = express(); // cria a aplicação Express
const PORT = 3000; // porta onde o servidor vai rodar localmente

// rota GET na raiz — responde com JSON
app.get('/', (req, res) => {
  res.json({ mensagem: 'Yearbook API está no ar! 🎓' });
});

app.get('/status', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date()
    });
});

// inicia o servidor localmente — na Vercel essa parte é pulada
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

// exporta o app para a Vercel usar como serverless function
export default app;