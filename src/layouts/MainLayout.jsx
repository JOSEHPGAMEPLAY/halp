import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthHandler from "../hooks/AuthHandler";

const MainLayout = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    return (
        <div className="flex min-h-screen flex-col">
            <AuthHandler setIsLoggedIn={setIsLoggedIn} />
            <Navbar isLoggedIn={isLoggedIn} />
            <main className="flex grow justify-center bg-gray-100">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
