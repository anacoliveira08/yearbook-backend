import { Router } from 'express'; // Router cria um mini-app de rotas
import {
  listarAlunos,
  buscarAluno,
  criarAluno,
  atualizarAluno,
  deletarAluno,
} from '../controllers/alunosController.js'; // importa as funções do controller

const router = Router(); // cria o router

router.get('/', listarAlunos);         // GET /alunos
router.get('/:id', buscarAluno);       // GET /alunos/:id
router.post('/', criarAluno);          // POST /alunos
router.put('/:id', atualizarAluno);    // PUT /alunos/:id
router.delete('/:id', deletarAluno);   // DELETE /alunos/:id

export default router; // exporta o router para usar no index.js