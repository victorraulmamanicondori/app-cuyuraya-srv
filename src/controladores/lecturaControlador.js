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
        size: [150, 350], // 58mm x longitud dinámica
        margins: { top: 10, left: 5, right: 5, bottom: 10 },
        layout: 'portrait',
        dpi: 400 // Aumentado a 300 DPI
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
        'Content-Disposition',
        `attachment; filename=recibo_agua_${recibo.numeroRecibo}.pdf`
    );

    // Función para dividir texto en líneas de un máximo de n caracteres
    const splitText = (text, maxLength) => {
        const words = text.split(' ');
        let lines = [];
        let currentLine = '';

        words.forEach(word => {
            if ((currentLine + word).length > maxLength) {
                lines.push(currentLine.trim());
                currentLine = word + ' ';
            } else {
                currentLine += word + ' ';
            }
        });

        if (currentLine.trim().length > 0) {
            lines.push(currentLine.trim());
        }

        return lines;
    };

    // Cabecera
    doc.font('Helvetica')
        .fontSize(10)
        .text('---------------------------------------')
        .font('Helvetica-Bold')
        .text('Recibo de Agua', { align: 'center' })
        .moveDown(0.5);

    // Información del recibo
    const reciboInfo = [
        `Recibo: ${recibo.numeroRecibo}`,
        `Mes: ${recibo.obtenerMes()}`,
        `Periodo: ${recibo.obtenerPeriodo()}`,
        `Fecha Límite: ${recibo.obtenerFechaLimite()}`,
        `Estado: ${recibo.estado}`
    ];

    doc.font('Helvetica').fontSize(10); // Cambiado a Courier
    reciboInfo.forEach(info => {
        splitText(info, 37).forEach(line => {
            doc.text(line, { align: 'left' });
        });
    });
    doc.moveDown(0.5);

    // Información del usuario
    const usuarioInfo = [
        `Usuario: ${recibo.usuario}`,
        `Dirección: ${recibo.direccion}`,
        `Medidor: ${recibo.codigoMedidor}`
    ];

    usuarioInfo.forEach(info => {
        splitText(info, 37).forEach(line => {
            doc.text(line, { align: 'left'});
        });
    });
    doc.moveDown(0.5);

    // Detalle del consumo
    doc.font('Helvetica')
        .fontSize(10)
        .text('Detalle del Consumo:')
        .text('---------------------------------------')
        .font('Helvetica'); // Detalle en Courier

    const consumoInfo = [
        `Consumo: ${recibo.m3Consumido} m³`,
        `Tarifa: S/ ${recibo.tarifa} por ${recibo.m3Tarifa} m³`,
        `Lectura Actual: ${recibo.lecturaActual}`,
        `Lectura Anterior: ${recibo.lecturaAnterior}`,
        `Deuda Anterior: S/ ${recibo.deudaAnterior}`,
        `Deuda Actual: S/ ${recibo.deudaActual}`
    ];

    consumoInfo.forEach(info => {
        splitText(info, 37).forEach(line => {
            doc.text(line, { align: 'left' });
        });
    });
    doc.moveDown(0.5);

    // Total a pagar
    doc.font('Helvetica')
        .fontSize(10)
        .text('---------------------------------------')
        .font('Helvetica-Bold') // Courier en negrita
        .text(`Total a Pagar: S/ ${recibo.montoPagar}`, { align: 'center' })
        .font('Helvetica')
        .text('---------------------------------------')
        .moveDown(0.5);

    doc.pipe(res);
    doc.end();
  }

  crearPdfNoExisteRecibo(req, res) {
    const doc = new PDFDocument({
      size: [150, 100], // 58mm x altura mínima
      margins: { top: 10, left: 10, right: 10, bottom: 10 },
    });
  
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=recibo_agua.pdf');
  
    doc.font('Helvetica-Bold')
      .fontSize(10)
      .text('Recibo No Existe', { align: 'center' });
  
    doc.pipe(res);
    doc.end();
  }  

  crearPdfErrorRecibo(req, res) {
    const doc = new PDFDocument({
      size: [150, 100], // 58mm x altura mínima
      margins: { top: 10, left: 10, right: 10, bottom: 10 },
    });
  
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=recibo_agua.pdf');
  
    doc.font('Helvetica-Bold')
      .fontSize(10)
      .text('Error al Generar Recibo', { align: 'center' });
  
    doc.pipe(res);
    doc.end();
  }  
}

export default new LecturaControlador();

