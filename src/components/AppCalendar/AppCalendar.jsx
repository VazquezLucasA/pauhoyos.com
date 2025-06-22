// client/src/App.js

import React, { useState, useEffect, useCallback } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Estilos por defecto del calendario
import './AppCalendar.css'; // Archivo para nuestros estilos personalizados

// --- Simulación de Base de Datos y API ---

// Lista de todos los horarios de atención posibles.
const todosLosTurnos = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];

// Datos iniciales para nuestra "base de datos" de reservas.
const reservasIniciales = [
    // Usamos una fecha futura para el ejemplo. ¡Asegúrate de que sea válida!
    // Para probar, puedes cambiar '2025-06-25' a una fecha de la semana actual.
    { fecha: '2025-06-25', hora: '10:00' },
    { fecha: '2025-06-25', hora: '15:30' }
];

// --- FIN de la Simulación ---


function AppCalendar() {
  const [date, setDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingMessage, setBookingMessage] = useState('');
  
  // Usamos useState para manejar las reservas, así la UI reacciona a los cambios.
  const [reservas, setReservas] = useState(reservasIniciales);

  // Función para formatear la fecha a 'YYYY-MM-DD'
  const formatDate = (dateObj) => {
    return dateObj.toISOString().split('T')[0];
  };

  // Función que SIMULA la llamada a la API para obtener turnos
  const getAvailableSlotsAPI = useCallback((fechaSeleccionada) => {
    console.log(`Consultando turnos para la fecha: ${fechaSeleccionada}`);
    return new Promise((resolve) => {
      // Simulamos el retraso de 1 segundo de la red
      setTimeout(() => {
        const turnosReservados = reservas
          .filter(reserva => reserva.fecha === fechaSeleccionada)
          .map(reserva => reserva.hora);
        
        const turnosDisponibles = todosLosTurnos.filter(
          turno => !turnosReservados.includes(turno)
        );
        resolve(turnosDisponibles);
      }, 1000);
    });
  }, [reservas]); // Dependemos de 'reservas' para que se recalcule si cambian

  // Este useEffect se ejecuta cada vez que la 'date' seleccionada cambia
  useEffect(() => {
    if (!date) return;

    setAvailableSlots([]);
    setSelectedSlot(null);
    setBookingMessage('');
    setIsLoading(true);

    const formattedDate = formatDate(date);

    getAvailableSlotsAPI(formattedDate)
      .then(slots => {
        setAvailableSlots(slots);
      })
      .catch(error => {
        console.error('Error al obtener los turnos:', error);
        setBookingMessage('Error al cargar los turnos. Intente más tarde.');
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, [date, getAvailableSlotsAPI]); // El efecto depende de la fecha y de nuestra función API simulada

  // Función para deshabilitar fines de semana
  const isWeekend = ({ date, view }) => {
    if (view === 'month') {
      return date.getDay() === 0 || date.getDay() === 6;
    }
  };

  // Función que SIMULA la llamada a la API para reservar un turno
  const handleBooking = (slot) => {
    const formattedDate = formatDate(date);
    const nuevaReserva = { fecha: formattedDate, hora: slot };
    
    // Actualizamos nuestro estado de 'reservas'
    setReservas(prevReservas => [...prevReservas, nuevaReserva]);

    setBookingMessage(`¡Turno para las ${slot} reservado con éxito!`);
    
    // Opcional: podrías volver a llamar a la API simulada para refrescar,
    // pero es más eficiente simplemente quitar el turno de la lista actual.
    setAvailableSlots(prevSlots => prevSlots.filter(s => s !== slot));
    setSelectedSlot(null);

    console.log('Reservas actualizadas:', [...reservas, nuevaReserva]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Reserva de Turnos (Frontend-Only)</h1>
      </header>
      <main className="container">
        <div className="calendar-container">
          <h2>1. Selecciona un día</h2>
          <Calendar
            onChange={setDate}
            value={date}
            minDate={new Date()}
            tileDisabled={isWeekend}
            className="custom-calendar"
          />
        </div>

        <div className="slots-container">
          <h2>2. Elige un horario disponible</h2>
          {isLoading ? (
            <div className="loader">Cargando turnos...</div>
          ) : (
            <>
              <div className="slots-grid">
                {availableSlots.length > 0 ? (
                  availableSlots.map((slot) => (
                    <button 
                      key={slot} 
                      className={`slot ${selectedSlot === slot ? 'selected' : ''}`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </button>
                  ))
                ) : (
                  <p>No hay turnos disponibles para este día.</p>
                )}
              </div>
              
              {selectedSlot && (
                <div className="booking-confirmation">
                    <p>Confirmar reserva para el <strong>{formatDate(date)}</strong> a las <strong>{selectedSlot}</strong></p>
                    <button className="confirm-button" onClick={() => handleBooking(selectedSlot)}>
                      Confirmar Reserva
                    </button>
                </div>
              )}

              {bookingMessage && <p className="booking-message">{bookingMessage}</p>}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default AppCalendar;