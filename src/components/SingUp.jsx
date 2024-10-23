import { useState } from "react";
import { registerUser } from "../services/authService";
import {
    Input,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CircularProgress,
    Link,
} from "@nextui-org/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import { SingUpValidation } from "../validations/SingUpValidation";
import { useDispatch } from "react-redux";

const SignUp = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(SingUpValidation),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [Loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await registerUser(
                data.username,
                data.email,
                data.password,
            );
            dispatch(
                login({
                    user: {
                        uid: response.uid,
                        email: response.email,
                        userName: response.displayName,
                    },
                    role: getUserRole(response.uid),
                }),
            );
            alert("Registro exitoso.");
            reset();
            navigate("/");
        } catch (err) {
            alert("Error en el registro. Inténtalo de nuevo.");
        }
        setLoading(false);
    };

    return (
        <Card className="w-full max-w-md p-5">
            <CardHeader className="text-center">
                <h3 className="text-xl font-semibold">Crear Cuenta</h3>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        label="Nombre de Usuario"
                        type="text"
                        placeholder="Ingrese un nombre de usuario"
                        autoComplete="username"
                        fullWidth
                        {...register("username")}
                        errorMessage={errors.username?.message}
                        isInvalid={!!errors.username}
                    />
                    <Input
                        label="Correo Electrónico"
                        type="text"
                        placeholder="Ingrese su correo"
                        autoComplete="email"
                        fullWidth
                        {...register("email")}
                        errorMessage={errors.email?.message}
                        isInvalid={!!errors.email}
                    />
                    <Input
                        fullWidth
                        type={passwordVisible ? "text" : "password"}
                        label="Contraseña"
                        placeholder="Ingrese su contraseña"
                        {...register("password")}
                        errorMessage={errors.password?.message}
                        isInvalid={!!errors.password}
                        autoComplete="new-password"
                        endContent={
                            <button
                                type="button"
                                onClick={() =>
                                    setPasswordVisible(!passwordVisible)
                                }
                                className="absolute right-3 top-3"
                            >
                                {passwordVisible ? (
                                    <FiEyeOff size={20} />
                                ) : (
                                    <FiEye size={20} />
                                )}
                            </button>
                        }
                    />
                    <Input
                        fullWidth
                        type={confirmPasswordVisible ? "text" : "password"}
                        label="Confirmar Contraseña"
                        placeholder="Confirme su contraseña"
                        {...register("confirmPassword")}
                        errorMessage={errors.confirmPassword?.message}
                        isInvalid={!!errors.confirmPassword}
                        autoComplete="new-password"
                        endContent={
                            <button
                                type="button"
                                onClick={() =>
                                    setConfirmPasswordVisible(
                                        !confirmPasswordVisible,
                                    )
                                }
                                className="absolute right-3 top-3"
                            >
                                {confirmPasswordVisible ? (
                                    <FiEyeOff size={20} />
                                ) : (
                                    <FiEye size={20} />
                                )}
                            </button>
                        }
                    />
                    <Button type="submit" fullWidth color="primary">
                        {Loading ? (
                            <CircularProgress aria-label="Loading..." />
                        ) : (
                            "Registrarse"
                        )}
                    </Button>
                </form>
            </CardBody>
            <CardFooter className="text-center">
                <p>
                    ¿Ya tienes una cuenta?{" "}
                    <Link as={LinkRouter} to="/login" className="text-blue-500">
                        Inicia sesión
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
};

export default SignUp;
