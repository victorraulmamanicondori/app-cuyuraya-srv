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

class UsuarioControlador {

  constructor() {
    this.imprimirPadronUsuarios = this.imprimirPadronUsuarios.bind(this);
    this.crearPadronUsuarioPdf = this.crearPadronUsuarioPdf.bind(this);
    this.crearPdfNoExistePadronUsuario = this.crearPdfNoExistePadronUsuario.bind(this);
    this.crearPdfErrorPadronUsuario = this.crearPdfErrorPadronUsuario.bind(this);
    this.maskData = this.maskData.bind(this);
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

  crearPadronUsuarioPdf(req, res, usuarios, departamento, provincia, distrito, centroPoblado, comunidadCampesina, comunidadNativa) {
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

    // Crear encabezado de la tabla
    const tableTop = doc.y;
    const columnPositions = [50, 80, 160, 240, 300, 360, 440, 490, 640, 700]; // Posiciones de inicio para las columnas

    doc.font('Helvetica-Bold')
       .fontSize(10)
       .text('N°', columnPositions[0], tableTop)
       .text('Nombre', columnPositions[1], tableTop)
       .text('Paterno', columnPositions[2], tableTop)
       .text('Materno', columnPositions[3], tableTop)
       .text('DNI', columnPositions[4], tableTop)
       .text('N° Contrato', columnPositions[5], tableTop)
       .text('Medidor', columnPositions[6], tableTop)
       .text('Dirección', columnPositions[7], tableTop)
       .text('Teléfono', columnPositions[8], tableTop)
       .text('Estado', columnPositions[9], tableTop);

    // Línea separadora
    doc.moveTo(50, tableTop + 15).lineTo(740, tableTop + 15).stroke();

    // Rellenar filas de la tabla
    let y = tableTop + 20; // Posición inicial para las filas
    usuarios.forEach((usuario, index) => {
        if (y > 750) { // Salto de página si el contenido excede
            doc.addPage();
            y = 50;
        }

        const maskedDni = this.maskData(usuario.dni);
        const maskedTelefono = this.maskData(usuario.telefono);
        const maskedDireccion = this.maskData(usuario.direccion, 4);

        doc.font('Helvetica')
           .fontSize(10)
           .text(index + 1, columnPositions[0], y) // Número
           .text(usuario.nombres || ' ', columnPositions[1], y) // Nombre
           .text(usuario.paterno || ' ', columnPositions[2], y) // Paterno
           .text(usuario.materno || ' ', columnPositions[3], y) // Materno
           .text(maskedDni || ' ', columnPositions[4], y) // DNI
           .text(usuario.numeroContrato || ' ', columnPositions[5], y) // Numero contrato
           .text(usuario.codigoMedidor || ' ', columnPositions[6], y) // Codigo medidor
           .text(maskedDireccion || ' ', columnPositions[7], y) // Dirección
           .text(maskedTelefono || ' ', columnPositions[8], y) // Teléfono
           .text(usuario.estado || ' ', columnPositions[9], y); // Estado

        y += 20; // Espaciado entre filas
    });

    // Finalizar el documento y enviarlo como respuesta
    doc.pipe(res);
    doc.end();
  }

  maskData(value, visibleDigits = 3) {
    if (!value) return ' '; // Manejo para datos nulos o indefinidos
    const strValue = value.toString(); // Convertir a cadena si es un número
    if (strValue.length <= visibleDigits) return '*'.repeat(strValue.length); // Si la longitud es menor o igual al visibleDigits
    return strValue.slice(0, -visibleDigits) + '*'.repeat(visibleDigits);
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

