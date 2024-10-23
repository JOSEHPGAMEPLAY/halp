import * as yup from "yup";

export const addProductValidation = yup.object().shape({
    nombre: yup.string().required("El nombre es obligatorio"),
    descripcion: yup.string().required("La descripción es obligatoria"),
    categoria: yup.string().required("La categoria es obligatoria"),
    precio: yup
        .number()
        .transform((value, originalValue) =>
            typeof originalValue === "string" && originalValue.trim() === ""
                ? null
                : value
        )
        .min(0, "Debe ser al menos 0")
        .required("El precio es obligatorio"),
    stock: yup
        .number()
        .transform((value, originalValue) =>
            typeof originalValue === "string" && originalValue.trim() === ""
                ? null
                : value
        )
        .min(0, "Debe ser al menos 0")
        .required("La cantidad es obligatoria"),
    image: yup
        .mixed()
        .required("La imagen es obligatoria")
        .test(
            "fileFormat",
            "El formato de la imagen no es válido. Solo se permiten formatos .jpg, .jpeg, .png.",
            (value) => {
                // Si no hay archivo, fallar la validación
                if (!value || value.length === 0) return false;

                // Obtener el primer archivo del FileList
                const imagen = value[0];

                const supportedFormats = [
                    "image/jpeg",
                    "image/png",
                ];

                return supportedFormats.includes(imagen.type);
            }
        ),
});
