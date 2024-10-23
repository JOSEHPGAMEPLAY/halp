import { useEffect } from "react";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";

const INACTIVITY_TIME_LIMIT = 60 * 60 * 1000; // 10 minutos de inactividad

const AuthHandler = ({ setIsLoggedIn }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        let timeoutId;

        const handleInactivity = () => {
            setIsLoggedIn(false);
            dispatch(logout());
        };

        const resetInactivityTimer = () => {
            clearTimeout(timeoutId);
            // Reinicia el temporizador
            timeoutId = setTimeout(handleInactivity, INACTIVITY_TIME_LIMIT);
        };

        window.addEventListener("mousemove", resetInactivityTimer);
        window.addEventListener("keydown", resetInactivityTimer);

        timeoutId = setTimeout(handleInactivity, INACTIVITY_TIME_LIMIT);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("mousemove", resetInactivityTimer);
            window.removeEventListener("keydown", resetInactivityTimer);
        };
    }, [dispatch, setIsLoggedIn]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setIsLoggedIn(!!user);
        });

        return () => unsubscribe();
    }, [setIsLoggedIn]);

    return null;
};

export default AuthHandler;
