import {
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { BiPlus } from "react-icons/bi";
import ModalProduct from "./ModalProduct";

const AddProduct = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button color="success" onPress={onOpen} className="text-white w-fit" endContent={<BiPlus className="size-6"/>}>
                Agregar Producto
            </Button>
            <ModalProduct isOpen={isOpen} onOpenChange={onOpenChange} accion="agregar" />
        </>
    );
};

export default AddProduct;
