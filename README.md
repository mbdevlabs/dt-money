# DT Money 💰

O **DT Money** é uma aplicação moderna de gerenciamento financeiro pessoal desenvolvida em React que permite aos usuários registrar e acompanhar suas despesas e receitas de forma intuitiva. Com uma interface amigável e recursos poderosos como validação de formulários, paginação e suporte offline, o DT Money oferece uma experiência completa para o controle de finanças pessoais.

## ✨ Funcionalidades

- **Registro de Transações**: Adicione receitas e despesas com descrição, valor, categoria e tipo
- **Resumo Financeiro**: Visualize cards com entradas, saídas e saldo total atualizado em tempo real
- **Busca e Filtros**: Pesquise transações por descrição para encontrar rapidamente o que procura
- **Paginação**: Navegue facilmente por suas transações com paginação de 4 itens por página
- **Modal Interativo**: Interface moderna para criar novas transações usando Radix UI
- **Validação em Tempo Real**: Validação de formulários robusta com Zod e React Hook Form
- **Categorização**: Organize suas transações por categorias personalizadas
- **Formatação Automática**: Valores em reais (R$) e datas formatadas no padrão brasileiro
- **Suporte Offline**: Backup automático no localStorage para acesso sem conexão
- **Tema Customizado**: Interface elegante com sistema de temas usando Styled Components

## 🚀 Tecnologias

### Core
- **React 18.3.1** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.9.3** - Superset JavaScript com tipagem estática
- **Vite 6.0.9** - Build tool moderna e rápida

### Estilização
- **Styled Components 6.1.19** - CSS-in-JS para estilização de componentes

### Formulários e Validação
- **React Hook Form 7.69.0** - Gerenciamento performático de formulários
- **Zod 3.24.1** - Schema validation com TypeScript-first
- **@hookform/resolvers 3.9.2** - Integração entre React Hook Form e Zod

### UI Components
- **@radix-ui/react-dialog 1.1.15** - Componente de modal acessível
- **@radix-ui/react-radio-group 1.3.8** - Radio buttons acessíveis
- **phosphor-react 1.4.1** - Biblioteca de ícones moderna e flexível

### Gerenciamento de Estado
- **use-context-selector 2.0.0** - Otimização de performance para Context API
- **Context API** - Gerenciamento de estado global do React

### Requisições HTTP
- **Axios 1.13.2** - Cliente HTTP para requisições à API

### Desenvolvimento
- **JSON Server 0.17.4** - API REST fake para desenvolvimento
- **ESLint 8.57.1** - Linter para manter qualidade do código
- **Prettier 3.7.4** - Formatador de código automático

## 📁 Estrutura do Projeto

```
src/
├── @types/              # Definições de tipos TypeScript
│   └── styled.d.ts      # Tipagem do tema do Styled Components
├── assets/              # Recursos estáticos (imagens, ícones)
│   └── logo-dt-money.svg
├── components/          # Componentes reutilizáveis
│   ├── Header/          # Cabeçalho com logo e botão de nova transação
│   ├── NewTransactionModal/  # Modal para criar transações
│   ├── Pagination/      # Controles de paginação
│   └── Summary/         # Cards de resumo financeiro
├── contexts/            # Contextos React para estado global
│   └── TransactionsContext.tsx  # Gerenciamento de transações
├── hooks/               # Custom hooks reutilizáveis
│   └── useSummary.ts    # Hook para cálculo de resumo financeiro
├── lib/                 # Configurações de bibliotecas
│   └── axios.ts         # Instância configurada do Axios
├── pages/               # Páginas da aplicação
│   └── Transactions/    # Página principal de transações
│       ├── components/  # Componentes específicos da página
│       │   └── SearchForm/  # Formulário de busca
│       ├── index.tsx
│       └── styles.ts
├── styles/              # Estilos globais e temas
│   ├── themes/
│   │   └── default.ts   # Paleta de cores e valores do tema
│   └── global.ts        # Reset CSS e estilos base
├── utils/               # Funções utilitárias
│   └── formatter.ts     # Formatadores de data, moeda e tela
├── App.tsx              # Componente raiz
├── main.tsx             # Entry point da aplicação
└── vite-env.d.ts        # Tipos do Vite
```

## 🛠️ Como Usar

### 1. Clone o Repositório

```bash
git clone https://github.com/mbrenodev/dt-money.git
```

### 2. Instale as Dependências

```bash
cd dt-money
npm install
```

### 3. Inicie o Servidor de Desenvolvimento

**Importante**: É necessário executar dois servidores simultaneamente.

**Terminal 1 - Servidor Vite:**
```bash
npm run dev
```

**Terminal 2 - JSON Server:**
```bash
npm run dev:server
```

### 4. Acesse a Aplicação

- **Frontend**: Abra seu navegador e acesse [http://localhost:5173](http://localhost:5173)
- **API**: O JSON Server estará rodando em [http://localhost:3333](http://localhost:3333)

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento Vite na porta 5173 |
| `npm run dev:server` | Inicia o JSON Server na porta 3333 para a API |
| `npm run build` | Compila o TypeScript e faz o build de produção com Vite |
| `npm run lint` | Executa o ESLint para verificar problemas no código |
| `npm run preview` | Visualiza o build de produção localmente |

## 🔌 API e Backend

### JSON Server

O projeto utiliza o **JSON Server** como backend de desenvolvimento, proporcionando uma API REST completa sem necessidade de configuração complexa.

### Endpoints Disponíveis

#### GET `/transactions`

Retorna lista de transações com suporte a:
- **Query params**: `q` (busca por descrição)
- **Paginação**: `_page`, `_limit`
- **Ordenação**: `_sort`, `_order`

**Exemplo:**
```bash
GET http://localhost:3333/transactions?q=desenvolvimento&_page=1&_limit=4&_sort=createdAt&_order=desc
```

#### POST `/transactions`

Cria uma nova transação.

**Body:**
```json
{
  "description": "Desenvolvimento de website",
  "price": 14000,
  "category": "Freelance",
  "type": "income",
  "createdAt": "2024-02-20T19:40:28.137Z"
}
```

### Schema de Dados

```typescript
interface Transaction {
  id: number;
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
  createdAt: string; // ISO 8601 date
}
```

### Arquivo de Configuração

As transações são armazenadas em `server.json` na raiz do projeto. Este arquivo é gerenciado automaticamente pelo JSON Server.

## 💡 Funcionalidades Técnicas

### Context API com Otimização

Utiliza **use-context-selector** para otimizar re-renders, permitindo que componentes se inscrevam apenas nas partes específicas do contexto que utilizam.

```typescript
// Seleciona apenas os dados necessários
const transactions = useContextSelector(TransactionsContext, (context) => {
  return context.transactions
})
```

### Custom Hooks

**useSummary**: Hook personalizado que calcula automaticamente as entradas, saídas e total das transações.

```typescript
const summary = useSummary(); // { income, outcome, total }
```

### Validação de Formulários

Integração entre **React Hook Form** e **Zod** para validação type-safe:

```typescript
const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})
```

### Sistema de Temas

Tema centralizado com paleta de cores consistente:
- **Gray Scale**: Tons de cinza para elementos neutros
- **Green Scale**: Tons de verde para receitas
- **Red Scale**: Tons de vermelho para despesas

### Formatação Brasileira

Utiliza `Intl` API para formatação nativa:
- **Moeda**: `R$ 14.000,00` (pt-BR)
- **Data**: `20 de fevereiro de 2024` (pt-BR)

### Persistência Offline

Sistema automático de backup que:
- Salva transações no localStorage como fallback
- Sincroniza dados entre API e storage local
- Mantém funcionamento mesmo sem conexão com API

## 🎨 Sistema de Temas

O projeto utiliza Styled Components com um sistema de temas robusto definido em `src/styles/themes/default.ts`:

```typescript
{
  white: '#fff',

  'gray-100': '#E1E1E6',
  'gray-300': '#C4C4CC',
  'gray-400': '#8D8D99',
  // ... mais cores

  'green-300': '#00B37E',
  'green-500': '#00875F',
  'green-700': '#015F43',

  'red-300': '#F75A68',
  'red-500': '#AB222E',
  'red-700': '#7A1921',
}
```

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorar o projeto.

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Desenvolvido com React, TypeScript e muito café ☕
