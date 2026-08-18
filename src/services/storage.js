import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { auth } from "../services/firebase";

export const uploadImage = async (file, nombre) => {
    const currentUser = auth.currentUser; // Obtiene el usuario autenticado actual

    if (!currentUser) {
        throw new Error(
            "No tienes permiso para realizar esta acción. Inicia sesión primero.",
        );
    }

    const storage = getStorage();
    const storageRef = ref(storage, `products/${nombre}`); // Referencia del archivo en Storage

    // Sube el archivo a Storage
    await uploadBytes(storageRef, file);

    // Obtiene la URL de descarga
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
};

// Función para eliminar una imagen en Firebase Storage
export const deleteImage = async (imageUrl) => {
    const currentUser = auth.currentUser; // Obtiene el usuario autenticado actual
    
    console.log(imageUrl);
    if (!currentUser) {
        throw new Error(
            "No tienes permiso para realizar esta acción. Inicia sesión primero.",
        );
    }

    const storage = getStorage();

    try {
        console.log(imageUrl);
        // Referencia a la imagen en Storage usando la URL de la imagen
        const imageRef = ref(storage, imageUrl);

        // Elimina la imagen
        await deleteObject(imageRef);
        console.log(`Imagen eliminada con éxito: ${imageUrl}`);
    } catch (error) {
        console.error("Error al eliminar la imagen: ", error);
        throw new Error("No se pudo eliminar la imagen.");
    }
};

// Función para subir o actualizar una imagen
export const updateImage = async (
    file,
    nombre,
    existingImageUrl = null,
) => {
    const currentUser = auth.currentUser; // Obtiene el usuario autenticado actual

    if (!currentUser) {
        throw new Error(
            "No tienes permiso para realizar esta acción. Inicia sesión primero.",
        );
    }

    const storage = getStorage();

    // Si hay una URL de imagen existente, eliminar la imagen anterior
    if (existingImageUrl) {
        try {
            const oldImageRef = ref(storage, existingImageUrl);
            await deleteObject(oldImageRef);
            console.info(`Imagen anterior eliminada: ${existingImageUrl}`);
        } catch (error) {
            console.error("Error al eliminar la imagen anterior: ", error);
        }
    }

    // Subir la nueva imagen
    const storageRef = ref(storage, `products/${nombre}`); // Nueva referencia para el archivo en Storage
    await uploadBytes(storageRef, file); // Sube el archivo a Storage

    // Obtener la nueva URL de descarga de la imagen
    const imageUrl = await getDownloadURL(storageRef);
    console.info("Nueva imagen subida: ", imageUrl);

    return imageUrl;
};
