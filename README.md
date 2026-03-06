# BADBIT SOLVER MVP

Plataforma premium de estudo de poker construída com Next.js 14 + Supabase, pronta para deploy online na Vercel.

## Stack
- Next.js 14 (App Router) + TypeScript strict
- TailwindCSS + UI estilo shadcn
- Zustand + Framer Motion + Recharts
- Supabase (Auth + Postgres)
- i18n completo (`pt-BR`, `en`, `es`)

## 1) Criar projeto no Supabase
1. Crie um projeto em https://supabase.com.
2. No SQL Editor, execute `supabase/schema.sql`.
3. Em **Authentication > Providers**, habilite Email/Password.

## 2) Configurar Auth e tabelas
- As tabelas `profiles`, `import_sessions` e `hands` já estão no schema.
- Garanta RLS + policies conforme sua estratégia de segurança antes de produção.

## 3) Variáveis na Vercel
Defina:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL`

## 4) Publicar
1. Suba o repositório no GitHub.
2. Importe na Vercel.
3. Configure as variáveis acima.
4. Deploy.

## 5) Testar online no navegador
- Acesse a URL pública da Vercel.
- Cadastre usuário.
- Faça login.
- Complete onboarding.
- Importe `.txt` ou cole texto.
- Veja Dashboard, listagem de mãos, replay e settings.

## Rodando localmente (opcional)
```bash
npm install
npm run dev
```
