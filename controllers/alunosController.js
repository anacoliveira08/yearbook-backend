import prisma from '../prisma/client.js'; // importa o singleton do Prisma

// select que omite senhaHash — reutilizado em todas as queries de alunos
const selectSemSenha = {
  id: true,
  nome: true,
  email: true,
  cidade: true,
  frase: true,
  planosFuturos: true,
  fotoUrl: true,
  role: true,
  criadoEm: true,
  // senhaHash NÃO está aqui — nunca retornado pela API
};

// GET /alunos — lista todos os alunos
export async function listarAlunos(req, res) {
  const alunos = await prisma.aluno.findMany({
    select: selectSemSenha, // retorna todos os campos EXCETO senhaHash
  });
  res.json(alunos); // responde com o array de alunos em JSON
}

// GET /alunos/:id — busca um aluno pelo ID
export async function buscarAluno(req, res) {
  const { id } = req.params; // extrai o :id da URL
  const aluno = await prisma.aluno.findUnique({
    where: { id: Number(id) }, // converte string → number
    select: selectSemSenha,    // omite senhaHash
  });

  if (!aluno) {
    return res.status(404).json({ erro: 'Aluno não encontrado' }); // null → 404
  }

  res.json(aluno); // retorna o aluno encontrado
}

// --- Stubs para o desafio do aluno ---

// 🎯 POST /alunos — cria um novo aluno
export async function criarAluno(req, res) {
  try {
    const {
      nome,
      email,
      senhaHash,
      cidade,
      frase,
      planosFuturos,
      fotoUrl,
      role,
    } = req.body;

    const alunoCriado = await prisma.aluno.create({
      data: {
        nome,
        email,
        senhaHash,
        cidade,
        frase,
        planosFuturos,
        fotoUrl,
        role,
      },
      select: selectSemSenha,
    });

    return res.status(201).json(alunoCriado);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao criar aluno",
      detalhes: error.message,
    });
  }
}

// 🎯 PUT /alunos/:id — atualiza um aluno existente
export async function atualizarAluno(req, res) {
  const { id } = req.params;
  const {
    nome,
    email,
    senhaHash,
    cidade,
    frase,
    planosFuturos,
    fotoUrl,
    role,
  } = req.body;

  try {
    const alunoAtualizado = await prisma.aluno.update({
      where: {
        id: Number(id),
      },
      data: {
        nome,
        email,
        senhaHash,
        cidade,
        frase,
        planosFuturos,
        fotoUrl,
        role,
      },
      select: selectSemSenha,
    });

    return res.json(alunoAtualizado);
  } catch (error) {
    return res.status(404).json({
      erro: "Aluno não encontrado",
    });
  }
}

// 🎯 DELETE /alunos/:id — deleta um aluno
export async function deletarAluno(req, res) {
  const { id } = req.params;

  try {
    await prisma.aluno.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(204).end();
  } catch (error) {
    return res.status(404).json({
      erro: "Aluno não encontrado",
    });
  }
}