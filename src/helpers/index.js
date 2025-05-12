export function formatearFecha(fechaStr) {
    if (!fechaStr) return '-';
    const fecha = new Date(fechaStr);
    return new Intl.DateTimeFormat('es-EC', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(fecha);
  }
  
    
export const formatearDinero = cantidad =>{
    if (cantidad === null || cantidad === undefined || isNaN(cantidad)) {
        return "$0.00";
    }
    return cantidad.toLocaleString('en-US', {
        style:'currency',
        currency:'USD'
    })
}

export const formatearDinero2 = cantidad =>{
    return Number(cantidad.toFixed(2))
}

