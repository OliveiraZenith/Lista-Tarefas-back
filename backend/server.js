import "dotenv/config";
import app from "./src/app.js";

// importa o express, que será usado para criar a api
const express = require("express")

// importa o cors, que permite chamadas entre front-end e back-end
const cors = require("cors")

// cria a aplicação express
const app = express()

// define a porta da aplicação
// primeiro tenta usar a porta definida pelo ambiente
// se não existir, usa a porta 5000
const port = process.env.PORT || 5000

// configuração do cors da api
// o cors define quais origens podem acessar o back-end pelo navegador
const corsOptions = {
  // lista de endereços autorizados a consumir a api
  // a primeira origem é o front-end publicado na vercel
  // a segunda origem deve ser substituída pela url real do front-end aberto no codespaces
  origin: [
    "https://url-front-vercel.app",
    "https://sua-url-do-codespace-8080.app.github.dev"
  ],

  // métodos http permitidos nas requisições para a api
  // get: buscar dados
  // post: cadastrar dados
  // put: atualizar dados
  // delete: remover dados
  methods: "GET,POST,PUT,DELETE",

  // cabeçalhos permitidos nas requisições
  // content-type permite informar o tipo de conteúdo enviado, como json
  // authorization é usado quando a api trabalha com token ou autenticação
  allowedHeaders: "Content-Type,Authorization",
}

// aplica as regras de cors definidas acima em todas as rotas da api
app.use(cors(corsOptions))

// rota principal da api
app.get("/", (req, res) => {
  res.json({
    message: "Api em execucao no container docker..."
  })
})

// rota v1
app.get("/v1", (req, res) => {
  // cria uma data com o momento atual da chamada da rota
  // o timezone america/sao_paulo ajusta a data e hora para o horário de brasília
  const datahora = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo"
  })

  // retorna uma resposta em formato json
  res.json({
    message: "Api v1 respondendo no container docker...",
    chamada_em: datahora
  })
})

// inicia o servidor na porta definida
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})