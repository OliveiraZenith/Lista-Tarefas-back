import "dotenv/config";
import app from "./src/app.js";

// define a porta da aplicação
// primeiro tenta usar a porta definida pelo ambiente
// se não existir, usa a porta 5000
const port = process.env.PORT || 5000

// inicia o servidor na porta definida
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})