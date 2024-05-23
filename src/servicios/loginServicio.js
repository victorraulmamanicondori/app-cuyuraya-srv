import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import usuarioRepositorio from '../repositorios/usuarioRepositorio.js';

class LoginServicio {

  async login(dni, clave) {
    const usuario = await usuarioRepositorio.obtenerUsuarioPorDni(dni);

    if (!usuario) {
      // Si no se encuentra el usuario, devolver un error de autenticación
      throw new Error('Credenciales incorrectos');
    }

    // Verificar la contraseña utilizando bcrypt
    const contrasenaValida = await bcrypt.compare(clave, usuario.clave);

    if (!contrasenaValida) {
      // Si la contraseña no coincide, devolver un error de autenticación
      throw new Error('Credenciales incorrectas');
    }

    // Datos para generar token de acceso
    const secreto = process.env.SECRETO_ACCESS_TOKEN || 'eas';
    const tiempoExpiracion = process.env.TIEMPO_EXPIRA_ACCESS_TOKEN || '30m';

    // Datos para generar token de refresco
    const secretoRefresh = process.env.SECRETO_REFRESH_TOKEN || 'senati';
    const tiempoExpiracionRefresh = process.env.TIEMPO_EXPIRA_REFRESH_TOKEN || '1d';

    console.log('Login:secretoAccessToken:', secreto);

    // Generacion de tokens
    const accessToken = jwt.sign({ usuario: dni }, secreto, { expiresIn: tiempoExpiracion });
    const refreshToken = jwt.sign({ usuario: dni }, secretoRefresh, { expiresIn: tiempoExpiracionRefresh });

    // Devolver token acceso y refresco al cliente
    return { accessToken, refreshToken };
  }

  // Ruta para manejar las solicitudes de renovación de token
  refreshToken(refreshToken) {
    // Recibimos de la peticion (request) el token de refresco
    let accessToken = '';

    // Datos para generar token de acceso
    const secreto = process.env.SECRETO_ACCESS_TOKEN || 'eas';
    const tiempoExpiracion = process.env.TIEMPO_EXPIRA_ACCESS_TOKEN || '30m';

    // Datos para generar token de refresco
    const secretoRefresh = process.env.SECRETO_REFRESH_TOKEN || 'senati';
    const tiempoExpiracionRefresh = process.env.TIEMPO_EXPIRA_REFRESH_TOKEN || '1d';

    // Verificar si el token de actualización es válido con el secreto configurado
    jwt.verify(refreshToken, secretoRefresh, (error, decoded) => {
      if (error) {
        throw new Error('Token de actualización no válido');
      }

      // Generar un nuevo token de acceso con el secreto configurado
      accessToken = jwt.sign({ usuario: decoded.usuario }, secreto, { expiresIn: tiempoExpiracion });
      refreshToken = jwt.sign({ usuario: decoded.usuario }, secretoRefresh, { expiresIn: tiempoExpiracionRefresh });
    });

    // Devolver el nuevo token de acceso y refresco en la respuesta (response)
    return { accessToken, refreshToken };
  }

}

export default new LoginServicio(); 

