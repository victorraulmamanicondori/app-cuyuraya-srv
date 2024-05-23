import jwt from 'jsonwebtoken';
import logger from '../config/logger.js';

// Middleware de autenticación
function verificarToken(request, response, next) {
  const token = request.headers.authorization;
  let mensaje = ''

  // Verificar si se proporcionó un token en los encabezados de autorización
  if (!token) {
    mensaje = `Token de autorización no proporcionado: ${token}`;
    logger.error(mensaje);

    return response.status(401).json({
      error: true,
      mensaje: 'Inicie sesion para realizar operaciones'
    });
  }

  // Verificar y decodificar el token JWT
  jwt.verify(token, process.env.SECRETO_ACCESS_TOKEN, (error, decoded) => {
    if (error) {
      console.log('process.env.SECRETO_ACCESS_TOKEN:', process.env.SECRETO_ACCESS_TOKEN);
      mensaje = `Token de autorización inválido: ${token}`

      return response.status(401).json({
        error: true,
        mensaje: 'Sesion expirado, vuelva iniciar sesion para realizar operaciones'
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
