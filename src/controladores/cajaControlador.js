/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

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

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=reporte_${tipoRubro}.pdf`);

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

    doc.font('Helvetica-Bold')
       .fontSize(18)
       .text(`Reporte de ${tipoRubro}S de Caja`, { align: 'center' })
       .font('Helvetica')
       .fontSize(12)
       .text(`Fecha y hora: ${formattedDate} ${formattedTime}`, { align: 'center' })
       .moveDown(1);
    
    const tableTop = doc.y;
    const columnPositions = [50, 120, 300, 370, 520];
    const columnWidths = {
      mes: 60,
      descripcion: 170,
      fecha: 70,
      concepto: 140,
      monto: 100
    };

    doc.font('Helvetica-Bold')
       .fontSize(10)
       .text('Mes', columnPositions[0], tableTop, { width: columnWidths.mes })
       .text('Descripción', columnPositions[1], tableTop, { width: columnWidths.descripcion })
       .text('Fecha', columnPositions[2], tableTop, { width: columnWidths.fecha })
       .text('Concepto', columnPositions[3], tableTop, { width: columnWidths.concepto })
       .text('Monto', columnPositions[4], tableTop, { width: columnWidths.monto });

    doc.moveTo(50, tableTop + 15).lineTo(580, tableTop + 15).stroke();

    let y = tableTop + 20;
    const maxYPosition = 690;

    resultadoCaja.forEach((resultadoCaja) => {
        if (y > maxYPosition) {
            doc.addPage();
            y = 50;
            
            doc.font('Helvetica-Bold')
            .fontSize(10)
            .text('Mes', columnPositions[0], y, { width: columnWidths.mes })
            .text('Descripción', columnPositions[1], y, { width: columnWidths.descripcion })
            .text('Fecha', columnPositions[2], y, { width: columnWidths.fecha })
            .text('Concepto', columnPositions[3], y, { width: columnWidths.concepto })
            .text('Monto', columnPositions[4], y, { width: columnWidths.monto });
            doc.moveTo(50, y + 15).lineTo(580, y + 15).stroke();
            y += 20;
          }

        doc.font('Helvetica').fontSize(10);

        doc.text(resultadoCaja?.obtenerMes() || ' ', columnPositions[0], y, { width: columnWidths.mes });
        doc.text(resultadoCaja?.descripcion || ' ', columnPositions[1], y, {
            width: columnWidths.descripcion,
            lineBreak: true
        });
        doc.text(resultadoCaja?.fechaMovimiento || ' ', columnPositions[2], y, { width: columnWidths.fecha });
        doc.text(resultadoCaja?.concepto || ' ', columnPositions[3], y, { width: columnWidths.concepto });
        doc.text(resultadoCaja?.monto || ' ', columnPositions[4], y, { width: columnWidths.monto });

        // Ajustar y dinámicamente para evitar superposición, considerando la altura de la descripción
        const descripcionHeight = doc.heightOfString(resultadoCaja?.descripcion || ' ', {
            width: columnWidths.descripcion
        });
        y += Math.max(20, descripcionHeight + 5); // 5 es un espaciado extra para separación
    });

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

