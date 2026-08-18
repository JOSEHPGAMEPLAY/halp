
import * as yup from "yup";

export const contactValidation = yup.object().shape({
    name: yup.string().required("El nombre es obligatorio"),
    email: yup
        .string()
        .email("Correo electrónico no válido")
        .required("El correo es obligatorio"),
    message: yup.string().required("El mensaje es obligatorio"),
});