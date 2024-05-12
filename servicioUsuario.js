// Importamos archivo javascript que tiene la conexion a la base de datos
const pool = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(request, response) {
	try {
		const { dni, clave } = request.body;

		// Consultar la base de datos para obtener el usuario con el nombre proporcionado
		const conexion = await pool.getConnection();
		
		const sentencia_sql = 'SELECT clave FROM TBL_USUARIO WHERE dni = ?';
		const parametros = [dni];

		const resultados = await conexion.query(sentencia_sql, parametros);
		conexion.release();

		if (resultados.length === 0) {
			// Si no se encuentra el usuario, devolver un error de autenticación
			return response.status(401).json({ error: 'Credenciales incorrectas' });
		}

		// Verificar la contraseña utilizando bcrypt
		const usuarioEncontrado = resultados[0];
		const contrasenaValida = await bcrypt.compare(clave, usuarioEncontrado.clave);

		if (!contrasenaValida) {
			// Si la contraseña no coincide, devolver un error de autenticación
			return response.status(401).json({ error: 'Credenciales incorrectas' });
		}

		// Datos para generar token de acceso
		const secreto = process.env.SECRETO_ACCESS_TOKEN || 'eas';
		const tiempoExpiracion = process.env.TIEMPO_EXPIRA_ACCESS_TOKEN || '5m';

		// Datos para generar token de refresco
		const secretoRefresh = process.env.SECRETO_REFRESH_TOKEN || 'eas';
		const tiempoExpiracionRefresh = process.env.TIEMPO_EXPIRA_REFRESH_TOKEN || '1d';

		// Generacion de tokens
		const accessToken = jwt.sign({ usuario: usuarioEncontrado.usuario }, secreto, { expiresIn: tiempoExpiracion });
		const refreshToken = jwt.sign({ usuario: usuarioEncontrado.usuario }, secretoRefresh, { expiresIn: tiempoExpiracionRefresh });

		// Devolver el token al cliente
		return response.json({ accessToken, refreshToken });
	} catch(error) {
		console.error('Error al iniciar sesión:', error);
    	return response.status(500).json({ error: 'Error interno del servidor' });
	}
}

// Ruta para manejar las solicitudes de renovación de token
function refreshToken(request, response) {
  try {
		// Recibimos de la peticion (request) el token de refresco
  	let refreshToken = request.body.refreshToken;
		let accessToken = '';

		console.log('Validando refresh token=', refreshToken);

		// Datos para generar token de acceso
		const secreto = process.env.SECRETO_ACCESS_TOKEN || 'eas';
		const tiempoExpiracion = process.env.TIEMPO_EXPIRA_ACCESS_TOKEN || '5m';

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
		return response.json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Error al renovar el token de acceso:', error);
		return response.status(401).json({ error: error.message });
  }
}

// Funcion para listar usuarios
async function listarUsuarios(request, response) {
	try {
		const conexion = await pool.getConnection();
		
		const sentencia_sql = 'SELECT * FROM TBL_USUARIO ORDER BY id_usuario ASC';

		const resultados = await conexion.query(sentencia_sql);

		conexion.release();

		return response.status(200).json(resultados);
	} catch (error) {
		console.error(error);
		return response.status(500).json({ error: 'Error al listar usuarios' });
	}
}

// funcion para obtener usuario por id
async function obtenerUsuarioPorId(request, response) {
	try {
		const conexion = await pool.getConnection();

		const id = parseInt(request.params.id);

		const sentencia_sql = 'SELECT * FROM TBL_USUARIO WHERE id_usuario = ?';

		const parametros = [id];

		const resultados = await conexion.query(sentencia_sql, parametros);

		conexion.release();

		return response.status(200).json(resultados);
	} catch (error) {
		console.error(error);
		return response.status(500).json({ error: 'Error al buscar usuario por id' });
	}
}

// funcion para crear usuario
async function crearUsuario(request, response) {
	try {
		const conexion = await pool.getConnection();

		const {
			nombres,
			paterno,
			materno,
			dni,
			direccion,
			numeroContrato,
			telefono,
			clave,
			idRol
		} = request.body;

		const sentencia_sql = `
					INSERT INTO TBL_USUARIO (nombres,
										paterno,
										materno,
										dni,
										direccion,
										num_contrato,
										telefono,
										clave,
										id_rol)
								VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) 
					`;

		const hashedClave = await bcrypt.hash(clave, 10);
		const parametros = [nombres, paterno, materno, dni, direccion, numeroContrato, telefono, hashedClave, idRol];

		const resultado = await conexion.query(sentencia_sql, parametros);

		conexion.release();

		return response.status(200).json({ mensaje: 'Usuario creado con ID:' + resultado.insertId });
	} catch(error) {
		console.error(error);
		return response.status(500).json({ error: 'Error al crear usuario' });
	}
}

// funcion para actualizar usuario registrado
async function actualizarUsuario(request, response) {
	try {
		const conexion = await pool.getConnection();

		const id = parseInt(request.params.id);

		const {
			nombres,
			paterno,
			materno,
			dni,
			direccion,
			numeroContrato,
			telefono,
			clave,
			idRol
		} = request.body;

		const sentencia_sql = `UPDATE TBL_USUARIO 
								SET nombres = ?, 
									paterno = ?,
									materno = ?,
									dni = ?, 
									direccion = ?, 
									num_contrato = ?, 
									telefono = ?,
									clave = ?,
									id_rol = ? 
								WHERE id_usuario = ?`;

		const parametros = [nombres, paterno, materno, dni, direccion, numeroContrato, telefono, clave, idRol, id];

		const resultado = await conexion.query(sentencia_sql, parametros);

		conexion.release();
		
		return response.status(200).json({ mensaje: 'Usuario modificado with ID:' + id });
	} catch(error) {
		console.error(error);
		return response.status(500).json({ error: 'Error al actualizar usuario' });
	}
}

// funcion para eliminar usuario registrado
async function eliminarUsuario(request, response) {
	try {
		const conexion = await pool.getConnection();

		const id = parseInt(request.params.id);

		const sentencia_sql = 'DELETE FROM TBL_USUARIO WHERE id_usuario = ?';

		const parametros = [id];

		const resultado = conexion.query(sentencia_sql, parametros);
		
		conexion.release();

		return response.status(200).json({ mensaje: 'Usuario eliminado with ID ' + id });
	} catch(error) {
		console.error(error);
		return response.status(500).json({ error: 'Error al eliminar usuario' });
	}
}

// Exportados las funciones para ser usados en otros archivos javascript
module.exports = {
	listarUsuarios,
	obtenerUsuarioPorId,
	crearUsuario,
	actualizarUsuario,
	eliminarUsuario,
	login,
	refreshToken,
};
