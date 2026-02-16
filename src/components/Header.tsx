import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            <span className="text-xl font-bold text-primary">
              MemoryCare<span className="text-accent">Find</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/states" className="text-gray-600 hover:text-primary transition-colors">
              Browse by State
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">
              About
            </Link>
          </nav>
          <Link
            href="/get-started"
            className="bg-accent text-white px-4 py-2 rounded-lg font-medium hover:bg-accent-light transition-colors"
          >
            Find Care Now
          </Link>
        </div>
      </div>
    </header>
  );
}
