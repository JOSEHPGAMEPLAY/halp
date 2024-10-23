import {
    Button,
    Chip,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Tooltip,
    Avatar,
    Input,
} from "@nextui-org/react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
    decrementQuantity,
    incrementQuantity,
    removeFromCart,
    setQuantity,
} from "../redux/cart/cartSlice";

const sendWhatsAppMessage = (cartItems) => {
    const adminPhoneNumber = "573143176463"; // Número del administrador con código de país
    let message =
        "Hola, estoy interesado en comprar los siguientes productos:\n\n";
    let preciototal = 0;
    // Generar el mensaje con la lista de productos
    cartItems.forEach((item, index) => {
        message += `${index + 1}. Producto: ${item.nombre}, Cantidad: ${item.quantity}, Precio: $ ${item.precio}\n`;
        preciototal += item.precio * item.quantity;
    });

    message += `\nPrecio total: $ ${preciototal}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank"); // Abre WhatsApp en una nueva pestaña
};

const Cart = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.cart);

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    const handleChange = (e, id) => {
        const value = parseInt(e.target.value, 10);
        dispatch(setQuantity({ productId: id, quantity: value }));
    };

    const handleBuyClick = () => {
        sendWhatsAppMessage(items);
    };

    return (
        <div className="pt-[2%]">
            <h2 className="mb-4 text-4xl font-bold text-blue-600">
                Carrito de Compras
            </h2>
            <Table aria-label="Example empty table">
                <TableHeader>
                    <TableColumn></TableColumn>
                    <TableColumn>NOMBRE</TableColumn>
                    <TableColumn>CANTIDAD</TableColumn>
                    <TableColumn>PRECIO</TableColumn>
                    <TableColumn>ACCIONES</TableColumn>
                </TableHeader>
                <TableBody
                    emptyContent={
                        <p className="font-bold">El carrito está vacio</p>
                    }
                    items={items}
                >
                    {(item) => (
                        <TableRow key={item.key}>
                            <TableCell>
                                <Avatar
                                    radius="md"
                                    src={getKeyValue(item, "img")}
                                />
                            </TableCell>
                            <TableCell>{getKeyValue(item, "nombre")}</TableCell>
                            <TableCell>
                                <Input
                                    className="w-40"
                                    classNames={{ input: "text-center" }}
                                    startContent={
                                        <Button
                                            isIconOnly
                                            onClick={() =>
                                                handleDecrement(
                                                    getKeyValue(item, "id"),
                                                )
                                            }
                                        >
                                            <AiOutlineMinus />
                                        </Button>
                                    }
                                    endContent={
                                        <Button
                                            isIconOnly
                                            onClick={() =>
                                                handleIncrement(
                                                    getKeyValue(item, "id"),
                                                )
                                            }
                                        >
                                            <AiOutlinePlus />
                                        </Button>
                                    }
                                    value={getKeyValue(item, "quantity")}
                                    min="1"
                                    max="100"
                                    onChange={(e) =>
                                        handleChange(e, getKeyValue(item, "id"))
                                    }
                                />
                            </TableCell>
                            <TableCell>
                                <b>$ </b>
                                {getKeyValue(item, "precio") *
                                    getKeyValue(item, "quantity")}
                            </TableCell>
                            <TableCell>
                                <Tooltip
                                    color="warning"
                                    content="Eliminar Producto"
                                >
                                    <Button
                                        color="warning"
                                        variant="flat"
                                        onClick={() =>
                                            dispatch(
                                                removeFromCart(
                                                    getKeyValue(item, "id"),
                                                ),
                                            )
                                        }
                                    >
                                        <RiDeleteBin6Line />
                                    </Button>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Button
                color="primary"
                className="float float-right mt-5"
                onClick={handleBuyClick}
            >
                Comprar
            </Button>
        </div>
    );
};

export default Cart;
