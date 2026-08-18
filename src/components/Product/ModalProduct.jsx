import React, { useEffect, useState } from "react";
import {
    Button,
    Chip,
    CircularProgress,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    Textarea,
    Input,
    useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addProductValidation } from "../../validations/AddProductValidation";
import { updateImage, uploadImage } from "../../services/storage";
import { addDoc, collection } from "firebase/firestore";
import { addProduct, editProduct } from "../../services/productService";

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

const ModalProduct = ({
    isOpen,
    onOpenChange,
    defaultValues,
    fetchProducts,
}) => {
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
            nombre: "", // Si defaultValues.nombre existe, se asigna, si no, ""
            descripcion: "", // Mismo para los demás campos
            categoria: null,
            precio: null,
            stock: null,
            image: null,
        },
    });

    const onSubmit = async () => {
        if (!defaultValues) {
            const data = getValues();
            setLoading(true);
            try {
                const imageFile = data.image[0]; // Obtener el archivo de imagen
                const imageUrl = await uploadImage(imageFile, data.nombre); // Subir la imagen a Firebase Storage y obtener la URL

                const newProduct = {
                    nombre: data.nombre,
                    descripcion: data.descripcion,
                    categoria: data.categoria,
                    precio: data.precio,
                    stock: data.stock,
                    imageUrl: imageUrl,
                };

                await addProduct(newProduct);
                reset();
                fetchProducts;
                alert("Producto agregado con exito");
            } catch (error) {
                alert("Error al agregar producto");
                console.error("Error al agregar producto:", error);
            } finally {
                reset();
                setLoading(false);
            }
        } else {
            const data = getValues();
            setLoading(true);
            try {
                const imageFile = data.image[0]; // Obtener el archivo de imagen
                const imageUrl = await updateImage(
                    imageFile,
                    data.nombre,
                    defaultValues.imageUrl,
                ); // Subir la imagen a Firebase Storage y obtener la URL

                const newProduct = {
                    nombre: data.nombre,
                    descripcion: data.descripcion,
                    categoria: data.categoria,
                    precio: data.precio,
                    stock: data.stock,
                    imageUrl: imageUrl,
                };

                await editProduct(defaultValues.id,newProduct);
                reset();
                fetchProducts;
                alert("Producto editado con exito");
            } catch (error) {
                alert("Error al editar producto:");
                console.error("Error al agregar producto:", error);
            } finally {
                reset();
                setLoading(false);
            }
            reset();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={(open) => {
                onOpenChange();
                if (!open) reset();
            }}
            scrollBehavior="inside"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {defaultValues
                                ? "Editar Producto"
                                : "Agregar Producto"}
                        </ModalHeader>
                        <ModalBody onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                label="Nombre del Producto"
                                {...register("nombre")}
                                errorMessage={errors.nombre?.message}
                                isInvalid={!!errors.nombre}
                                fullWidth
                                description={
                                    defaultValues
                                        ? `Valor anterior ${defaultValues?.nombre ?? ""}`
                                        : ""
                                }
                            />
                            <Textarea
                                label="Descripción"
                                {...register("descripcion")}
                                errorMessage={errors.descripcion?.message}
                                isInvalid={!!errors.descripcion}
                                fullWidth
                                description={
                                    defaultValues
                                        ? `Valor anterior ${defaultValues?.descripcion ?? ""}`
                                        : ""
                                }
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
                                description={
                                    defaultValues
                                        ? `Valor anterior ${defaultValues?.categoria ?? ""}`
                                        : ""
                                }
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
                                description={
                                    defaultValues
                                        ? `Valor anterior ${defaultValues?.precio ?? ""}`
                                        : ""
                                }
                            />
                            <Input
                                label="Cantidad"
                                type="number"
                                {...register("stock")}
                                errorMessage={errors.stock?.message}
                                isInvalid={!!errors.stock}
                                fullWidth
                                description={
                                    defaultValues
                                        ? `Valor anterior ${defaultValues?.stock ?? ""}`
                                        : ""
                                }
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
                                ) : !defaultValues ? (
                                    "Agregar Producto"
                                ) : (
                                    "Editar"
                                )}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ModalProduct;
