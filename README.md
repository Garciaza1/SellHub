# SellHub
SellHub é um projeto de e-commerce desenvolvido com Next.js no front-end e Node.js no back-end. Este projeto visa fornecer uma plataforma para vendas online, com um dashboard para acompanhamento de vendas.


# Tecnologias Utilizadas
- **frontend:** Next.js, TypeScript
- **Back-End:** Node.js, JavaScript
- **Banco de Dados:** MySQL-2
- **Desenvolvimento:** Nodemon


# Funcionalidades
- Criação e gerenciamento de produtos
- Controle de acesso de usuários
- Sessões e tokens de encriptação
- Dashboard para monitoramento de vendas
- Estrutura MVC
- Programação Orientada a Objetos
- Requisitos
- Node.js
- MySQL
- NPM ou Yarn


## Instalação

Clone o repositório:
```bash
git clone https://github.com/Garciaza1/SellHub.git
```

Navegue até o diretório do projeto:
```bash
cd SellHub
```

Instale as dependências do front-end:
```bash
cd frontend
npm install
```

Instale as dependências do back-end:
```bash
cd ../backend
npm install
```


#Configuração

Crie um arquivo .env no diretório backend com as seguintes variáveis de ambiente:
```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=sellhub
```
Execute o servidor MySQL e crie o banco de dados:
```sql
CREATE DATABASE sellhub;
```

Inicie o servidor back-end:
```bash
cd backend
npm run dev
```
Inicie o servidor front-end:
```bash
cd ../frontend
npm run dev
```
Abra o navegador e acesse http://localhost:3000.


# Estrutura do Projeto

**frontend:** Contém o código do front-end desenvolvido com Next.js e TypeScript.
**backend:** Contém o código do back-end desenvolvido com Node.js e JavaScript.


#Contribuição
Se você quiser contribuir com este projeto, siga estas etapas:

- 1 - De Fork neste repositório.
- 2 - Crie uma branch com a nova feature (git checkout -b feature/nova-feature).
- 3 - Commit as mudanças (git commit -m 'Adiciona nova feature').
- 4 - Push a branch (git push origin feature/nova-feature).
- 5 - Abra um Pull Request.


#Licença
Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

#Contato
Gustavo Ribeiro Garcia - [LinkedIn](https://www.linkedin.com/in/gustavo-garcia-287356232/) - gustavogarcia56336@gmail.com
