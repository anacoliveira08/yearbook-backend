-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Aluno" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "cidade" TEXT,
    "frase" TEXT,
    "planosFuturos" TEXT,
    "fotoUrl" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mensagem" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "imagemUrl" TEXT,
    "autorId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mensagem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");

-- AddForeignKey
ALTER TABLE "Mensagem" ADD CONSTRAINT "Mensagem_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
