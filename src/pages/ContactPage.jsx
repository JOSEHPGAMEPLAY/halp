// src/pages/ContactPage.jsx
import React, { useState } from "react";
import { Input, Button, Card, CardBody, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";

// Esquema de validación con Yup
const schema = yup.object().shape({
    name: yup.string().required("El nombre es obligatorio"),
    email: yup
        .string()
        .email("Correo electrónico no válido")
        .required("El correo es obligatorio"),
    message: yup.string().required("El mensaje es obligatorio"),
});

const ContactPage = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        setSuccess(false);
        setError("");

        try {
            // Añadir mensaje de contacto a Firestore
            await addDoc(collection(db, "contactMessages"), {
                ...data,
                timestamp: new Date(),
            });
            setSuccess(true);
            reset(); // Limpiar formulario
        } catch (error) {
            console.error("Error al enviar el mensaje: ", error);
            setError(
                "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl w-full my-[3%]">
            <h2 className="text-center mb-6 text-3xl font-semibold">
                Contáctanos
            </h2>
            <Card>
                <CardBody>
                    {success && (
                        <p className="text-green-600 mb-4">
                            ¡Mensaje enviado con éxito!
                        </p>
                    )}
                    {error && <p className="text-red-600 mb-4">{error}</p>}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <Input
                            label="Nombre"
                            placeholder="Ingresa tu nombre"
                            fullWidth
                            {...register("name")}
                            isInvalid={!!errors.name}
                            errorMessage={errors.name?.message}
                        />
                        <Input
                            label="Correo Electrónico"
                            placeholder="Ingresa tu correo"
                            fullWidth
                            type="text"
                            {...register("email")}
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message}
                        />
                        <Textarea
                            label="Mensaje"
                            placeholder="Escribe tu mensaje"
                            fullWidth
                            {...register("message")}
                            isInvalid={!!errors.message}
                            errorMessage={errors.message?.message}
                        />
                        <Button
                            type="submit"
                            color="primary"
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? "Enviando..." : "Enviar Mensaje"}
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default ContactPage;
