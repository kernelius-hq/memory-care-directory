import Link from "next/link";
import { Metadata } from "next";
import { getStates } from "@/data/listings";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Browse Senior Home Care by State",
  description:
    "Find in-home senior care providers in all 50 states. Browse our directory by state to find trusted home care agencies near you.",
};

export default function StatesPage() {
  const states = getStates();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "All States" }]} />
      <h1 className="text-3xl font-bold mb-2">Senior Home Care by State</h1>
      <p className="text-gray-500 mb-8">
        Browse trusted in-home senior care providers across the United States.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {states.map((state) => (
          <Link
            key={state.slug}
            href={`/${state.slug}`}
            className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all"
          >
            <div>
              <span className="font-semibold text-gray-900">{state.name}</span>
              <p className="text-sm text-gray-500">
                {state.count} provider{state.count !== 1 ? "s" : ""}
              </p>
            </div>
            <span className="text-gray-400">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
