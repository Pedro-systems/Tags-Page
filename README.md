# Revisão de Tags GHL - BellaTerra

Interface web para revisão e aprovação de mudanças nas tags do GHL (GoHighLevel).

## 🚀 Funcionalidades

- ✅ Visualização de todos os registros da tabela `Tag_Mapping`
- ✅ Dropdown para aprovar ou rejeitar cada tag
- ✅ Feedback visual imediato (cores verde/vermelho)
- ✅ Salvamento em lote das alterações
- ✅ Notificações de sucesso/erro
- ✅ Design responsivo para desktop e mobile
- ✅ Estatísticas de tags aprovadas/rejeitadas

## 📋 Pré-requisitos

- Node.js 18.x ou superior
- Conta no [Supabase](https://supabase.com)
- Conta na [Vercel](https://vercel.com) (para deploy)

## 🛠️ Configuração Local

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e preencha com suas credenciais do Supabase:

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
```

**Como obter as credenciais do Supabase:**

1. Acesse [supabase.com](https://supabase.com) e faça login
2. Selecione seu projeto
3. Vá em **Settings** → **API**
4. Copie a **Project URL** e a **anon public key**

### 3. Executar em Modo de Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## 🌐 Deploy na Vercel

### Método 1: Via CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Método 2: Via Interface Web

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em **"Add New Project"**
4. Importe o repositório do GitHub
5. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Clique em **Deploy**

### Configuração de Variáveis de Ambiente na Vercel

1. No dashboard da Vercel, vá para o seu projeto
2. Clique em **Settings** → **Environment Variables**
3. Adicione as seguintes variáveis:

| Nome                            | Valor                             |
| ------------------------------- | --------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | URL do seu projeto Supabase       |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave pública anônima do Supabase |

4. Clique em **Save**
5. Faça um novo deploy para aplicar as variáveis

## 📊 Estrutura da Tabela Supabase

A tabela `Tag_Mapping` deve ter a seguinte estrutura:

```sql
CREATE TABLE Tag_Mapping (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  Old_Tag TEXT,
  New_Tag TEXT,
  Action TEXT,
  Frequency NUMERIC,
  AI_Suggestion TEXT,
  AI_New_Name TEXT,
  AI_Reasoning TEXT
);

-- Habilitar Row Level Security (recomendado)
ALTER TABLE Tag_Mapping ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública
CREATE POLICY "Allow public read access" ON Tag_Mapping
  FOR SELECT USING (true);

-- Política para permitir atualização pública
CREATE POLICY "Allow public update access" ON Tag_Mapping
  FOR UPDATE USING (true);
```

## 📁 Estrutura do Projeto

```
paginaTags/
├── src/
│   ├── app/
│   │   ├── globals.css      # Estilos globais (Tailwind)
│   │   ├── layout.tsx       # Layout principal
│   │   └── page.tsx         # Página inicial
│   ├── components/
│   │   ├── Header.tsx       # Cabeçalho da página
│   │   ├── LoadingSpinner.tsx
│   │   ├── SaveButton.tsx   # Botão de salvar
│   │   ├── TagTable.tsx     # Tabela de tags
│   │   └── Toast.tsx        # Notificações
│   ├── lib/
│   │   └── supabase.ts      # Cliente Supabase
│   └── types/
│       └── database.ts      # Tipos TypeScript
├── .env.example             # Exemplo de variáveis de ambiente
├── .env.local              # Variáveis de ambiente (não commitado)
├── next.config.ts          # Configuração do Next.js
├── tailwind.config.ts      # Configuração do Tailwind
├── tsconfig.json           # Configuração do TypeScript
└── package.json            # Dependências do projeto
```

## 🔧 Scripts Disponíveis

| Comando         | Descrição                            |
| --------------- | ------------------------------------ |
| `npm run dev`   | Inicia o servidor de desenvolvimento |
| `npm run build` | Cria build de produção               |
| `npm run start` | Inicia servidor de produção          |
| `npm run lint`  | Executa verificação de linting       |

## 🎨 Customização

### Cores

As cores podem ser customizadas em `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        // Altere as cores primárias aqui
        500: '#0ea5e9',
        600: '#0284c7',
      },
    },
  },
},
```

### Logo e Título

Edite o componente `src/components/Header.tsx` para alterar o título e adicionar uma logo.

## 🔒 Segurança

Para produção, considere:

1. **Row Level Security (RLS)** no Supabase
2. **Autenticação** para restringir acesso
3. **Rate limiting** no Supabase

## 📝 Licença

Este projeto é privado e de uso exclusivo da BellaTerra.

## 🆘 Suporte

Em caso de problemas:

1. Verifique se as variáveis de ambiente estão corretas
2. Confira se a tabela `Tag_Mapping` existe no Supabase
3. Verifique as políticas de RLS no Supabase
