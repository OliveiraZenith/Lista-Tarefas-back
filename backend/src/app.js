import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "API da lista de tarefas funcionando" });
});

app.get("/v1", (_req, res) => {
  const chamada_em = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });

  res.json({
    message: "Api v1 respondendo no container docker...",
    chamada_em,
  });
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.use((err, _req, res, _next) => {
  const status = err.statusCode || 500;
  const message =
    status === 500 ? "Erro interno do servidor" : err.message;
  if (status === 500) {
    console.error(err);
  }
  res.status(status).json({ message });
});

export default app;
