import * as yup from "yup";
export const LoginValidation = yup.object().shape({
    email: yup
        .string()
        .email("Correo electrónico no válido")
        .required("El correo es obligatorio"),
    password: yup
        .string()
        .required("La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
});
