/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

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

  const secreto = process.env.SECRETO_ACCESS_TOKEN || 'eas';

  // Verificar y decodificar el token JWT
  jwt.verify(token, secreto, (error, decoded) => {
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
