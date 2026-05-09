import * as authService from "../services/auth.service.js";

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Informe name, email e password",
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
