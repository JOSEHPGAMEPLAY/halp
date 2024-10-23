import { useState, useEffect } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    Button,
    Divider,
    Input,
    CircularProgress,
    Modal,
    useDisclosure,
    ModalFooter,
    ModalContent,
    ModalHeader,
    ModalBody,
} from "@nextui-org/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import AddProduct from "../components/Product/AddProduct";
import CardProduct from "../components/Product/CardProduct";

const ProductList = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const { user } = useAuth();

    const fetchProducts = async (searchQuery) => {
        setLoading(true);
        try {
            const productsRef = collection(db, "products");
            const q = searchQuery
                ? query(
                      productsRef,
                      where("name", ">=", searchQuery),
                      where("name", "<=", searchQuery + "\uf8ff")
                  )
                : productsRef;

            const querySnapshot = await getDocs(q);
            const productList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productList);
        } catch (error) {
            console.error("Error al cargar los productos: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="bg-gray-100 flex flex-col min-h-screen py-10 px-5 items-center">
            <h2 className="text-center mb-6 text-3xl font-semibold">
                Nuestros Productos
            </h2>

            {user?.role === "admin" && (
                <AddProduct/>
            )}

            {loading ? (
                <CircularProgress
                    aria-label="Cargando productos..."
                    className="mx-auto"
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 min-w-full">
                    {products.map((product, index) => (
                        <CardProduct key={index} product={product}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
