import { FaCopyright } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white h-16 flex items-center justify-center p-4">
      <div className="flex items-center">
        <FaCopyright className="mr-2 text-lg" />
        <span className="text-sm sm:text-base">Kazakhstan events</span>
      </div>
    </footer>
  );
}
