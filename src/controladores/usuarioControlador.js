import PDFDocument from 'pdfkit';
import fs from 'fs';
import logger from '../config/logger.js';
import usuarioServicio from '../servicios/usuarioServicio.js';
import departamentoServicio from '../servicios/departamentoServicio.js';
import provinciaServicio from '../servicios/provinciaServicio.js';
import distritoServicio from '../servicios/distritoServicio.js';
import centroPobladoServicio from '../servicios/centroPobladoServicio.js';
import comunidadCampesinaServicio from '../servicios/comunidadCampesinaServicio.js';
import comunidadNativaServicio from '../servicios/comunidadNativaServicio.js';
import medidorServicio from '../servicios/medidorServicio.js';

class UsuarioControlador {

  constructor() {
    this.imprimirPadronUsuarios = this.imprimirPadronUsuarios.bind(this);
    this.crearPadronUsuarioPdf = this.crearPadronUsuarioPdf.bind(this);
    this.crearPdfNoExistePadronUsuario = this.crearPdfNoExistePadronUsuario.bind(this);
    this.crearPdfErrorPadronUsuario = this.crearPdfErrorPadronUsuario.bind(this);
  }

  async listarUsuarios(req, res) {
    try {
      const usuarios = await usuarioServicio.listarUsuarios();
      res.status(200).json(usuarios);
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }

  async asignarRolAlUsuario(req, res) {
    try {
      const dni = req.params.dni;
      const idRol = req.params.idRol;
      const rol = await usuarioServicio.asignarRolAlUsuario(dni, idRol);
      res.status(201).json(rol);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async obtenerUsuarioPorDni(req, res) {
    try {
      const dni = req.params.dni;
      const usuario = await usuarioServicio.obtenerUsuarioPorDni(dni);
      if (usuario) {
        res.status(200).json({
          codigo: 200,
          mensaje: "",
          datos: usuario
        });
      } else {
        res.status(404).json({
          codigo: 404,
          mensaje: 'Usuario no encontrado'
        });
      }
    } catch(error) {
      logger.error(error);
      res.status(500).json({
        codigo: 500,
        mensaje: error.message
      });
    }
  }

  async crearUsuario(req, res) {
    try {
      const nuevoUsuario = await usuarioServicio.crearUsuario(req.body);
      res.status(201).json(nuevoUsuario);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async actualizarUsuario(req, res) {
    try {
      const usuarioActualizado = await usuarioServicio.actualizarUsuario(req.body);
      res.status(200).json(usuarioActualizado);
    } catch(error) {
      logger.error(error);
      res.status(400).json({ mensaje: error.message });
    }
  }

  async eliminarUsuarioPorDni(req, res) {
    try {
      const dni = req.params.dni;
      await usuarioServicio.eliminarUsuarioPorDni(dni);
      res.status(204).end();
    } catch(error) {
      logger.error(error);
      res.status(500).json({ mensaje: error.message });
    }
  }

  async resetearContrasenaPorDni(req, res) {
    try {
      const { dni } = req.body;
      await usuarioServicio.resetearContrasenaPorDni(dni);
      res.status(200).json({
        codigo: 200,
        mensaje: 'Contraseña reseteado exitosamente',
        datos: dni
      });
    } catch(error) {
      logger.error(error);
      res.status(400).json({
        codigo: 400,
        mensaje: error.message,
        datos: null
      });
    }
  }

  async listarUsuariosPorUbigeo(req, res) {
    try {
      const codigoDistrito = req.params.codigoDistrito;
      const codigoCentroPoblado = req.query.codigoCentroPoblado;
      const codigoComunidadCampesina = req.query.codigoComunidadCampesina;
      const codigoComunidadNativa = req.query.codigoComunidadNativa;

      logger.info(`Codigo Distrito: [${codigoDistrito}]`);
      logger.info(`Centro Poblado: [${codigoCentroPoblado}]`);
      logger.info(`Comunidad Campesina: [${codigoComunidadCampesina}]`);
      logger.info(`Comunidad Nativa: [${codigoComunidadNativa}]`);

      const usuarios = await usuarioServicio
        .obtenerUsuariosPorUbigeo(codigoDistrito, codigoCentroPoblado, codigoComunidadCampesina, codigoComunidadNativa);
      if (usuarios) {
        res.status(200).json({
          codigo: 200,
          mensaje: "",
          datos: usuarios
        });
      } else {
        res.status(404).json({
          codigo: 404,
          mensaje: 'No hay usuarios'
        });
      }
    } catch(error) {
      logger.error(error);
      res.status(500).json({
        codigo: 500,
        mensaje: error.message
      });
    }
  }

  async obtenerUsuarioPorId(req, res) {
    try {
      const idUsuario = req.params.idUsuario;
      const usuario = await usuarioServicio.obtenerUsuarioPorId(idUsuario);
      if (usuario) {
        res.status(200).json({
          codigo: 200,
          mensaje: "",
          datos: usuario
        });
      } else {
        res.status(404).json({
          codigo: 404,
          mensaje: 'No hay usuario'
        });
      }
    } catch(error) {
      logger.error(error);
      res.status(500).json({
        codigo: 500,
        mensaje: error.message
      });
    }
  }

  async imprimirPadronUsuarios(req, res) {
    try {
      const { codigoDistrito } = req.params;

      let codigoDepartamento = null;
      let codigoProvincia = null;

      if (!codigoDistrito || codigoDistrito.length !== 6) {
        throw new Error("Ubigeo invalido");
      } else {
        codigoDepartamento = codigoDistrito.substring(0, 2);
        codigoProvincia = codigoDistrito.substring(0, 4);
      }

      const codigoCentroPoblado = req.query.codigoCentroPoblado;
      const codigoComunidadCampesina = req.query.codigoComunidadCampesina;
      const codigoComunidadNativa = req.query.codigoComunidadNativa;

      logger.info(`Codigo Departamento: [${codigoDepartamento}]`);
      logger.info(`Codigo Provincia: [${codigoProvincia}]`);
      logger.info(`Codigo Distrito: [${codigoDistrito}]`);
      logger.info(`Centro Poblado: [${codigoCentroPoblado}]`);
      logger.info(`Comunidad Campesina: [${codigoComunidadCampesina}]`);
      logger.info(`Comunidad Nativa: [${codigoComunidadNativa}]`);

      const departamento = await departamentoServicio.obtenerDepartamentoPorCodigo(codigoDepartamento);
      const provincia = await provinciaServicio.obtenerProvinciaPorCodigo(codigoProvincia);
      const distrito = await distritoServicio.obtenerDistritoPorCodigo(codigoDistrito);
      const centroPoblado = await centroPobladoServicio.obtenerCentroPobladoPorCodigo(codigoCentroPoblado);
      const comunidadCampesina = await comunidadCampesinaServicio.obtenerComunidadCampesinaPorCodigo(codigoComunidadCampesina);
      const comunidadNativa = await comunidadNativaServicio.obtenerComunidadNativaPorCodigo(codigoComunidadNativa);

      const usuarios = await usuarioServicio.obtenerUsuariosPorUbigeo(codigoDistrito?.trim(), codigoCentroPoblado?.trim(), codigoComunidadCampesina?.trim(), codigoComunidadNativa?.trim());
      logger.info(`Total usuarios: ${usuarios?.length}`);

      if (usuarios && usuarios.length > 0) {
        this.crearPadronUsuarioPdf(req, res, usuarios, departamento, provincia, distrito, centroPoblado, comunidadCampesina, comunidadNativa);
      } else {
        this.crearPdfNoExistePadronUsuario(req, res, departamento, provincia, distrito, centroPoblado, comunidadCampesina, comunidadNativa);
      }
    } catch(error) {
      logger.error(error);
      this.crearPdfErrorPadronUsuario(req, res);
    }
  }

  async cargaMasivoUsuarios(req, res) {
    try {
      const usuarios = await usuarioServicio.cargaMasivoUsuarios(req.body);

      usuarios.forEach(async usuario => {
        try {
          if (usuario.codigoMedidor && usuario.dni) {
            const resultadoAsignacionMedidor = await medidorServicio.asignarMedidor(usuario.codigoMedidor, usuario.dni);
          }
        } catch(error) {
          usuario.errores.push(`Error en fila ${usuario.fila}: ${error.message}`);
        }
      });

      res.status(200).json({
        codigo: 200,
        mensaje: "",
        datos: usuarios
      });
    } catch(error) {
      logger.error(error);
      res.status(500).json({
        codigo: 500,
        mensaje: error.message
      });
    }
  }

  crearPadronUsuarioPdf(req, res, usuarios, departamento, provincia, distrito, centroPoblado, comunidadCampesina, comunidadNativa) {
    const doc = new PDFDocument({ margin: 50, layout: 'landscape' });

    // Configurar la respuesta HTTP para la descarga
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=padron_usuarios.pdf');

    // Obtener la fecha y hora actual
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-PE', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const formattedTime = now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Título del documento
    doc.font('Helvetica-Bold').fontSize(18).text('Padrón de Usuarios', { align: 'center' })
       .font('Helvetica').fontSize(12).text(`Fecha y hora: ${formattedDate} ${formattedTime}`, { align: 'center' }).moveDown(1);

    // Mostrar información del ubigeo
    doc.font('Helvetica').fontSize(12)
       .text(`Departamento: ${departamento?.nombre || ' '} (Código: ${departamento?.codigo || 'N/A'})`)
       .text(`Provincia: ${provincia?.nombre || ' '} (Código: ${provincia?.codigo || 'N/A'})`)
       .text(`Distrito: ${distrito?.nombre || ' '} (Código: ${distrito?.codigo || 'N/A'})`)
       .text(`Centro Poblado: ${centroPoblado?.nombre || ' '} (Código: ${centroPoblado?.codigo || 'N/A'})`)
       .text(`Comunidad Campesina: ${comunidadCampesina?.nombre || ' '} (Código: ${comunidadCampesina?.codigo || 'N/A'})`)
       .text(`Comunidad Nativa: ${comunidadNativa?.nombre || ' '} (Código: ${comunidadNativa?.codigo || 'N/A'})`).moveDown(2);

    const tableTop = doc.y;
    const columnPositions = [50, 100, 200, 300, 400, 460, 540, 700]; // Ajuste según diseño
    const maxYPosition = 500; // Límite razonable para evitar desbordamiento (ajustar según orientación)

    // Encabezado
    doc.font('Helvetica-Bold').fontSize(10)
       .text('N°', columnPositions[0], tableTop)
       .text('Nombre', columnPositions[1], tableTop)
       .text('Paterno', columnPositions[2], tableTop)
       .text('Materno', columnPositions[3], tableTop)
       .text('DNI', columnPositions[4], tableTop)
       .text('Medidor', columnPositions[5], tableTop)
       .text('Dirección', columnPositions[6], tableTop)
       .text('Estado', columnPositions[7], tableTop);

    doc.moveTo(50, tableTop + 15).lineTo(740, tableTop + 15).stroke();

    let y = tableTop + 20;
    usuarios.forEach((usuario, index) => {
        if (y > maxYPosition) {
            doc.addPage();
            y = 50;
            // Repetir encabezado en cada nueva página
            doc.font('Helvetica-Bold').fontSize(10)
               .text('N°', columnPositions[0], y)
               .text('Nombre', columnPositions[1], y)
               .text('Paterno', columnPositions[2], y)
               .text('Materno', columnPositions[3], y)
               .text('DNI', columnPositions[4], y)
               .text('Medidor', columnPositions[5], y)
               .text('Dirección', columnPositions[6], y)
               .text('Estado', columnPositions[7], y);
            doc.moveTo(50, y + 15).lineTo(740, y + 15).stroke();
            y += 20; // Ajuste después del encabezado
        }

        doc.font('Helvetica').fontSize(10)
           .text(index + 1, columnPositions[0], y)
           .text(usuario.nombres || ' ', columnPositions[1], y)
           .text(usuario.paterno || ' ', columnPositions[2], y)
           .text(usuario.materno || ' ', columnPositions[3], y)
           .text(usuario.dni || ' ', columnPositions[4], y)
           .text(usuario.codigoMedidor || ' ', columnPositions[5], y)
           .text(usuario.direccion || ' ', columnPositions[6], y)
           .text(usuario.estado || ' ', columnPositions[7], y);

        y += 20;
    });

    doc.pipe(res);
    doc.end();
  }

  crearPdfNoExistePadronUsuario(req, res, departamento, provincia, distrito, centroPoblado, comunidadCampesina, comunidadNativa) {
    // Crear un nuevo documento PDF en orientación horizontal
    const doc = new PDFDocument({ margin: 50, layout: 'landscape' });

    // Configurar la respuesta HTTP para la descarga
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=padron_usuarios.pdf');

    // Obtener la fecha y hora actual
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-PE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const formattedTime = now.toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    // Título del documento
    doc.font('Helvetica-Bold')
       .fontSize(18)
       .text('Padrón de Usuarios', { align: 'center' })
       .font('Helvetica')
       .fontSize(12)
       .text(`Fecha y hora: ${formattedDate} ${formattedTime}`, { align: 'center' })
       .moveDown(1);

    // Mostrar información del ubigeo
    doc.font('Helvetica')
       .fontSize(12)
       .text(`Departamento: ${departamento?.nombre || ' '} (Código: ${departamento?.codigo || 'N/A'})`)
       .text(`Provincia: ${provincia?.nombre || ' '} (Código: ${provincia?.codigo || 'N/A'})`)
       .text(`Distrito: ${distrito?.nombre || ' '} (Código: ${distrito?.codigo || 'N/A'})`)
       .text(`Centro Poblado: ${centroPoblado?.nombre || ' '} (Código: ${centroPoblado?.codigo || 'N/A'})`)
       .text(`Comunidad Campesina: ${comunidadCampesina?.nombre || ' '} (Código: ${comunidadCampesina?.codigo || 'N/A'})`)
       .text(`Comunidad Nativa: ${comunidadNativa?.nombre || ' '} (Código: ${comunidadNativa?.codigo || 'N/A'})`)
       .moveDown(2);

    // Mensaje de que no hay usuarios
    doc.font('Helvetica-Bold')
       .fontSize(14)
       .text('No se encontraron usuarios en el padrón.', { align: 'center', underline: true })
       .moveDown(1);

    doc.font('Helvetica')
       .fontSize(12)
       .text('Por favor, revise los filtros aplicados o actualice los datos para obtener información.', { align: 'center' })
       .moveDown(2);

    // Finalizar el documento y enviarlo como respuesta
    doc.pipe(res); // Escribir directamente en la respuesta HTTP
    doc.end();
  }

  crearPdfErrorPadronUsuario(req, res) {
    // Crear un nuevo documento PDF
    const doc = new PDFDocument();

    // Configurar la respuesta HTTP para la descarga
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=padron_usuarios.pdf');

    // Crear el contenido del PDF
    doc.fontSize(16).text('Error al generar Padron de Usuarios', { align: 'center' });

    // Finalizar el documento y enviarlo como respuesta
    doc.pipe(res); // Escribir directamente en la respuesta
    doc.end();
  }
}

export default new UsuarioControlador();

