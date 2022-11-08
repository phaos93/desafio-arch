# Desafio Arch - Desenvolvedor Back-end Jr.

Desafio técnico para vaga de Desenvolvedor NodeJs Jr

- O projeto foi feito utilizando JavaScript com banco de dados PostgresSQL.

## Pacotes instalados para realização do desafio:

- Express;Cors;dotenv;jsonwebtoken;knex;pg;secure-password;nodemon(devDependencies).

<div style="display: inline_block"><br>
<img align="center" alt="Phaos-javascript" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg">
  <img align="center" alt="Phaos-postgressql" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" />
  <img align="center" alt="Phaos-nodejs" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
  <img align="center" alt="Phaos-express" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" />
</div>

## Banco de dados.

- O banco de dados escolhido para realizar esse projeto foi o PostgresSQL.
- É necessário criar o banco de dados e as tabelas antes de utilizar as API's.
- Para testes, eu criei o banco de dados e as tabelas utilizando o software 'Beekeeper Studio' que pode ser encontrado e baixado nesse link -> https://www.beekeeperstudio.io/ .
- Foi utilizado o dotenv para proteger as informações relacionadas ao banco de dados.
- É necessário configurar as variaveis de ambiente antes de utilizar as API's criando um arquivo .env e preencher esse arquivo usando como modelo o .env.exemple presente nas pastas da API's.

## Testando o funcionamento.

- Fiz todos os testes utilizando o software "Insomnia" -> link para download (https://insomnia.rest/download)

- Para que os testes possam ser feitos, é necessário criar um banco de dados postgresSQL e preencher um arquivo .env nas pastas das duas API's. Nas pastas das API's já existe um arquivo chamado .env.exemple com o modelo de todas as variaveis de ambientes que precisam ser preenchidas com informaçoes do banco de dados local e também um segredo para criação do token no momento da autenticação.

## API - transacao-api

- Para criar um novo usuario é necessário utilizar a rota '/users' com verbo HTTP POST e enviar um body.json como o do exemplo abaixo:

```bash
{
	"nome": "exemplo",
	"email": "exemplo@examplo.com",
	"senha": "exemplo123"
}
```

- Para fazer o login e gerar um token de autenticação é necessário utilizar a rota '/login' com verbo HTTP POST e enviar um body.json como o do exemplo abaixo:

```bash
{
	"email": "exemplo@examplo.com",
	"senha": "exemplo123"
}
```

- Para atualizar um usuario existente é necessário estar logado, ou seja, é necessário preencher o Bearer Token com um token que será gerado após o login. Após preencher o Bearer Token, é preciso utilizar a rota '/users' com verbo HTTP PUT e enviar um body.json como o do exemplo abaixo, todos os campos nesse caso são opcionais:

```bash
{
	"nome": "exemplo",
	"email": "exemplo@examplo.com",
	"senha": "exemplo123"
}
```

- Para efetuar uma transação é necessário estar logado, ou seja, é necessário preencher o Bearer Token com um token que será gerado após o login. Após preencher o Bearer Token, é preciso utilizar a rota '/transactions' com o verbo HTTP POST e enviar um body.json como o do exemplo abaixo:

```bash
{
	"valor": 1000,
	"descricao": "exemplo salário",
	"tipo": "entrada"
}
```

Obs: O campo 'tipo' deve ser preenchido com as palavras 'entrada' ou 'saida' caso seja escrito algo diferente disso, um erro acontecerá. A data da transação é registrada automaticamente como a data atual.

## API - saldo-api

- A api 'saldo-api' só irá mostrar o saldo do usuário, calculando todas as transações de entrada e saída. Para verificar o saldo do usuário, é necessário estar logado, ou seja, é necessário preencher o Bearer Token com um token que será gerado após o login(utilizando a transacao-api). Após preencher o Bearer Token, é preciso usar a rota '/balance' com o verbo HTTP GET, dessa forma será calculado o saldo do usuário logado.

# Obrigado!
