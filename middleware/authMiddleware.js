const jwt = require('jsonwebtoken');

// Middleware para verificar el token de autenticación almacenado en la cookie
function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Token de autenticación no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Token de autenticación inválido' });
  }
}

// Middleware para requerir un rol específico
function requireRole(role) {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (userRole !== role) {
      return res.status(403).json({ error: 'Acceso no autorizado' });
    }

    next();
  };
}

module.exports = { verifyToken, requireRole };