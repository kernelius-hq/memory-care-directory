import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStates, getCitiesByState, getListingsByCity } from "@/data/listings";
import ListingCard from "@/components/ListingCard";
import LeadForm from "@/components/LeadForm";
import Breadcrumb from "@/components/Breadcrumb";

interface Props {
  params: Promise<{ state: string; city: string }>;
}

export async function generateStaticParams() {
  const states = getStates();
  const params: { state: string; city: string }[] = [];
  for (const state of states) {
    const cities = getCitiesByState(state.slug);
    for (const city of cities) {
      params.push({ state: state.slug, city: city.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params;
  const cities = getCitiesByState(stateSlug);
  const city = cities.find((c) => c.slug === citySlug);
  if (!city) return {};

  const stateInfo = getStates().find((s) => s.slug === stateSlug);

  return {
    title: `In-Home Dementia Care in ${city.name}, ${stateInfo?.name || city.state} - ${city.count} Providers`,
    description: `Find specialized in-home dementia and memory care in ${city.name}, ${city.state}. Compare ${city.count} local Alzheimer's care agencies, read reviews, check pricing, and request free consultations.`,
  };
}

export default async function CityPage({ params }: Props) {
  const { state: stateSlug, city: citySlug } = await params;
  const states = getStates();
  const state = states.find((s) => s.slug === stateSlug);
  const cities = getCitiesByState(stateSlug);
  const city = cities.find((c) => c.slug === citySlug);

  if (!state || !city) notFound();

  const cityListings = getListingsByCity(stateSlug, citySlug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: state.name, href: `/${stateSlug}` },
          { label: city.name },
        ]}
      />

      <h1 className="text-3xl font-bold mb-2">
        In-Home Dementia Care in {city.name}, {state.name}
      </h1>
      <p className="text-gray-500 mb-8">
        Compare {city.count} trusted in-home dementia care provider
        {city.count !== 1 ? "s" : ""} in {city.name}, {state.name}. Read
        reviews, check memory care services, and request free consultations.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {cityListings.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <LeadForm />
          </div>
        </aside>
      </div>

      {/* Local SEO content */}
      <section className="mt-16 bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-2xl font-bold mb-4">
          About In-Home Dementia Care in {city.name}, {state.name}
        </h2>
        <div className="text-gray-600 space-y-4">
          <p>
            Finding quality in-home dementia care in {city.name} is one of the
            most important decisions a family can make. Our directory features{" "}
            {city.count} verified memory care agencies serving the {city.name}{" "}
            area, each specializing in Alzheimer&apos;s and dementia support.
          </p>
          <p>
            When choosing a dementia care provider in {city.name}, consider
            factors like caregiver training in memory care techniques, experience
            with different stages of dementia, scheduling flexibility, and
            pricing. All providers listed in our directory are licensed and
            specialize in cognitive care.
          </p>
          <p>
            The average cost of in-home dementia care in {city.name},{" "}
            {state.name} varies depending on the level of care needed and the
            stage of the condition. Most agencies offer free care assessments to
            evaluate your loved one&apos;s needs and provide accurate pricing.
          </p>
        </div>
      </section>
    </div>
  );
}
