![](https://i.imgur.com/xG74tOh.png)

# Desafio Módulo 5 - Backend

Link do deploy da API: https://smoggy-bass-spacesuit.cyclic.app/

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
// HTTP Status 201
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

Em caso de sucesso, não será enviado conteúdo no body da resposta.

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

<details>
<summary>2ª Sprint</summary>
<br>

<details>
<summary><b>Banco de Dados</b></summary>
<br>

Crie as seguintes tabelas e colunas abaixo:

**ATENÇÃO! Os nomes das tabelas e das colunas a serem criados devem seguir exatamente os nomes listados abaixo.**

- produtos
  - id
  - descricao
  - quantidade_estoque
  - valor
  - categoria_id
- clientes
  - id
  - nome
  - email (campo único)
  - cpf (campo único)
  - cep
  - rua
  - numero
  - bairro
  - cidade
  - estado

</details>

---

## **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, deverão exigir o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade será necessário validar o token informado.

---

<details>
<summary><b>Cadastrar Produto</b></summary>

#### `POST` `/produto`

Essa é a rota que permite o usuário logado cadastrar um novo produto no sistema.

### Requisição

Sem parâmetros de rota ou de query. O body da requisição deverá possuir um objeto com as propriedades: descricao, quantidade_estoque, valor e categoria_id. Também pode possuir a propriedade opcional produto_imagem com o arquivo de imagem do produto.

```javascript
{
    "descricao": "Arroz",
    "quantidade_estoque": 5,
	"valor": 2000,
	"categoria_id": 4
}
```

### Critérios de aceite:

    -   Validar os campos obrigatórios:
        -   descricao
        -   quantidade_estoque
        -   valor
        -   categoria_id
    -   A categoria informada na qual o produto será vinculado deverá existir.

### Resposta

Em caso de sucesso, serão enviados no body da resposta todos os dados do produto cadastrado. Se foi enviado na requisição uma imagem do produto, também será retornado o link do upload da imagem.

```javascript
// HTTP Status 201
{
	"id": 1,
	"descricao": "Arroz",
	"quantidade_estoque": 5,
	"valor": 2000,
	"categoria_id": 4,
    "produto_imagem": null
}
```

Em caso de falha na validação, o body da resposta será um objeto com uma propriedade mensagem que possui como valor um texto explicando o motivo da falha.

```javascript
// HTTP Status 400
{
	"mensagem": "O campo descricao é obrigatório."
}
```

```javascript
// HTTP Status 400
{
	"mensagem": "O campo quantidade_estoque deve ser um número inteiro."
}
```

```javascript
// HTTP Status 404
{
	"mensagem": "A categoria_id informada não foi encontrada."
}
```

</details>

<details>
<summary><b>Editar dados do produto</b></summary>

#### `PUT` `/produto/:id`

Essa é a rota que permite o usuário logado a atualizar as informações de um produto cadastrado.

### Requisição

Sem parâmetros do tipo query. O id do produto é enviado como parâmetro na rota. O body da requisição deverá possuir um objeto com as propriedades: descricao, quantidade_estoque, valor e categoria_id. Também pode possuir a propriedade opcional produto_imagem com o arquivo de imagem do produto.

```javascript
{
    "descricao": "Arroz",
    "quantidade_estoque": 5,
	"valor": 2000,
	"categoria_id": 4
}
```

### Critérios de aceite:

    -   Validar se existe produto para o id enviado como parâmetro na rota.
    -   Validar os campos obrigatórios:
        -   descricao
        -   quantidade_estoque
        -   valor
        -   categoria_id
    -   A categoria informada na qual o produto será vinculado deverá existir.

### Resposta

Em caso de sucesso, não será enviado conteúdo no body da resposta.

```javascript
// HTTP Status 204
```

Em caso de falha na validação, o body da resposta será um objeto com uma propriedade mensagem que possui como valor um texto explicando o motivo da falha.

```javascript
// HTTP Status 404
{
	"mensagem": "Produto não encontrado."
}
```

```javascript
// HTTP Status 400
{
	"mensagem": "O campo valor não pode ser um número negativo."
}
```

</details>

<details>
<summary><b>Listar Produtos</b></summary>

#### `GET` `/produto`

Essa é a rota que será chamada quando o usuário logado quiser listar todos os produtos cadastrados.

Deveremos incluir um parâmetro do tipo query **categoria_id** para que seja possível consultar produtos por categorias, de modo, que serão filtrados de acordo com o id de uma categoria.

### Requisição

Sem parâmetros de rota e sem conteúdo no body na requisição. Pode ser passado um parâmetro do tipo query **categoria_id**. 

### Critérios de aceite:

    - Caso seja enviado o parâmetro do tipo query categoria_id, filtrar os produtos de acordo com a categoria, caso o id de categoria informada exista.
    - Caso não seja informado o parâmetro do tipo query categoria_id todos os produtos cadastrados deverão ser retornados.

### Resposta

Em caso de sucesso, serão enviados no body da resposta os produtos cadastrados.

```javascript
// HTTP Status 200
[
    {
	    "id": 1,
	    "descricao": "Arroz",
	    "quantidade_estoque": 5,
	    "valor": 2000,
	    "categoria_id": 4
    },
    {
        "id": 2,
	    "descricao": "Blusa azul",
	    "quantidade_estoque": 12,
	    "valor": 5890,
	    "categoria_id": 7
    }
]
```

Caso seja enviado como parâmetro do tipo query um id de categoria que não existe, será enviada uma mensagem de erro.

```javascript
// HTTP Status 404
{
    "mensagem": "O id de categoria informado não existe."
}
```

</details>

<details>
<summary><b>Detalhar Produto</b></summary>

#### `GET` `/produto/:id`

Essa é a rota que permite o usuário logado obter um de seus produtos cadastrados.

### Requisição

Sem parâmetros do tipo query e sem conteúdo no body da requisição. O id do produto é enviado como parâmetro na rota.

### Critérios de aceite:

    -   Validar se existe produto para o id enviado como parâmetro na rota.

### Resposta

Em caso de sucesso, serão enviados no body da resposta todos os dados do produto cadastrado.

```javascript
// HTTP Status 200
{
	"id": 1,
	"descricao": "Arroz",
	"quantidade_estoque": 5,
	"valor": 2000,
	"categoria_id": 4
}
```

Em caso de falha na validação, o body da resposta será um objeto com uma propriedade mensagem que possui como valor um texto explicando o motivo da falha.

```javascript
// HTTP Status 404
{
	"mensagem": "Produto não encontrado."
}
```

</details>

<details>
<summary><b>Excluir Produto por ID</b></summary>

#### `DELETE` `/produto/:id`

Essa é a rota que será chamada quando o usuário logado quiser excluir um de seus produtos cadastrados.

### Requisição

Sem parâmetros do tipo query e sem conteúdo no body da requisição. O id do produto é enviado como parâmetro na rota.

### Critérios de aceite:

    -   Validar se existe produto para o id enviado como parâmetro na rota.

### Resposta

Em caso de sucesso, não será enviada mensagem no body da resposta.

```javascript
// HTTP Status 204
```

Em caso de falha na validação, o body da resposta será um objeto com uma propriedade mensagem que possui como valor um texto explicando o motivo da falha.

```javascript
// HTTP Status 404
{
	"mensagem": "Produto não encontrado."
}
```

</details>

<details>
<summary><b>Cadastrar Cliente</b></summary>

#### `POST` `/cliente`

Essa é a rota que permite usuário logado cadastrar um novo cliente no sistema.

### Requisição

Sem parâmetros de rota ou de query. O body da requisição deverá possuir um objeto com as propriedades obrigatórias: nome, email e cpf. Também poderá conter as propriedades opcionais: cep, rua, numero, bairro, cidade e estado. Os dados do cep e do cpf serão aceitos com ou sem os caracteres especiais . e -.

```javascript
{
	"nome": "João",
	"email": "joao@email.com.br",
	"cpf": "927.973.370-26",
	"cep": "31.270-901",
	"rua": "Avenida Presidente Antônio Carlos"
}
```

### Critérios de aceite:

    -   Validar os campos obrigatórios:
        -   nome
        -   email
        -   cpf
    -   O campo e-mail no banco de dados deve ser único para cada registro, não permitindo dois clientes possuírem o mesmo e-mail.
    -   O campo cpf no banco de dados deve ser único para cada registro, não permitindo dois clientes possuírem o mesmo cpf.

### Resposta

Em caso de sucesso, serão enviados no body da resposta todos os dados do cliente cadastrado. Caso o cliente tenha passado o cep, mas não tenha informado todas as outras informações do endereço, esses dados faltantes serão preenchidos de acordo com o cep informado. 

```javascript
// HTTP Status 201
{
	"id": 10,
	"nome": "João",
	"email": "joao@email.com.br",
	"cpf": "005.844.300-27",
	"cep": "31.270-901",
	"rua": "Avenida Presidente Antônio Carlos",
	"numero": null,
	"bairro": "Pampulha",
	"cidade": "Belo Horizonte",
	"estado": "MG"
}
```

Em caso de falha na validação, o body da resposta será um objeto com uma propriedade mensagem que possui como valor um texto explicando o motivo da falha. Será feita a validação do cpf e do cep (caso seja informado) e só será permitido o cadastro de cpf e cep válidos.

```javascript
// HTTP Status 400
{
	"mensagem": "O campo email é obrigatório."
}
```

```javascript
// HTTP Status 400
{
	"mensagem": "CPF inválido."
}
```

```javascript
// HTTP Status 400
{
	"mensagem": "Já existe cliente cadastrado com o e-mail informado."
}
```

</details>

<details>
<summary><b>Editar dados do cliente</b></summary>

#### `PUT` `/cliente/:id`

Essa é a rota que permite o usuário realizar atualização de um cliente cadastrado.

### Requisição

Sem parâmetros do tipo query. O id do usuário deverá ser passado como parâmetro de rota. O body da requisição deverá possuir um objeto com as propriedades obrigatórias: nome, email e cpf. Também poderá conter as propriedades opcionais: cep, rua, numero, bairro, cidade e estado. Os dados do cep e do cpf serão aceitos com ou sem os caracteres especiais . e -.

```javascript
{
	"nome": "João",
	"email": "joao@email.com.br",
	"cpf": "005.844.300-27",
	"cep": "31.270-901",
	"rua": "Avenida Presidente Antônio Carlos",
	"numero": "6627",
	"bairro": "Pampulha",
	"cidade": "Belo Horizonte",
	"estado": "MG"
}
```

### Critérios de aceite:

    -   Validar se existe cliente para o id enviado como parâmetro na rota.
    -   Validar os campos obrigatórios:
        -   nome
        -   email
        -   cpf
    -   O campo e-mail no banco de dados deve ser único para cada registro, não permitindo dois clientes possuírem o mesmo e-mail.
    -   O campo cpf no banco de dados deve ser único para cada registro, não permitindo dois clientes possuírem o mesmo cpf.

### Resposta

Em caso de sucesso, não será enviado conteúdo no body da resposta.

```javascript
// HTTP Status 204
```

Em caso de falha na validação, o body da resposta será um objeto com uma propriedade mensagem que possui como valor um texto explicando o motivo da falha. Será feita a validação do cpf e do cep (caso seja informado) e só será permitido o cadastro de cpf e cep válidos.

```javascript
// HTTP Status 400
{
	"mensagem": "Já existe outro cliente cadastrado com o cpf informado."
}
```

```javascript
// HTTP Status 400
{
	"mensagem": "CEP inválido."
}
```

</details>

<details>
<summary><b>Listar Clientes</b></summary>

#### `GET` `/cliente`

Essa é a rota que será chamada quando o usuário logado quiser listar todos os clientes cadastrados.

### Requisição

Sem parâmetros de rota e de query e sem conteúdo no body na requisição. 

### Resposta

Em caso de sucesso, serão enviados no body da resposta todos os clientes cadastrados.

```javascript
// HTTP Status 200
[
    {
		"id": 1,
		"nome": "Rebeca",
		"email": "beca@email.com",
		"cpf": "409.494.660-85",
		"cep": null,
		"rua": null,
		"numero": null,
		"bairro": null,
		"cidade": null,
		"estado": null
	},
	{
		"id": 2,
		"nome": "Maria",
		"email": "maria@gmail.com",
		"cpf": "053.006.280-18",
		"cep": "68909-829",
		"rua": "rua 01",
		"numero": "10",
		"bairro": "Novo Horizonte",
		"cidade": "Macapá",
		"estado": "AP"
	}
]
```

</details>

<details>
<summary><b>Detalhar Cliente</b></summary>

#### `GET` `/cliente/:id`

Essa é a rota que será chamada quando o usuário logado quiser obter um de seus clientes cadastrados.

### Requisição

Sem parâmetros do tipo query e sem conteúdo no body na requisição. O id do cliente será passado como parâmetro de rota. 

### Critérios de aceite:

    -   Validar se existe cliente para o id enviado como parâmetro na rota.

### Resposta

Em caso de sucesso, serão enviados no body da resposta todos os dados do cliente.

```javascript
// HTTP Status 200
{
	"id": 2,
	"nome": "Maria",
	"email": "maria@gmail.com",
	"cpf": "053.006.280-18",
	"cep": "68909-829",
	"rua": "rua 01",
	"numero": "10",
	"bairro": "Novo Horizonte",
	"cidade": "Macapá",
	"estado": "AP"
}
```

Em caso de falha na validação, o body da resposta será um objeto com uma propriedade mensagem que possui como valor um texto explicando o motivo da falha.

```javascript
// HTTP Status 404
{
	"mensagem": "Cliente não encontrado."
}
```

</details>

</details>

---

<details>
<summary>3ª Sprint</summary>
<br>

<details>
<summary><b>Banco de Dados</b></summary>
<br>

Crie as seguintes tabelas e colunas abaixo: 

**ATENÇÃO! Os nomes das tabelas e das colunas a serem criados devem seguir exatamente os nomes listados abaixo.**

-   pedidos
    -   id
    -   cliente_id
    -   observacao
    -   valor_total
-   pedido_produtos
    -   id
    -   pedido_id
    -   produto_id
    -   quantidade_produto
    -   valor_produto
-   produtos
    -   produto_imagem
</details>

---

## **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, deverão exigir o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade será necessário validar o token informado.

---

<details>
<summary><b>Cadastrar Pedido</b></summary>

#### `POST` `/pedido`

Essa é a rota que será utilizada para cadastrar um novo pedido no sistema.

### Requisição

**Lembre-se:** Cada pedido deverá conter ao menos um produto vinculado.

**Atenção:** As propriedades produto_id e quantidade_produto devem ser informadas dentro de um array e para cada produto deverá ser criado um objeto neste array, como ilustrado no objeto de requisição abaixo.
Só deverá ser cadastrado o pedido caso todos produtos vinculados ao pedido realmente existão no banco de dados.

```javascript
// Corpo da requisição para cadastro de pedido (body)
{
    "cliente_id": 1,
    "observacao": "Em caso de ausência recomendo deixar com algum vizinho",
    "pedido_produtos": [
        {
            "produto_id": 1,
            "quantidade_produto": 10
        },
        {
            "produto_id": 2,
            "quantidade_produto": 20
        }
    ]
}
```

### Critérios de aceite:

    -   Validar os campos obrigatórios:
        -   cliente_id
        -   pedido_produtos
            -   produto_id
            -   quantidade_produto
    -   Validar se existe cliente para o id enviado no corpo (body) da requisição.
    -   Validar se existe produto para cada produto_id informado dentro do array enviado no corpo (body) da requisição.
    -   Validar se existe a quantidade em estoque de cada produto existente dentro do array, de acordo com a quantidade informada no corpo (body) da requisição.
    -   O pedido deverá ser cadastrado, apenas, se todos os produtos estiverem validados. 
    -   Enviar e-mail para o cliente notificando que o pedido foi efetuado com sucesso.   

### Resposta

Em caso de sucesso, serão enviados no body da resposta os dados do pedido. Também será enviada uma mensagem para o email cadastrado do cliente. 

```javascript
// HTTP Status 201
{
	"id": 24,
	"cliente_id": 3,
	"observacao": null,
	"valor_total": 14618
}
```

Em caso de falha na validação, o body da resposta será um objeto com uma propriedade mensagem que possui como valor um texto explicando o motivo da falha. 

```javascript
// HTTP Status 404
{
	"mensagem": "Não foi encontrado o produto de id 87."
}
```

```javascript
// HTTP Status 400
{
	"mensagem": "O produto de id 3 não possui estoque suficiente."
}
```

</details>

<details>
<summary><b>Listar Pedidos</b></summary>

#### `GET` `/pedido`

Essa é a rota que será chamada quando o usuário logado quiser listar todos os pedidos cadastrados.

Deveremos incluir um parâmetro do tipo query **cliente_id** para que seja possível consultar pedidos por clientes, de modo, que serão filtrados de acordo com o id de um cliente.

### Requisição

Sem parâmetros de rota e sem conteúdo no body na requisição. Pode ser passado um parâmetro do tipo query **cliente_id**. 

### Critérios de aceite:

    - Caso seja enviado o parâmetro do tipo query **cliente_id**, filtrar os pedidos de acordo com o cliente, caso o id do cliente informado exista.
    - Caso não seja informado o parâmetro do tipo query **cliente_id** todos os pedidos cadastrados deverão ser retornados.

### Resposta

Em caso de sucesso, serão enviados no body da resposta os pedidos cadastrados.

```javascript
// Resposta para listagem de pedido (body)
[
    {
        "pedido": {
            "id": 1,
            "valor_total": 230010,
            "observacao": null,
            "cliente_id": 1
        },
        "pedido_produtos": [
            {
                "id": 1,
                "quantidade_produto": 1,
                "valor_produto": 10,
                "pedido_id": 1,
                "produto_id": 1
            },
            {
                "id": 2,
                "quantidade_produto": 2,
                "valor_produto": 230000,
                "pedido_id": 1,
                "produto_id": 2
            }
        ]
    }
]
```

Caso seja enviado como parâmetro do tipo query um id de cliente que não existe, será enviada uma mensagem de erro.

```javascript
// HTTP Status 404
{
    "mensagem": "O id de cliente informado não existe."
}
```

</details>

<details>
<summary><b>Aplicar validação na exclusão de produto</b></summary>
<br>

Deverá ser aplicada uma regra de negócio que não permitirá exclusão de produto que tenha sido registrado em algum pedido.

Critérios de aceite:

    - Validar se o produto que está sendo excluído não está vinculado a nenhum pedido, caso estiver, não poderá ser excluído e deverá ser retornada uma mensagem indicando o motivo.

</details>

<details>
<summary><b>Aprimorar cadastro/atualização de produto</b></summary>
<br>

Deverão ser aprimorados o cadastro e a atualização de produto para permitir vincular uma imagem a um produto. 
Deverá ser criada uma coluna `produto_imagem` para que seja possível efetuar o vínculo entre a imagem e o produto.

Critérios de aceite:
    
    - O campo `produto_imagem` deve ser opcional, mas, em caso de ser enviado no corpo da requisição deveremos processar a imagem vinculada a essa propriedade e armazenar a imagem em um servidor de armazenamento (Supabase, Blackblaze, etc...)
    - Armazenar na coluna `produto_imagem` a URL que possibilita visualizar a imagem que foi efetuada upload para o servidor de armazenamento.

**Lembre-se:** A URL retornada deve ser válida, ou seja, ao ser clicada deve possibilitar visualizar a imagem que foi feito upload.

**ATENÇÃO:** Abaixo segue o exemplo de uma URL fictícia, mas que no caso, ilustra o que o serviço de armazenamento do Blackblaze retornaria após upload efetuado com sucesso, portanto essa seria no caso a URL que armazaremos na coluna `produto_imagem` no banco de dados.

```javascript
// Resposta cadastro/atualização de produto (body)
{
    "descricao": "Motorola moto g9 plus",
    "quantidade_estoque": 100,
    "valor": 15000,
    "categoria_id": 2,
    "produto_imagem": "https://s3.us-east-005.backblazeb2.com/desafio-final.jpg"
}
```

</details>

<details>
<summary><b>Aprimorar exclusão de produto</b></summary>
<br>

Deverá ser aprimorada a exclusão de produto para que quando o produto for excluído também seja removida a imagem vinculada a ele na servidor de armazenamento.

Critérios de aceite:

    - Na exclusão do produto a imagem vinculada a este produto deverá ser excluída do servidor de armazenamento.
    
</details>

</details>

---

###### tags: `back-end` `módulo 5` `nodeJS` `PostgreSQL` `API REST` `desafio`
