import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addProductValidation } from "./../../validations/AddProductValidation";
import { uploadImage } from "../../services/storage";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/firebase";
import {
    Button,
    CircularProgress,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
    useDisclosure,
    Select,
    SelectItem,
    Chip,
} from "@nextui-org/react";
import { useState } from "react";

const productCategories = [
    { id: 1, label: "Frutas" },
    { id: 2, label: "Verduras" },
    { id: 3, label: "Lácteos" },
    { id: 4, label: "Carnes" },
    { id: 5, label: "Panadería" },
    { id: 6, label: "Bebidas" },
    { id: 7, label: "Snacks" },
    { id: 8, label: "Productos de Limpieza" },
    { id: 9, label: "Cosméticos" },
    { id: 10, label: "Electrónica" },
    { id: 11, label: "Ropa" },
    { id: 12, label: "Juguetes" },
    { id: 13, label: "Hogar" },
    { id: 14, label: "Deportes" },
    { id: 15, label: "Salud" },
    { id: 16, label: "Mascotas" },
];

const AddProduct = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(addProductValidation),
        defaultValues: {
            nombre: "",
            descripcion: "",
            categoria: null,
            precio: null,
            stock: null,
            image: null,
        },
    });
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const onSubmit = async () => {
        const data = getValues();
        setLoading(true);
        try {
            const imageFile = data.image[0]; // Obtener el archivo de imagen
            const imageUrl = await uploadImage(imageFile); // Subir la imagen a Firebase Storage y obtener la URL

            const newProduct = {
                nombre: data.nombre,
                descripcion: data.descripcion,
                categoria: data.categoria,
                precio: data.precio,
                stock: data.stock,
                imageUrl: imageUrl,
            };

            await addDoc(collection(db, "products"), newProduct);
            fetchProducts(); // Refrescar la lista de productos
            reset(); // Reiniciar el formulario
        } catch (error) {
            console.error("Error al agregar producto:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleModalChange = (open) => {
        onOpenChange(open);
        if (!open) {
            reset(); // Reiniciar el formulario si el modal se cierra
        }
    };

    return (
        <>
            <Button color="success" onPress={onOpen} className="mb-6 w-fit">
                Agregar Producto
            </Button>
            <Modal isOpen={isOpen} onOpenChange={handleModalChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                {" "}
                                <ModalHeader className="flex flex-col gap-1">
                                    Detalles de producto
                                </ModalHeader>
                                <ModalBody>
                                    <Input
                                        label="Nombre del Producto"
                                        {...register("nombre")}
                                        errorMessage={errors.nombre?.message}
                                        isInvalid={!!errors.nombre}
                                        fullWidth
                                    />
                                    <Textarea
                                        label="Descripción"
                                        {...register("descripcion")}
                                        errorMessage={
                                            errors.descripcion?.message
                                        }
                                        isInvalid={!!errors.descripcion}
                                        fullWidth
                                    />
                                    <Select
                                        items={productCategories}
                                        label="Categoria:"
                                        isMultiline={true}
                                        selectionMode="multiple"
                                        placeholder="Seleccione la categoria"
                                        classNames={{
                                            trigger: "min-h-12 py-2",
                                        }}
                                        {...register("categoria")}
                                        renderValue={(items) => {
                                            return (
                                                <div className="flex flex-wrap gap-2">
                                                    {items.map((item) => (
                                                        <Chip key={item.key}>
                                                            {item.data.label}
                                                        </Chip>
                                                    ))}
                                                </div>
                                            );
                                        }}
                                    >
                                        {(categoria) => (
                                            <SelectItem
                                                key={categoria.label}
                                                textValue={categoria.label}
                                            >
                                                <div>
                                                    <span className="text-small">
                                                        {categoria.label}
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        )}
                                    </Select>
                                    <Input
                                        label="Precio"
                                        type="number"
                                        {...register("precio")}
                                        errorMessage={errors.precio?.message}
                                        isInvalid={!!errors.precio}
                                        fullWidth
                                    />
                                    <Input
                                        label="Cantidad"
                                        type="number"
                                        {...register("stock")}
                                        errorMessage={errors.stock?.message}
                                        isInvalid={!!errors.stock}
                                        fullWidth
                                    />
                                    <Input
                                        label="Subir imagen"
                                        type="file"
                                        {...register("image")}
                                        errorMessage={errors.image?.message}
                                        isInvalid={!!errors.image}
                                        fullWidth
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
                                        type="submit"
                                        color="primary"
                                        disabled={loading}
                                        onClick={onSubmit}
                                    >
                                        {loading ? (
                                            <CircularProgress aria-label="Cargando..." />
                                        ) : (
                                            "Agregar Producto"
                                        )}
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddProduct;
