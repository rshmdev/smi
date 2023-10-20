
# Teste tecnico SMI

Crud full stack utlizando next.js com redux e Mui no frontend e para o backend foi utlizado node.js + express, para armazenamento optei por sqlite

## Instalação

Clone o repositorio
```bash
git clone https://github.com/rshmdev/smi.git
```


Para rodar o projeto com docker será necessario docker instalado em sua maquina

Iniciando o container


## Iniciando o container

Rode o comando na raiz do projeto

```bash
 docker-compose up --build
```



## 

O projeto (front-end) estará rodando na porta 3000

http://localhost:3000

## Documentação da API

#### Retorna todas as demandas

```http
  GET /v1/demands
```


#### Retorna um item

```http
  GET /v1/demands/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Editar um item

```http
  PUT /v1/demands/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer editar |

#### Remover um item


```http
  DELETE /v1/demands/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer editar |




## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/rshmdev/smi.git
```

Entre no diretório do projeto

```bash
  cd smi
```

### Backend

Entre no diretório do backend 

```bash
  cd backend
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm start
```

### Frontend

Entre no diretório do frontend 

```bash
  cd front
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

