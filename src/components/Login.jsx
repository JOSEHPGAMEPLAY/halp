import React, { useState } from "react";
import { getUserRole, loginUser } from "../services/authService";
import {
    Input,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Link,
    CircularProgress,
} from "@nextui-org/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidation } from "../validations/LoginValidation";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authSlice";

const Login = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(LoginValidation),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [Loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await loginUser(data.email, data.password);
            localStorage.setItem("userId", response.uid);
            dispatch(
                login({
                    user: {
                        uid: response.uid,
                        email: response.email,
                        userName: response.displayName,
                    },
                    role: await getUserRole(response.uid),
                }),
            );
            alert("Inicio de sesión exitoso");
            reset();
            navigate("/");
        } catch (err) {
            alert("Error al iniciar sesión. Verifica tus credenciales.");
        }
        setLoading(false);
    };

    return (
        <Card className="w-full max-w-md p-5">
            <CardHeader className="text-center">
                <h3 className="text-xl font-semibold">Iniciar Sesión</h3>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        fullWidth
                        type="text"
                        label="Correo Electrónico"
                        placeholder="Ingrese su correo"
                        autoComplete="email"
                        {...register("email")}
                        isInvalid={!!errors.email}
                        errorMessage={errors.email?.message}
                    />
                    <Input
                        fullWidth
                        type={passwordVisible ? "text" : "password"}
                        label="Contraseña"
                        placeholder="Ingrese su contraseña"
                        {...register("password")}
                        errorMessage={errors.password?.message}
                        isInvalid={!!errors.password}
                        autoComplete="current-password"
                        endContent={
                            <button
                                type="button"
                                onClick={() =>
                                    setPasswordVisible(!passwordVisible)
                                }
                            >
                                {passwordVisible ? (
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
                            "Iniciar Sesión"
                        )}
                    </Button>
                </form>
            </CardBody>
            <CardFooter className="text-center">
                <p>
                    ¿No tienes una cuenta?{" "}
                    <Link
                        as={LinkRouter}
                        to="/signup"
                        className="text-blue-500"
                    >
                        Regístrate
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
};

export default Login;
