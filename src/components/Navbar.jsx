import { useState } from "react";
import {
    Navbar as NavbarPerla,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    Button,
    Badge,
    Tooltip,
} from "@nextui-org/react";
import { FaLeaf, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link as LinkRouter } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ isLoggedIn }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const { items } = useSelector((state) => state.cart);
    return (
        <NavbarPerla onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <FaLeaf className="mr-2 text-2xl text-green-500" />
                    <span className="text-lg font-bold">La Perla</span>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden gap-4 sm:flex" justify="center">
                <NavbarItem>
                    <Link as={LinkRouter} to="/">
                        Inicio
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link as={LinkRouter} to="/productos">
                        Productos
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link as={LinkRouter} to="/reservas">
                        Reservas
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link as={LinkRouter} to="/contacto">
                        Contacto
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem
                    as={LinkRouter}
                    to="/carrito"
                    className="text-blue-500"
                >
                    <Badge
                        color="danger"
                        content={items.length}
                        variant="shadow"
                    >
                        <FaShoppingCart className="size-6" />
                    </Badge>
                </NavbarItem>
                <NavbarItem>
                    {isLoggedIn ? (
                        <Tooltip content={user?.userName ? user.userName : ""}>
                            <Badge
                                color="success"
                                content=""
                                variant="shadow"
                                placement="bottom-right"
                            >
                                <FaUser className="size-6 text-blue-500" />
                            </Badge>
                        </Tooltip>
                    ) : (
                        <Button as={LinkRouter} to="/login">
                            Iniciar Sesión
                        </Button>
                    )}
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem>
                    <Link as={LinkRouter} to="/">
                        Inicio
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link as={LinkRouter} to="/productos">
                        Productos
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link as={LinkRouter} to="/reservas">
                        Reservas
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link as={LinkRouter} to="/contacto">
                        Contacto
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </NavbarPerla>
    );
};

export default Navbar;
