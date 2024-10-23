import React, { useState } from "react";
import {
    Input,
    Button,
    Card,
    CardBody,
    Divider,
    Select,
    SelectItem,
    CircularProgress,
} from "@nextui-org/react";
import { DatePicker } from "@nextui-org/date-picker";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../services/firebase";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

// Esquema de validación con Yup
const schema = yup.object().shape({
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

const Reservations = () => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: null,
            email: null,
            date: null,
            service: null,
            details: null,
        },
    });
    const [Loading, setLoading] = useState(false);
    const [Message, setMessage] = useState("");

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const reservationData = {
                ...data,
                date: data.date
                    ? Timestamp.fromDate(new Date(data.date))
                    : null,
            };
            await addDoc(collection(db, "reservas"), reservationData);
            setMessage("Reserva enviada con éxito!");
            reset();
            alert("Reserva enviada con éxito!");
        } catch (e) {
            console.error("Error al enviar la reserva:", e);
            alert(
                "Hubo un error al enviar tu reserva. Por favor, intenta nuevamente."
            );
        }
        setLoading(false);
    };

    const services = [
        { value: "tour", label: "Tour por la Hacienda" },
        { value: "degustacion", label: "Degustación de Productos" },
        { value: "actividad", label: "Actividad Agroturística" },
    ];

    return (
            <div className="w-full max-w-lg my-[3%]">
                <h2 className="text-center mb-6 text-3xl font-semibold">
                    Reserva Tu Visita
                </h2>
                <Card>
                    <CardBody>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <Input
                                label="Nombre Completo"
                                placeholder="Ingresa tu nombre"
                                fullWidth
                                {...register("name")}
                                errorMessage={errors.name?.message}
                                isInvalid={!!errors.name}
                            />
                            <Input
                                label="Correo Electrónico"
                                placeholder="Ingresa tu correo"
                                type="text"
                                autoComplete="email"
                                fullWidth
                                {...register("email")}
                                errorMessage={errors.email?.message}
                                isInvalid={!!errors.email}
                            />
                            <DatePicker
                                label="Fecha de la Reserva"
                                placeholder="Selecciona la fecha"
                                fullWidth
                                onChange={(date) => setValue("date", date)}
                                errorMessage={errors.date?.message}
                                isInvalid={!!errors.date}
                                data-testid="date-picker"
                            />
                            <Select
                                label="Tipo de Servicio"
                                placeholder="Selecciona el servicio"
                                fullWidth
                                {...register("service")}
                                onSelectionChange={(value) =>
                                    setValue("service", value)
                                }
                                errorMessage={errors.service?.message}
                                isInvalid={!!errors.service}
                                data-testid="service-select"
                            >
                                {services.map((service) => (
                                    <SelectItem
                                        key={service.value}
                                        value={service.value}
                                    >
                                        {service.label}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Input
                                label="Detalles Adicionales"
                                placeholder="Escribe detalles adicionales"
                                fullWidth
                                {...register("details")}
                            />
                            <Divider />
                            <Button type="submit" color="primary" fullWidth>
                                {Loading ? (
                                    <CircularProgress aria-label="Loading..." />
                                ) : (
                                    "Enviar Reserva"
                                )}
                            </Button>
                        </form>
                    </CardBody>
                </Card>
                {Message ? <p className="text-green-600">{Message}</p> : ""}
            </div>
    );
};

export default Reservations;
