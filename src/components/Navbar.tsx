import Link from "next/link";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel rounded-2xl px-6 py-3">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          CASUAL<span className="text-blue-500">BROTHERS</span>
        </Link>
        
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <Link href="/games" className="hover:text-blue-400 transition-colors">GAMES</Link>
          <Link href="/careers" className="hover:text-blue-400 transition-colors">CAREERS</Link>
          <Link href="/contact" className="hover:text-blue-400 transition-colors">CONTACT</Link>
        </div>

        <button className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors">
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}
