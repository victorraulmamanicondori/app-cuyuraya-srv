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

  async registrarPagoRecibo(req, res) {
    try {
      const { idLectura } = req.params;
      const resultado = await lecturaServicio.registrarPagoRecibo(idLectura);
      res.status(200).json({
        codigo: 200,
        mensaje: 'Se ha regitrado pago de recibo',
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
    const doc = new PDFDocument({
      size: [227, 841.89], // 58mm x longitud dinámica (1 punto = 1/72 pulgadas)
      margins: { top: 10, left: 10, right: 10, bottom: 10 },
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=recibo_agua_${recibo.numeroRecibo}.pdf`);

    // Cabecera
    doc.font('Helvetica-Bold')
      .fontSize(10)
      .text('Recibo de Agua', { align: 'center' })
      .moveDown(0.5);

    // Información del recibo
    doc.font('Helvetica')
      .fontSize(8)
      .text(`Recibo: ${recibo.numeroRecibo}`, { align: 'left' })
      .text(`Mes: ${recibo.obtenerMes()}`)
      .text(`Periodo: ${recibo.obtenerPeriodo()}`)
      .text(`Fecha Límite: ${recibo.fechaLimitePago}`)
      .text(`Estado: ${recibo.estado}`)
      .moveDown(0.5);

    // Información del usuario
    doc.text(`Usuario: ${recibo.usuario}`)
      .text(`Dirección: ${recibo.direccion}`)
      .text(`Medidor: ${recibo.codigoMedidor}`)
      .moveDown(0.5);

    // Detalle del consumo
    doc.font('Helvetica-Bold')
      .text('Detalle del Consumo:', { underline: true })
      .font('Helvetica')
      .text(`Consumo: ${recibo.m3Consumido} m³`)
      .text(`Tarifa: S/ ${recibo.tarifa} por ${recibo.m3Tarifa} m³`)
      .text(`Lectura Actual: ${recibo.lecturaActual}`)
      .text(`Lectura Anterior: ${recibo.lecturaAnterior}`)
      .text(`Deuda Anterior: S/ ${recibo.deudaAnterior}`)
      .text(`Deuda Actual: S/ ${recibo.deudaActual}`)
      .moveDown(0.5);

    // Total a pagar
    doc.font('Helvetica-Bold')
      .fontSize(10)
      .text(`Total a Pagar: S/ ${recibo.montoPagar}`, { align: 'right' });

    doc.pipe(res);
    doc.end();
  }

  crearPdfNoExisteRecibo(req, res) {
    const doc = new PDFDocument({
      size: [227, 100], // 58mm x altura mínima
      margins: { top: 10, left: 10, right: 10, bottom: 10 },
    });
  
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=recibo_agua.pdf');
  
    doc.font('Helvetica-Bold')
      .fontSize(12)
      .text('Recibo No Existe', { align: 'center' });
  
    doc.pipe(res);
    doc.end();
  }  

  crearPdfErrorRecibo(req, res) {
    const doc = new PDFDocument({
      size: [227, 100], // 58mm x altura mínima
      margins: { top: 10, left: 10, right: 10, bottom: 10 },
    });
  
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=recibo_agua.pdf');
  
    doc.font('Helvetica-Bold')
      .fontSize(12)
      .text('Error al Generar Recibo', { align: 'center' });
  
    doc.pipe(res);
    doc.end();
  }  
}

export default new LecturaControlador();

