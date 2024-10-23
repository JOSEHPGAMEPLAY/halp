import * as yup from "yup";
export const SingUpValidation = yup.object().shape({
  username: yup.string().required("El nombre de usuario es obligatorio").min(3, "El nombre de usuario debe de tener almenos 3 caracteres"),
  email: yup.string().email("Correo electrónico no válido").required("El correo es obligatorio"),
  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("Confirmar la contraseña es obligatorio"),
});
