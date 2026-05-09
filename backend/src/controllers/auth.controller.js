import * as authService from "../services/auth.service.js";

const MIN_PASSWORD_LENGTH = 7;

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Informe name, email e password",
      });
    }

    if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({
        message: `A senha deve ter no mínimo ${MIN_PASSWORD_LENGTH} caracteres`,
      });
    }

    const result = await authService.registerUser({
      name,
      email,
      password,
    });
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Informe email e password",
      });
    }

    const result = await authService.loginUser({ email, password });
    return res.json(result);
  } catch (err) {
    next(err);
  }
}
