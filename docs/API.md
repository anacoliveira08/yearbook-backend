# API do Yearbook — Documentação de Endpoints

    Base URL (produção): `https://yearbook-backend.vercel.app`

    ## Convenções

    - Todas as respostas são em JSON
    - Rotas protegidas exigem header `Authorization: Bearer <token>`
    - O campo `senhaHash` nunca é retornado em nenhuma resposta
    - Erros seguem o formato `{ "erro": "mensagem descritiva" }`

    ## Auth

    ### POST /auth/register

    Cria uma nova conta de aluno.

    - **Autenticação:** Não
    - **Body:**

    ```json
    {
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "senha": "minhasenha123",
      "cidade": "Salinas",
      "frase": "Aqui começa o futuro.",
      "planosFuturos": "Cursar Ciência da Computação na UFMG"
    }
    ```

    - **Resposta de sucesso:** `201 Created`

    ```json
    {
      "id": 1,
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "cidade": "Salinas",
      "frase": "Aqui começa o futuro.",
      "planosFuturos": "Cursar Ciência da Computação na UFMG",
      "fotoUrl": null,
      "role": "USER",
      "criadoEm": "2026-04-03T10:30:00.000Z"
    }
    ```

    - **Erros:**
      - `400` — Campos obrigatórios ausentes
      - `409` — Email já cadastrado

      ### POST /auth/login

    Autentica um aluno e retorna um token JWT.

    - **Autenticação:** Não
    - **Body:**

    ```json
    {
      "email": "maria@email.com",
      "senha": "minhasenha123"
    }
    ```

    - **Resposta de sucesso:** `200 OK`

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

    - **Erros:**
      - `401` — Credenciais inválidas (email não existe ou senha incorreta)

      # Alunos

## GET /alunos

Lista todos os alunos.

- **Autenticação:** Não
- **Body:** Nenhum

- **Resposta de sucesso:** `200 OK`

```json
[
  {
    "id": 1,
    "nome": "Maria Silva",
    "email": "maria@email.com",
    "cidade": "Salinas",
    "frase": "Aqui começa o futuro.",
    "planosFuturos": "Cursar Ciência da Computação",
    "fotoUrl": null,
    "role": "USER",
    "criadoEm": "2026-04-03T10:30:00.000Z"
  }
]
```

- **Erros:**
  - Nenhum

---

## GET /alunos/:id

Busca um aluno pelo ID.

- **Autenticação:** Não
- **Body:** Nenhum

- **Resposta de sucesso:** `200 OK`

```json
{
  "id": 1,
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "cidade": "Salinas",
  "frase": "Aqui começa o futuro.",
  "planosFuturos": "Cursar Ciência da Computação",
  "fotoUrl": null,
  "role": "USER",
  "criadoEm": "2026-04-03T10:30:00.000Z"
}
```

- **Erros:**
  - `404` — Aluno não encontrado

---

## PUT /alunos/:id

Atualiza o próprio perfil.

- **Autenticação:** Bearer token

- **Body:**

```json
{
  "cidade": "Salinas",
  "frase": "Novo começo!",
  "planosFuturos": "Entrar na faculdade",
  "fotoUrl": "https://imagem.com/foto.jpg"
}
```

- **Resposta de sucesso:** `200 OK`

```json
{
  "id": 1,
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "cidade": "Salinas",
  "frase": "Novo começo!",
  "planosFuturos": "Entrar na faculdade",
  "fotoUrl": "https://imagem.com/foto.jpg",
  "role": "USER",
  "criadoEm": "2026-04-03T10:30:00.000Z"
}
```

- **Erros:**
  - `401` — Não autenticado
  - `403` — Sem permissão

---

## DELETE /alunos/:id

Remove um aluno.

- **Autenticação:** Bearer token (admin)
- **Body:** Nenhum

- **Resposta de sucesso:** `204 No Content`

- **Erros:**
  - `401` — Não autenticado
  - `403` — Sem permissão

---

# Mensagens

## GET /mensagens

Lista todas as mensagens do mural.

- **Autenticação:** Não
- **Body:** Nenhum

- **Resposta de sucesso:** `200 OK`

```json
[
  {
    "id": 1,
    "conteudo": "Vou sentir saudades!",
    "criadoEm": "2026-04-03T10:30:00.000Z",
    "autor": {
      "id": 1,
      "nome": "Maria Silva",
      "fotoUrl": null
    }
  }
]
```

- **Erros:**
  - Nenhum

---

## POST /mensagens

Cria uma nova mensagem.

- **Autenticação:** Bearer token

- **Body:**

```json
{
  "conteudo": "Vou sentir saudades!",
  "fotoUrl": null
}
```

- **Resposta de sucesso:** `201 Created`

```json
{
  "id": 1,
  "conteudo": "Vou sentir saudades!",
  "criadoEm": "2026-04-03T10:30:00.000Z"
}
```

- **Erros:**
  - `400` — Conteúdo obrigatório
  - `401` — Não autenticado

---

## DELETE /mensagens/:id

Exclui uma mensagem.

- **Autenticação:** Bearer token
- **Body:** Nenhum

- **Resposta de sucesso:** `204 No Content`

- **Erros:**
  - `401` — Não autenticado
  - `403` — Sem permissão
