import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-5">
                <h1 className="text-4xl font-bold mb-4">
                    Bienvenido a La Perla
                </h1>
                <h3 className="text-xl mb-6">
                    Descubre la experiencia agroturística en Pamplona
                </h3>
                <Button as={Link} to="/productos" size="lg" color="primary">
                    Explora Nuestros Productos
                </Button>
            </div>
    );
};

export default HomePage;
