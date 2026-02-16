import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStates, getCitiesByState, getListingsByState } from "@/data/listings";
import ListingCard from "@/components/ListingCard";
import Breadcrumb from "@/components/Breadcrumb";

interface Props {
  params: Promise<{ state: string }>;
}

export async function generateStaticParams() {
  return getStates().map((state) => ({ state: state.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const states = getStates();
  const state = states.find((s) => s.slug === stateSlug);
  if (!state) return {};

  return {
    title: `In-Home Dementia Care in ${state.name} - ${state.count} Providers`,
    description: `Find trusted in-home dementia and memory care providers in ${state.name}. Compare ${state.count} specialized Alzheimer's care agencies, read reviews, and get free consultations.`,
  };
}

export default async function StatePage({ params }: Props) {
  const { state: stateSlug } = await params;
  const states = getStates();
  const state = states.find((s) => s.slug === stateSlug);

  if (!state) notFound();

  const cities = getCitiesByState(stateSlug);
  const allListings = getListingsByState(stateSlug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: state.name }]} />

      <h1 className="text-3xl font-bold mb-2">
        In-Home Dementia &amp; Memory Care in {state.name}
      </h1>
      <p className="text-gray-500 mb-8">
        Browse {state.count} trusted in-home dementia care provider
        {state.count !== 1 ? "s" : ""} across {state.name}.
      </p>

      {/* Cities */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">
          Browse by City in {state.name}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/${stateSlug}/${city.slug}`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-sm transition-all"
            >
              <span className="font-medium text-gray-800">{city.name}</span>
              <span className="text-sm text-gray-400">{city.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* All Listings */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          All Dementia Care Providers in {state.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allListings.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      </section>
    </div>
  );
}
