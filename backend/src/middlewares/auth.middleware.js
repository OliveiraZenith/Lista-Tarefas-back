import { verifyToken } from "../utils/jwt.js";

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não informado" });
  }

  const token = header.slice(7);

  try {
    const decoded = verifyToken(token);
    const id = Number(decoded.sub);
    if (!Number.isInteger(id)) {
      return res.status(401).json({ message: "Token inválido" });
    }
    req.userId = id;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}
