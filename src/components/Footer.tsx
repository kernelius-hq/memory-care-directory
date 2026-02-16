import Link from "next/link";
import { getStates } from "@/data/listings";

export default function Footer() {
  const states = getStates();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              🧠 MemoryCareFind
            </h3>
            <p className="text-sm text-gray-400">
              Helping families find trusted in-home dementia and memory care
              providers across the United States.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Browse by State</h4>
            <ul className="space-y-2 text-sm">
              {states.slice(0, 8).map((state) => (
                <li key={state.slug}>
                  <Link
                    href={`/${state.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {state.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Care Services Guide
                </Link>
              </li>
              <li>
                <Link href="/states" className="hover:text-white transition-colors">
                  All States
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">For Providers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/get-started" className="hover:text-white transition-colors">
                  List Your Agency
                </Link>
              </li>
              <li>
                <Link href="/get-started" className="hover:text-white transition-colors">
                  Claim Your Listing
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} MemoryCareFind.com. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
