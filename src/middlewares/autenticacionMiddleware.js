import jwt from 'jsonwebtoken';

// Middleware de autenticación
function verificarToken(request, response, next) {
  const token = request.headers.authorization;

  // Verificar si se proporcionó un token en los encabezados de autorización
  if (!token) {
    return response.status(401).json({
      error: 'Token de autorización no proporcionado'
    });
  }

  // Verificar y decodificar el token JWT
  jwt.verify(token, process.env.SECRETO_ACCESS_TOKEN, (error, decoded) => {
    if (error) {
      return response.status(401).json({
        error: 'Token de autorización inválido'
      });
    }

    // Almacenar los datos decodificados del token en el objeto de solicitud para su posterior uso
    request.usuario = decoded.usuario;
    next();
  });
}

export {
  verificarToken
}
