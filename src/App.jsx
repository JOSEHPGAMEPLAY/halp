import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SingUpPage";
import HomePage from "./pages/HomePage";
import ProductList from "./pages/ProductList";
import Reservations from "./pages/Reservations";
import ContactPage from "./pages/ContactPage";
import MainLayout from "./layouts/MainLayout";
import Cart from "./components/Cart";
function App() {
    return (
        <NextUIProvider>
                <Router>
                    <MainLayout>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignUpPage />} />
                            <Route
                                path="/productos"
                                element={<ProductList />}
                            />
                            <Route path="/carrito" element={<Cart />} />
                            <Route
                                path="/reservas"
                                element={<Reservations />}
                            />
                            <Route path="/contacto" element={<ContactPage />} />
                            <Route path="/*" element={<HomePage />} />
                        </Routes>
                    </MainLayout>
                </Router>
        </NextUIProvider>
    );
}

export default App;
