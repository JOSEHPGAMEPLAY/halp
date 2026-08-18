import { useState, useEffect } from "react";
import {
    CircularProgress,
} from "@nextui-org/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import CardProduct from "../components/Product/CardProduct";
import TableProduct from "../components/Product/TableProduct";

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
                      where("name", "<=", searchQuery + "\uf8ff"),
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
    }, [setProducts]);

    return (
        <div className="flex min-h-screen min-w-screen flex-col items-center px-5 py-10">
            <h2 className="mb-6 text-center text-3xl font-semibold">
                Nuestros Productos
            </h2>
            {loading ? (
                <CircularProgress
                    aria-label="Cargando productos..."
                    className="mx-auto"
                />
            ) : user?.role === "admin" ? (
                <TableProduct products={products} fetchProducts={fetchProducts}/>
            ) : (
                <div className="grid min-w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                    {products.map((product, index) => (
                        <CardProduct key={index} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
