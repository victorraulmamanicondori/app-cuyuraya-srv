import PDFDocument from 'pdfkit';
import fs from 'fs';
import logger from '../config/logger.js';
import lecturaServicio from '../servicios/lecturaServicio.js';

class LecturaControlador {

  constructor() {
    this.imprimirRecibo = this.imprimirRecibo.bind(this);
    this.crearReciboPdf = this.crearReciboPdf.bind(this);
    this.crearPdfNoExisteRecibo = this.crearPdfNoExisteRecibo.bind(this);
    this.crearPdfErrorRecibo = this.crearPdfErrorRecibo.bind(this);
  }

  async borradorLectura(req, res) {
    try {
      const resultado = await lecturaServicio.borradorLectura(req.body);
      res.status(200).json({
        codigo: 200,
        mensaje: 'Se ha calculado lectura exitosamente',
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

  async registrarLectura(req, res) {
    try {
      const resultado = await lecturaServicio.registrarLectura(req.body);
      res.status(200).json({
        codigo: 200,
        mensaje: 'Se ha registrado lectura exitosamente',
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

  async actualizarLectura(req, res) {
    try {
      const resultado = await lecturaServicio.actualizarLectura(req.body);
      res.status(200).json({
        codigo: 200,
        mensaje: 'Se ha actualizado lectura exitosamente',
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

  async obtenerLecturasPorMedidor(req, res) {
    try {
      const { codigoMedidor } = req.params;
      const page = parseInt(req.query.page, 10) || 1; // Convertir a número
      const limit = parseInt(req.query.limit, 10) || 1; // Convertir a número

      const resultado = await lecturaServicio.obtenerLecturasPorMedidor(page, limit, codigoMedidor);
      res.status(200).json({
        codigo: 200,
        mensaje: `Datos de la pagina ${page}`,
        datos: resultado
      });
    } catch(error) {
      logger.error(error);
      res.status(400).json({
        codigo: 400,
        mensaje: error.mensaje,
        datos: null
      });
    }
  }

  async imprimirRecibo(req, res) {
    try {
      const { idLectura } = req.params;
      const recibo = await lecturaServicio.obtenerRecibo(idLectura);

      if (recibo) {
        this.crearReciboPdf(req, res, recibo);
      } else {
        this.crearPdfNoExisteRecibo(req, res);
      }
    } catch(error) {
      logger.error(error);
      this.crearPdfErrorRecibo(req, res);
    }
  }
  
  crearReciboPdf(req, res, recibo) {
    // Crear un nuevo documento PDF
    const doc = new PDFDocument();

    // Configurar la respuesta HTTP para la descarga
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=recibo_agua_${recibo.numeroRecibo}.pdf`);

    // Crear el contenido del PDF
    doc.fontSize(16).text('Recibo de Agua', { align: 'center' });
    doc.fontSize(14).text(`Recibo: ${recibo.numeroRecibo}, Mes: ${recibo.obtenerMes()}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Periodo: ${recibo.obtenerPeriodo()}`);
    doc.fontSize(12).text(`Fecha Límite de Pago: ${recibo.fechaLimitePago}`);
    doc.moveDown();
    doc.text(`Nombre del usuario: ${recibo.usuario}`);
    doc.text(`Dirección: ${recibo.direccion}`);
    doc.text(`Medidor Nro: ${recibo.codigoMedidor}`);
    doc.moveDown();
    doc.text('Detalle del consumo:');
    doc.text(` - Consumo de agua: ${recibo.m3Consumido} m³`);
    doc.text(` - Tarifa aplicada: S/ ${recibo.tarifa} por ${recibo.m3Tarifa} m³`);
    doc.text(` - Lectura Actual: ${recibo.lecturaActual}`);
    doc.text(` - Lectura Anterior: ${recibo.lecturaAnterior}`);
    doc.text(` - Deuda Anterior: S/ ${recibo.deudaAnterior}`);
    doc.text(` - Deuda Actual: S/ ${recibo.deudaActual}`);
    doc.moveDown();
    doc.fontSize(14).text(`Total a pagar: S/ ${recibo.montoPagar}`, { align: 'right' });

    // Finalizar el documento y enviarlo como respuesta
    doc.pipe(res); // Escribir directamente en la respuesta
    doc.end();
  }

  crearPdfNoExisteRecibo(req, res) {
    // Crear un nuevo documento PDF
    const doc = new PDFDocument();

    // Configurar la respuesta HTTP para la descarga
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=recibo_agua.pdf');

    // Crear el contenido del PDF
    doc.fontSize(16).text('Recibo No Existe', { align: 'center' });

    // Finalizar el documento y enviarlo como respuesta
    doc.pipe(res); // Escribir directamente en la respuesta
    doc.end();
  }

  crearPdfErrorRecibo(req, res) {
    // Crear un nuevo documento PDF
    const doc = new PDFDocument();

    // Configurar la respuesta HTTP para la descarga
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=recibo_agua.pdf');

    // Crear el contenido del PDF
    doc.fontSize(16).text('Error al generar Recibo de Agua', { align: 'center' });

    // Finalizar el documento y enviarlo como respuesta
    doc.pipe(res); // Escribir directamente en la respuesta
    doc.end();
  }
}

export default new LecturaControlador();

