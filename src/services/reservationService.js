import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Agregar una reserva
const addReservation = async (reservation) => {
  try {
    const docRef = await addDoc(collection(db, 'reservations'), reservation);
    console.log('Reserva agregada con ID: ', docRef.id);
  } catch (e) {
    console.error('Error al agregar reserva: ', e);
  }
};

// Obtener todas las reservas
const getReservations = async () => {
  const querySnapshot = await getDocs(collection(db, 'reservations'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export { addReservation, getReservations };
