![](https://i.imgur.com/xG74tOh.png)

# Desafio Módulo 5 - Backend

## Equipe 22 - Code Fusion

- Luana da Silva de Souza
- Natália Barreto Simedo
- Rebeca Barbosa Nunes da Silva

## Descrição do desafio

Seja bem vindo(a) ao desafio do módulo 5.

Sua tarefa como desenvolvedor(a) será criar uma API para um PDV (Frente de Caixa). Esse será um projeto piloto, ou seja, no futuro outras funcionalidades serão implementadas.

**Importante 1: Sempre que a validação de uma requisição falhar, responda com código de erro e mensagem adequada à situação, ok?**

**Importante 2: Para endpoints de cadastro/atualização os objetos de requisição devem conter as propriedades equivalentes as colunas das tabelas.**

**Exemplo:**

```javascript
// Corpo da requisição para cadastro de usuário (body)
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "jose"
}
```

**ATENÇÃO: Todos os endpoints deverão atender os requisitos citados acima.**

## **Banco de dados**

Você precisa criar um Banco de Dados PostgreSQL chamado `pdv`.

**IMPORTANTE: Deverá ser criado no projeto o arquivo SQL que deverá ser o script contendo os comandos de criação das tabelas respeitando os nomes das tabelas e colunas respectivamente, além de, conter os comandos para a inserção das categorias que devem ser previamente cadastradas (estão citadas na 1ª Sprint no item Listar Categorias).**

## **Requisitos obrigatórios**

- A API a ser criada deverá acessar o banco de dados a ser criado `pdv` para persistir e manipular os dados de categorias, clientes, pedidos, produtos e usuários utilizados pela aplicação.
- O campo id das tabelas no banco de dados deve ser auto incremento, chave primária e não deve permitir edição uma vez criado.
- Qualquer valor monetário deverá ser representado em centavos (Ex.: R$ 10,00 reais = 1000)

## **Status Codes**

Abaixo, listamos os possíveis **_status codes_** esperados como resposta da API.

```javascript
// 200 (OK) = requisição bem sucedida
// 201 (Created) = requisição bem sucedida e algo foi criado
// 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
// 400 (Bad Request) = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
// 401 (Unauthorized) = o usuário não está autenticado (logado)
// 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
// 404 (Not Found) = o servidor não pode encontrar o recurso solicitado
// 500 (Internal Server Error) = erro inesperado do servidor
```

<details>
<summary>1ª Sprint</summary>
<br>

<details>
<summary><b>Banco de Dados</b></summary>
<br>

Crie as seguintes tabelas e colunas abaixo:

**ATENÇÃO! Os nomes das tabelas e das colunas a serem criados devem seguir exatamente os nomes listados abaixo.**

- usuarios
  - id
  - nome
  - email (campo único)
  - senha
- categorias
  - id
  - descricao

</details>

<details>
<summary><b>Listar categorias</b></summary>

#### `GET` `/categoria`

Essa é a rota que será chamada quando o usuário quiser listar todas as categorias cadastradas.

As categorias a seguir precisam ser previamente cadastradas para que sejam listadas no endpoint de listagem das categorias.

## **Categorias**

- Informática
- Celulares
- Beleza e Perfumaria
- Mercado
- Livros e Papelaria
- Brinquedos
- Moda
- Bebê
- Games

### Requisição

Sem parâmetros de rota ou de query. Sem conteúdo no body da requisição.

### Resposta

Em caso de sucesso, todas as categorias cadastradas serão listadas.

```javascript
// HTTP Status 200
[
    {
        "id": 1,
        "descricao": "Informática"
    },
    {
        "id": 2,
        "descricao": "Celulares"
    }
]
```

</details>

<details>
<summary><b>Cadastrar usuário</b></summary>

#### `POST` `/usuario`

Essa é a rota que será utilizada para cadastrar um novo usuário no sistema.

### Requisição

Sem parâmetros de rota ou de query. O body da requisição deverá possuir um objeto com as propriedades: nome, email e senha.

```javascript
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "123456"
}
```

### Critérios de aceite:

    - Validar os campos obrigatórios:
        - nome
        - email
        - senha
    - A senha deve ser criptografada utilizando algum algoritmo de criptografia confiável.
    - O campo e-mail no banco de dados deve ser único para cada registro, não permitindo dois usuários possuírem o mesmo e-mail.

### Resposta

Em caso de sucesso, serão enviados no body da resposta todos os dados do usuário cadastrado, exceto a senha.

```javascript
// HTTP Status 201
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

Em caso de falha na validação, o body da resposta será um objeto com uma propriedade mensagem que possui como valor um texto explicando o motivo da falha.

```javascript
// HTTP Status 400
{
    "mensagem": "O campo nome é obrigatório."
}
```

```javascript
// HTTP Status 400
{
    "mensagem": "Já existe usuário cadastrado com o e-mail informado."
}
```

</details>

<details>
<summary><b>Efetuar login do usuário</b></summary>

#### `POST` `/login`

Essa é a rota que permite o usuário cadastrado realizar o login no sistema.

### Requisição

Sem parâmetros de rota ou de query. O body da requisição deverá possuir um objeto com as propriedades: email e senha.

```javascript
{
    "email": "jose@email.com",
    "senha": "123456"
}
```

### Critérios de aceite:

    - Validar se o e-mail e a senha estão corretos para o usuário em questão.
    - Gerar um token de autenticação para o usuário.

### Resposta

Em caso de sucesso, o body da resposta terá um objeto com a propriedade propriedade usuario contendo as informações do usuário autenticado, exceto a senha, e uma outra propriendade token que possui como valor o token de autenticação gerado.

```javascript
// HTTP Status 200
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

Em caso de falha na validação, o body da resposta será um objeto com uma propriedade mensagem que possui como valor um texto explicando o motivo da falha.

```javascript
// HTTP Status 400
{
    "mensagem": "Usuário e/ou senha inválido(s)."
}
```

```javascript
// HTTP Status 400
{
    "mensagem": "O campo senha é obrigatório."
}
```

</details>

---

## **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, deverão exigir o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade será necessário validar o token informado.

---

<details>
<summary><b>Detalhar perfil do usuário logado</b></summary>

#### `GET` `/usuario`

Essa é a rota que permite o usuário logado a visualizar os dados do seu próprio perfil, de acordo com a validação do token de autenticação.

### Requisição

Sem parâmetros de rota ou de query. Sem conteúdo no body da requisição.

### Resposta

Em caso de sucesso, serão enviados no body da resposta todos os dados do usuário cadastrado, exceto a senha.

```javascript
// HTTP Status 200
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

Em caso de falha na validação, o body da resposta será um objeto com uma propriedade mensagem que possui como valor um texto explicando o motivo da falha.

```javascript
// HTTP Status 401
{
    "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado."
}
```

</details>

<details>
<summary><b>Editar perfil do usuário logado</b></summary>

#### `PUT` `/usuario`

Essa é a rota que permite o usuário logado atualizar informações de seu próprio cadastro, de acordo com a validação do token de autenticação.

### Requisição

Sem parâmetros de rota ou de query. O body da requisição deverá possuir um objeto com as propriedades: nome, email e senha.

```javascript
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "123456"
}
```

### Critérios de aceite:

    - Validar os campos obrigatórios:
        - nome
        - email
        - senha
    - A senha deve ser criptografada utilizando algum algoritmo de criptografia confiável.
    - O campo e-mail no banco de dados deve ser único para cada registro, não permitindo dois usuários possuírem o mesmo e-mail.

### Resposta

Em caso de sucesso, não deveremos enviar conteúdo no body da resposta.

```javascript
// HTTP Status 204
```

Em caso de falha na validação, o body da resposta será um objeto com uma propriedade mensagem que possui como valor um texto explicando o motivo da falha.

```javascript
// HTTP Status 400
{
    "mensagem": "O campo senha é obrigatório."
}
```

```javascript
// HTTP Status 400
{
    "mensagem": "Já existe usuário cadastrado com o e-mail informado."
}
```

</details>

<details>
<summary><b>Efetuar deploy da aplicação</b></summary>
<br>

Fazer deploy do projeto e disponibilizar a URL.

</details>

</details>

---

###### tags: `back-end` `módulo 5` `nodeJS` `PostgreSQL` `API REST` `desafio`