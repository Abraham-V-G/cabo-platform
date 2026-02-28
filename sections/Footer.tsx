import { FaInstagram, FaFacebook, FaTripadvisor } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 md:px-20 py-16 border-t border-gray-800">

      <div className="flex flex-col md:flex-row justify-between items-center gap-8">

        <div className="text-lg font-semibold">
          TerraNova Global Adventures
        </div>

        <div className="flex gap-6 text-2xl">
          <a href="#" className="hover:opacity-70">
            <FaInstagram />
          </a>
          <a href="#" className="hover:opacity-70">
            <FaFacebook />
          </a>
          <a href="#" className="hover:opacity-70">
            <FaTripadvisor />
          </a>
        </div>

      </div>

      <div className="mt-10 text-sm opacity-50 text-center">
        © {new Date().getFullYear()} TerraNova Global Adventures. All rights reserved.
      </div>

    </footer>
  );
}