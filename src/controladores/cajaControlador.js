import PDFDocument from 'pdfkit';
import fs from 'fs';
import logger from '../config/logger.js';
import cajaServicio from '../servicios/cajaServicio.js';

class CajaControlador {

  constructor() {
    this.generarReportePorRubro = this.generarReportePorRubro.bind(this);
    this.crearReportePorRubroPdf = this.crearReportePorRubroPdf.bind(this);
    this.crearPdfNoExisteRegistros = this.crearPdfNoExisteRegistros.bind(this);
    this.crearPdfErrorReportePorRubro = this.crearPdfErrorReportePorRubro.bind(this);
  }

  async registrarCaja(req, res) {
    try {
      const resultado = await cajaServicio.registrarCaja(req.body);
      res.status(200).json({
        codigo: 200,
        mensaje: 'Resultado de registro de movimiento en caja',
        datos: resultado
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

  async generarReportePorRubro(req, res) {
    try {
      const { tipoRubro } = req.params;

      const resultadoCaja = await cajaServicio.listarCajaPorRubro(tipoRubro);

      if (resultadoCaja && resultadoCaja.length > 0) {
        this.crearReportePorRubroPdf(req, res, tipoRubro, resultadoCaja);
      } else {
        this.crearPdfNoExisteRegistros(req, res, tipoRubro);
      }
    } catch(error) {
      logger.error(error);
      this.crearPdfErrorReportePorRubro(req, res);
    }
  }

  crearReportePorRubroPdf(req, res, tipoRubro, resultadoCaja) {
    const doc = new PDFDocument({ margin: 50 });

    // Configurar la respuesta HTTP para la descarga
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=reporte_${tipoRubro}.pdf`);

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
       .text(`Reporte de ${tipoRubro}S de Caja`, { align: 'center' })
       .font('Helvetica')
       .fontSize(12)
       .text(`Fecha y hora: ${formattedDate} ${formattedTime}`, { align: 'center' })
       .moveDown(1);

    // Crear encabezado de la tabla
    const tableTop = doc.y;
    const columnPositions = [50, 100, 180, 300, 360, 520]; // Posiciones de inicio para las columnas

    doc.font('Helvetica-Bold')
       .fontSize(10)
       .text('Mes', columnPositions[0], tableTop)
       .text('Fecha Corte', columnPositions[1], tableTop)
       .text('N° Comprobante', columnPositions[2], tableTop)
       .text('Fecha', columnPositions[3], tableTop)
       .text('Concepto', columnPositions[4], tableTop)
       .text('Monto', columnPositions[5], tableTop);

    // Línea separadora
    doc.moveTo(50, tableTop + 15).lineTo(580, tableTop + 15).stroke();

    // Rellenar filas de la tabla
    let y = tableTop + 20; // Posición inicial para las filas
    resultadoCaja.forEach((resultadoCaja, index) => {
        if (y > 750) { // Salto de página si el contenido excede
            doc.addPage();
            y = 50;
        }

        doc.font('Helvetica')
           .fontSize(10)
           .text(resultadoCaja?.obtenerMes() || ' ', columnPositions[0], y) // Nombre
           .text(resultadoCaja?.fechaCorte || ' ', columnPositions[1], y) // Paterno
           .text(resultadoCaja?.descripcion || ' ', columnPositions[2], y) // Materno
           .text(resultadoCaja?.fechaMovimiento || ' ', columnPositions[3], y) // DNI
           .text(resultadoCaja?.concepto || ' ', columnPositions[4], y) // Numero contrato
           .text(resultadoCaja?.monto || ' ', columnPositions[5], y); // Estado

        y += 20; // Espaciado entre filas
    });

    // Finalizar el documento y enviarlo como respuesta
    doc.pipe(res);
    doc.end();
  }

  crearPdfNoExisteRegistros(req, res, tipoRubro) {
    // Crear un nuevo documento PDF en orientación horizontal
    const doc = new PDFDocument({ margin: 50 });

    // Configurar la respuesta HTTP para la descarga
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=reporte_${tipoRubro}.pdf`);

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
       .text(`Reporte de ${tipoRubro}S de Caja`, { align: 'center' })
       .font('Helvetica')
       .fontSize(12)
       .text(`Fecha y hora: ${formattedDate} ${formattedTime}`, { align: 'center' })
       .moveDown(1);

    // Mensaje de que no hay usuarios
    doc.font('Helvetica-Bold')
       .fontSize(14)
       .text('No se encontraron registros para el reporte.', { align: 'center', underline: true })
       .moveDown(1);

    doc.font('Helvetica')
       .fontSize(12)
       .text('Por favor, actualice los datos para obtener información.', { align: 'center' })
       .moveDown(2);

    // Finalizar el documento y enviarlo como respuesta
    doc.pipe(res); // Escribir directamente en la respuesta HTTP
    doc.end();
  }

  crearPdfErrorReportePorRubro(req, res) {
    // Crear un nuevo documento PDF
    const doc = new PDFDocument();

    // Configurar la respuesta HTTP para la descarga
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=reporte.pdf');

    // Crear el contenido del PDF
    doc.fontSize(16).text('Error al generar reporte', { align: 'center' });

    // Finalizar el documento y enviarlo como respuesta
    doc.pipe(res); // Escribir directamente en la respuesta
    doc.end();
  }

}

export default new CajaControlador();

