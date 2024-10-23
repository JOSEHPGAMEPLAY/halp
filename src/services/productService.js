import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Agregar un producto
const addProduct = async (product) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), product);
    console.log('Producto agregado con ID: ', docRef.id);
  } catch (e) {
    console.error('Error al agregar producto: ', e);
  }
};

// Obtener todos los productos
const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export { addProduct, getProducts };
