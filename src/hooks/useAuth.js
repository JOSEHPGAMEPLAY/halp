import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../services/firebase"; // Asegúrate de importar 'db' si usas Firestore
import { doc, getDoc } from "firebase/firestore";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listener de cambios de autenticación de Firebase
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Si el usuario está autenticado, obtenemos su información adicional de Firestore
        try {
          const userDocRef = doc(db, "users", currentUser.uid); // Supongamos que tienes una colección 'users' con documentos por uid
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            // Combina la información del usuario de Firebase con la información adicional de Firestore
            const additionalData = userDoc.data();
            const fullUserInfo = { ...currentUser, ...additionalData };
            setUser(fullUserInfo);
          } else {
            // Si no existe un documento en Firestore para el usuario, usa solo la información de Firebase
            setUser(currentUser);
          }
        } catch (error) {
          console.error("Error al obtener información adicional del usuario: ", error);
          setUser(currentUser); // En caso de error, sigue utilizando la información básica de Firebase
        }
      } else {
        // Si no hay un usuario autenticado, limpiamos el estado
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup function para desuscribirse del listener
    return () => unsubscribe();
  }, []);

  return { user, loading };
};
