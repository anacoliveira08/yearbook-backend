import express from 'express';                // importa o Express
import alunosRouter from './routes/alunos.js'; // importa o router de alunos <- NOVO

const app = express();      // cria a aplicação Express
const PORT = 3000;          // porta do servidor

app.use(express.json());    // middleware que parseia JSON do body das requisições  <- NOVO

// rota raiz — boas-vindas
app.get('/', (req, res) => {
  res.json({ mensagem: 'Yearbook API está no ar! 🎓' });
});

// rota de health check
app.get('/status', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// registra as rotas de alunos com prefixo /alunos  <- NOVO
app.use('/alunos', alunosRouter);

// inicia o servidor localmente — na Vercel essa parte é pulada
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

// exporta o app para a Vercel usar como serverless function
export default app;