import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart/cartSlice";

const CardProduct = (product) => {
    const dispatch = useDispatch();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [quantityToBuy, setQuantityToBuy] = useState(0);

    // Función para cerrar el modal
    const onBuyModalClose = () => {
        setQuantityToBuy(0);
    };

     // Verificar si el producto tiene la información necesaria antes de renderizar
     if (!product?.product?.precio) {
        return null; // No se renderiza la tarjeta si faltan datos
    }


    return (
        <Card isHoverable className="overflow-hidden rounded-lg shadow-md">
            <div className="relative h-52 w-full">
                <img
                    src={product.product.imageUrl}
                    alt={product.product.nombre}
                    className="h-full w-full object-cover"
                />
                <div className="absolute left-2 top-2 rounded-md bg-green-500 px-2 py-1 text-white shadow-md">
                    {product.product.precio
                        ? `$${product.product.precio}`
                        : "Consultar Precio"}
                </div>
            </div>
            <CardBody className="p-4">
                <div className="mb-2 flex items-center">
                    <h4 className="text-lg font-bold text-gray-800">
                        {product.product.nombre}
                    </h4>
                </div>
                <p className="mb-4 text-sm text-gray-600">
                    {product.product.descripcion}
                </p>
                {product.product.stock && (
                    <p className="text-xs text-gray-500">
                        <strong>Disponible:</strong> {product.product.stock}{" "}
                        unidades
                    </p>
                )}
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-center p-4">
                <Button
                    size="md"
                    color="primary"
                    className="w-full font-semibold"
                    onPress={onOpen}
                >
                    {product.product.stock > 0 ? "Comprar" : "Reservar"}
                </Button>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={(isOpenNow) => {
                        onOpenChange(isOpenNow);
                        if (!isOpenNow) {
                            onBuyModalClose();
                        }
                    }}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    {product.product.nombre}
                                </ModalHeader>
                                <ModalBody>
                                    <Input
                                        type="number"
                                        label="Cantidad de unidades a comprar:"
                                        placeholder="Unidades a comprar"
                                        labelPlacement="outside"
                                        max={product.product.stock}
                                        min={0}
                                        value={quantityToBuy}
                                        onChange={(e) =>
                                            setQuantityToBuy(
                                                Number(e.target.value),
                                            )
                                        }
                                    />
                                    <Input
                                        isDisabled
                                        label="El precio total es de:"
                                        value={
                                            quantityToBuy *
                                            product.product.precio
                                        }
                                        startContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-small text-default-400">
                                                    $
                                                </span>
                                            </div>
                                        }
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="danger"
                                        variant="light"
                                        onPress={onClose}
                                    >
                                        Cerrar
                                    </Button>
                                    <Button
                                        color="primary"
                                        onPress={onClose}
                                        onClick={() => {
                                            dispatch(
                                                addToCart({
                                                    id: product.product.id,
                                                    img: product.product
                                                        .imageUrl,
                                                    nombre: product.product
                                                        .nombre,
                                                    precio: product.product
                                                        .precio,
                                                    quantity: quantityToBuy,
                                                }),
                                            );
                                        }}
                                    >
                                        Comprar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </CardFooter>
        </Card>
    );
};

export default CardProduct;
