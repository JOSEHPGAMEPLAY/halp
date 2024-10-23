import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";

// Registrar usuario
const registerUser = async (username, email, password, role = "user") => {
    try {
        // Crear el usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
        );
        const user = userCredential.user;

        // Actualizar el perfil del usuario con el displayName (username)
        await updateProfile(user, {
            displayName: username,
        });

        // Guardar el rol del usuario en Firestore
        await setDoc(doc(db, "users", user.uid), {
            username: username,
            email: user.email,
            role: role,
        });

        return user;
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        throw error;
    }
};

// Inicia sesión y obtiene el rol del usuario
const loginUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
    );
    const user = userCredential.user;

    return user; // Solo retornamos el usuario para que lo manejemos en el frontend
};

// Cerrar sesión de usuario
const logoutUser = () => {
    return signOut(auth);
};

// Obtiene el rol del usuario desde Firestore
const getUserRole = async (uid) => {
    const userDoc = doc(db, "users", uid);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
        return docSnap.data().role; // Asumiendo que el campo `role` existe
    } else {
        throw new Error("No se encontró el documento del usuario");
    }
};

export { registerUser, loginUser, logoutUser, getUserRole };
