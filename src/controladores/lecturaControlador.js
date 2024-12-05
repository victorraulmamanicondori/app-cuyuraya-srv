import PDFDocument from 'pdfkit';
import fs from 'fs';
import logger from '../config/logger.js';
import lecturaServicio from '../servicios/lecturaServicio.js';

class LecturaControlador {

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
        crearReciboPdf(req, res, recibo);
      } else {
        crearPdfNoExisteRecibo(req, res);
      }
    } catch(error) {
      logger.error(error);
      crearPdfErrorRecibo(req, res);
    }
  }

  crearReciboPdf(req, res) {
    // Crear un nuevo documento PDF
    const doc = new PDFDocument();

    // Configurar la respuesta HTTP para la descarga
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=recibo_agua.pdf');

    // Crear el contenido del PDF
    doc.fontSize(16).text('Recibo de Agua', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text('Fecha: ' + new Date().toLocaleDateString());
    doc.moveDown();
    doc.text('Nombre del usuario: Juan Pérez');
    doc.text('Dirección: Calle Falsa 123, Lima, Perú');
    doc.moveDown();
    doc.text('Detalle del consumo:');
    doc.text(' - Consumo de agua: 25 m³');
    doc.text(' - Tarifa aplicada: S/ 2.50 por m³');
    doc.moveDown();
    doc.fontSize(14).text('Total a pagar: S/ 62.50', { align: 'right' });

    // Finalizar el documento y enviarlo como respuesta
    doc.pipe(res); // Escribir directamente en la respuesta
    doc.end();
  }

  crearPdfNoExisteRecibo() {

  }

  crearPdfErrorRecibo() {
    
  }

}

export default new LecturaControlador();

