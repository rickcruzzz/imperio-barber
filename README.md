# Imperium Barber Platform

Sistema web completo para barbearia premium com site institucional, area do cliente, painel administrativo, API REST segura e banco PostgreSQL.

## Stack
- Front-end: Next.js 15 + TypeScript + Tailwind CSS
- Back-end: Node.js + Express + TypeScript
- Banco: PostgreSQL + Prisma ORM
- Auth: JWT access token + refresh token
- Upload: Multer (armazenamento local em `backend/uploads`)
- Documentacao API: Swagger UI em `/docs`

## Arquitetura
```text
site  brasil/
  backend/   -> API REST + auth + regras de negocio + prisma
  frontend/  -> site institucional + login/cadastro + dashboards
  docs/      -> convencoes e exemplos de commits
```

## Regras de negocio implementadas
- Nao permite agendamento em data passada.
- Nao permite agendamento em horario ocupado para o barbeiro.
- Agenda separada por barbeiro via tabela `schedules`.
- Duracao do servico impacta o bloqueio de horario (`endAt`).
- Status do agendamento: `PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELED`.
- Limite diario configuravel por variavel `MAX_APPOINTMENTS_PER_DAY`.
- Controle de papeis: `ADMIN`, `BARBER`, `CLIENT`.

## Como rodar local
### 1. Requisitos
- Node.js 20+
- Docker (opcional, recomendado para Postgres)
- PostgreSQL local ou via Docker

### 2. Configurar variaveis de ambiente
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

### 3. Subir banco com Docker (opcional)
```bash
docker compose up -d
```

### 4. Instalar dependencias
```bash
npm install
npm install --workspace backend
npm install --workspace frontend
```

### 5. Prisma migrate + seed
```bash
cd backend
npx prisma migrate dev --name init
npx prisma db seed
cd ..
```

### 6. Rodar em desenvolvimento
```bash
npm run dev
```
- Front-end: http://localhost:3000
- Back-end: http://localhost:4000
- Swagger: http://localhost:4000/docs

## Credenciais seed
- Admin:
  - email: `admin@barbearia.com`
  - senha: `Admin@123`
- Barbeiro:
  - email: `barbeiro@barbearia.com`
  - senha: `Barber@123`

## Scripts
### Root
- `npm run dev` -> sobe frontend + backend em paralelo
- `npm run build` -> build completo

### Backend
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run prisma:migrate`
- `npm run prisma:seed`

### Frontend
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run test:e2e`

## Testes automatizados
### Backend (Jest + Supertest)
```bash
npm run test:backend
```

Cobertura:
```bash
cd backend
npm run test:coverage
```

### Frontend E2E (Playwright)
Primeira vez, instalar browsers do Playwright:
```bash
cd frontend
npx playwright install
```

Executar testes e2e:
```bash
npm run test:e2e
```

## Deploy sugerido
### Opcao 1 (simples e robusta)
1. Front-end no Vercel.
2. Back-end no Render/Railway/Fly.io.
3. Banco PostgreSQL no Neon/Supabase/RDS.
4. Storage de imagens: S3/Cloudinary (trocar storage local do Multer).

### Opcao 2 (containerizada)
1. Criar registry (GHCR ou Docker Hub).
2. Buildar imagens `backend/Dockerfile` e `frontend/Dockerfile`.
3. Deploy em VPS com Docker Compose + reverse proxy (Nginx/Caddy).

## GitHub e organizacao recomendada
- Branches:
  - `main` (producao)
  - `develop` (integracao)
  - `feature/*`, `fix/*`, `chore/*`
- Pull Request:
  - Descricao curta do contexto
  - Checklist de testes
  - Evidencias (prints/gravações)

## Endpoints principais da API
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/forgot-password`
- `POST /api/v1/auth/reset-password`
- `GET /api/v1/public/content`
- `GET /api/v1/services`
- `GET /api/v1/barbers`
- `GET /api/v1/appointments` (auth)
- `POST /api/v1/appointments` (CLIENT)
- `PATCH /api/v1/appointments/:id/status` (ADMIN/BARBER)
- `GET /api/v1/admin/metrics` (ADMIN)

## Proximos upgrades recomendados
1. Migrar upload local para S3/Cloudinary com URLs assinadas.
2. Adicionar testes automatizados (unit + integration + e2e).
3. Adicionar observabilidade (OpenTelemetry + logs estruturados).
4. Hardening de auth com revogacao de refresh token por dispositivo.
