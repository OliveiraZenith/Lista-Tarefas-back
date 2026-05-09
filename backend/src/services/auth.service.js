import bcrypt from "bcryptjs";
import { prisma } from "../prisma/client.js";
import { signToken } from "../utils/jwt.js";

const SALT_ROUNDS = 10;

export async function registerUser({ name, email, password }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    const err = new Error("E-mail já cadastrado");
    err.statusCode = 409;
    throw err;
  }

  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: { name, email, password: hash },
    select: { id: true, name: true, email: true, createdAt: true },
  });

  const token = signToken({ sub: user.id });
  return { user, token };
}

export async function loginUser({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    const err = new Error("E-mail ou senha incorretos");
    err.statusCode = 401;
    throw err;
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    const err = new Error("E-mail ou senha incorretos");
    err.statusCode = 401;
    throw err;
  }

  const token = signToken({ sub: user.id });
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    token,
  };
}
