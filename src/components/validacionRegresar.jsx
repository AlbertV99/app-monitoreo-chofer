import React, { useEffect } from 'react';

const ValidacionRegresar = () => {
  // Función para manejar el evento beforeunload y mostrar la alerta
  const handleBeforeUnload = (event) => {
    // Cancelar el evento predeterminado para mostrar la alerta personalizada
    event.preventDefault();

    // Mostrar la alerta personalizada
    event.returnValue = ''; // Esto es necesario para que la alerta funcione en algunos navegadores
    return '¿Seguro que quieres salir de la aplicación?';
  };

  // Agregar el evento beforeunload cuando el componente se monta
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Limpiar el evento beforeunload cuando el componente se desmonta
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    // Aquí va el contenido de tu componente principal
    <div>
      <h2>Mi PWA con React</h2>
      {/* Resto de tu contenido */}
    </div>
  );
};

export default ValidacionRegresar;
