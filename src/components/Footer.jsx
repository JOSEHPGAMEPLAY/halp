import { Button, Link } from "@nextui-org/react";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";

const Footer = () => {
    return (
        <footer className="flex flex-col items-center justify-center gap-3 bg-gray-800 p-4 text-white md:flex-row">
            <p>
                &copy; 2024 Hacienda Agroturistica La Perla. Todos los derechos
                reservados.
            </p>
            <div className="flex gap-3">
                <Link className="text-white">
                    <FaFacebookSquare className="size-7" />
                </Link>
                <Link className="text-white">
                    <FaInstagramSquare className="size-7" />
                </Link>
                <Link className="text-white">
                    <FaXTwitter className="size-7" />
                </Link>
                <Link className="text-white">
                    <AiFillTikTok className="size-8" />
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
