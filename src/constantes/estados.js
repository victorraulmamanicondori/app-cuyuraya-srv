/*
 * Sistema de Gestión de Agua Potable Rural
 * Copyright (c) Victor Raul Mamani Condori, 2025
 *
 * Este software está distribuido bajo los términos de la Licencia de Uso y Distribución.
 * Para más detalles, consulta el archivo LICENSE en el directorio raíz de este proyecto.
 */

const UsuarioEstados = {
  ACTIVO: 'ACTIVO',
  INACTIVO: 'INACTIVO',
  BLOQUEADO: 'BLOQUEADO',
  ELIMINADO: 'ELIMINADO'
};

const RolEstados = {
  ACTIVO: 'ACTIVO',
  INACTIVO: 'INACTIVO',
  ELIMINADO: 'ELIMINADO'
};

const RubroEstados = {
  ACTIVO: 'ACTIVO',
  INACTIVO: 'INACTIVO',
  ELIMINADO: 'ELIMINADO'
};

const TipoMovimientoEstados = {
  ACTIVO: 'ACTIVO',
  INACTIVO: 'INACTIVO',
  ELIMINADO: 'ELIMINADO'
};

const MedidorEstados = {
  ASIGNADO: 'ASIGNADO',
  LIBERADO: 'LIBERADO',
  REPARACION: 'REPARACION',
  REPARADO: 'REPARADO',
  DESECHADO: 'DESECHADO'
};

const LecturaEstados = {
  REGISTRADO: 'REGISTRADO',
  PAGADO: 'PAGADO',
  ANULADO: 'ANULADO'
};

const CajaEstados = {
  REGISTRADO: 'REGISTRADO',
  ANULADO: 'ANULADO'
}; 

const TarifaEstados = {
  ACTIVO: 'ACTIVO',
  INACTIVO: 'INACTIVO'
};

export {
  CajaEstados,LecturaEstados,MedidorEstados,RolEstados,
  RubroEstados,TarifaEstados,TipoMovimientoEstados,UsuarioEstados
};

