import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

// Agregar un producto
const addProduct = async (product) => {
    try {
        const docRef = await addDoc(collection(db, "products"), product);
        console.log("Producto agregado con ID: ", docRef.id);
    } catch (e) {
        console.error("Error al agregar producto: ", e);
    }
};

// Obtener todos los productos
const getProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Obtener un producto específico por su ID
const getProductById = async (productId) => {
    try {
        const productRef = doc(db, "products", productId); // Referencia al documento del producto
        const productSnap = await getDoc(productRef); // Obtén el documento específico

        if (productSnap.exists()) {
            return { id: productSnap.id, ...productSnap.data() }; // Retorna el producto si existe
        } else {
            console.log("El producto no existe.");
            return null; // Retorna null si no se encuentra
        }
    } catch (error) {
        console.error("Error al obtener el producto: ", error);
        throw new Error("No se pudo obtener el producto.");
    }
};

// Editar un producto
const editProduct = async (id, updatedProduct) => {
    try {
        const productRef = doc(db, "products", id);
        await updateDoc(productRef, updatedProduct);
        console.info("Producto editado con éxito");
    } catch (e) {
        console.error("Error al editar el producto: ", e);
    }
};

// Eliminar un producto
const deleteProductById = async (id) => {
    try {
        const productRef = doc(db, "products", id);
        await deleteDoc(productRef);
        console.log("Producto eliminado con éxito");
    } catch (e) {
        console.error("Error al eliminar el producto: ", e);
    }
};

// Eliminar una lista de productos por ID
const deleteProductsByIds = async (productIds) => {
    try {
        const deletePromises = productIds.map((id) => {
            const productRef = doc(db, "products", id);
            return deleteDoc(productRef);
        });
        await Promise.all(deletePromises); // Ejecutar todas las eliminaciones en paralelo
        console.log("Productos eliminados con éxito");
    } catch (e) {
        console.error("Error al eliminar productos: ", e);
    }
};

// Eliminar todos los productos
const deleteAllProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const deletePromises = querySnapshot.docs.map((doc) =>
            deleteDoc(doc.ref),
        );
        await Promise.all(deletePromises);
        console.log("Todos los productos fueron eliminados con éxito");
    } catch (e) {
        console.error("Error al eliminar todos los productos: ", e);
    }
};

export {
    addProduct,
    editProduct,
    getProducts,
    getProductById,
    deleteProductById,
    deleteProductsByIds,
    deleteAllProducts,
};
