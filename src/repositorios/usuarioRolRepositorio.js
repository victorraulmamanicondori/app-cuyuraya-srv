import pool from '../config/db.js';

class UsuarioRolRepositorio {

  async asignarRolAlUsuario(dni, idRol) {
    let conexion;
    try {
      conexion = await pool.getConnection();
      await conexion.query(`INSERT INTO TBL_USUARIO_ROL (ID_USUARIO, ID_ROL)
                                              VALUES (?, ?)`, [dni, idRol]);
      return { "insertado" : true };
    } catch(error) {
      console.log(error);
      throw Error("No se pudo asignar rol al usuario");
    } finally {
      if (conexion) conexion.release();
    }
  }

}

export default new UsuarioRolRepositorio();

