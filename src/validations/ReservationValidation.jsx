
import * as yup from "yup";

export const reservationValidation = yup.object().shape({
    name: yup.string().required("El nombre es obligatorio"),
    email: yup
        .string()
        .email("Correo electrónico no válido")
        .required("El correo es obligatorio"),
    date: yup
        .date()
        .min(new Date(), "La fecha debe ser de hoy o en adelante")
        .required("La fecha es obligatoria"),
    service: yup.string().required("Selecciona un servicio"),
    details: yup.string(),
});