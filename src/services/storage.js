import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../services/firebase"; // Importa tu servicio de autenticación

export const uploadImage = async (file) => {
  const currentUser = auth.currentUser; // Obtiene el usuario autenticado actual

  if (!currentUser) {
    throw new Error("No tienes permiso para realizar esta acción. Inicia sesión primero.");
  }


  const storage = getStorage();
  const storageRef = ref(storage, `products/${file.name}`); // Referencia del archivo en Storage

  // Sube el archivo a Storage
  await uploadBytes(storageRef, file);

  // Obtiene la URL de descarga
  const imageUrl = await getDownloadURL(storageRef);
  return imageUrl;
};
