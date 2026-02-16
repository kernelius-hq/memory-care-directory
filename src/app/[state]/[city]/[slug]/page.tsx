import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  listings,
  getListingBySlug,
  getStates,
  getCitiesByState,
  getListingsByCity,
} from "@/data/listings";
import LeadForm from "@/components/LeadForm";
import Breadcrumb from "@/components/Breadcrumb";
import ListingCard from "@/components/ListingCard";

interface Props {
  params: Promise<{ state: string; city: string; slug: string }>;
}

export async function generateStaticParams() {
  return listings.map((l) => ({
    state: l.stateSlug,
    city: l.citySlug,
    slug: l.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) return {};

  return {
    title: `${listing.name} - Senior Home Care in ${listing.city}, ${listing.state}`,
    description: `${listing.name} provides ${listing.services.slice(0, 3).join(", ")} and more in ${listing.city}, ${listing.state}. Rated ${listing.rating}/5 with ${listing.reviewCount} reviews. ${listing.priceRange}.`,
  };
}

export default async function ListingPage({ params }: Props) {
  const { state: stateSlug, city: citySlug, slug } = await params;
  const listing = getListingBySlug(slug);

  if (!listing) notFound();

  const stateInfo = getStates().find((s) => s.slug === stateSlug);
  const cityListings = getListingsByCity(stateSlug, citySlug).filter(
    (l) => l.slug !== slug
  );

  // Schema.org structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: listing.name,
    description: listing.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: listing.address.split(",")[0],
      addressLocality: listing.city,
      addressRegion: listing.state,
    },
    telephone: listing.phone,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: listing.rating,
      reviewCount: listing.reviewCount,
    },
    priceRange: listing.priceRange,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: stateInfo?.name || listing.state, href: `/${stateSlug}` },
            { label: listing.city, href: `/${stateSlug}/${citySlug}` },
            { label: listing.name },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{listing.name}</h1>
                  <p className="text-gray-500">
                    {listing.address}
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl">
                  <span className="text-yellow-500 text-lg">★</span>
                  <span className="text-xl font-bold text-green-800">
                    {listing.rating}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({listing.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                  {listing.priceRange}
                </span>
                <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  Est. {listing.yearEstablished}
                </span>
                {listing.licensed && (
                  <span className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full">
                    Licensed & Insured
                  </span>
                )}
                {listing.accepting ? (
                  <span className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
                    Accepting New Clients
                  </span>
                ) : (
                  <span className="text-sm bg-red-50 text-red-700 px-3 py-1 rounded-full font-medium">
                    Waitlist Only
                  </span>
                )}
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                About {listing.name}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {listing.description}
              </p>
            </div>

            {/* Services */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
              <h2 className="text-xl font-semibold mb-4">Services Offered</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {listing.services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <span className="text-accent">✓</span>
                    {service}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                Contact Information
              </h2>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">📍</span>
                  <span>{listing.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">📞</span>
                  <a
                    href={`tel:${listing.phone}`}
                    className="text-primary hover:underline font-medium"
                  >
                    {listing.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ - great for SEO */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-xl font-semibold mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-1">
                    What services does {listing.name} offer?
                  </h3>
                  <p className="text-sm text-gray-600">
                    {listing.name} offers {listing.services.join(", ")} in{" "}
                    {listing.city}, {listing.state}.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">
                    How much does {listing.name} cost?
                  </h3>
                  <p className="text-sm text-gray-600">
                    {listing.name}&apos;s rates range from {listing.priceRange}.
                    Contact them for a personalized quote based on your specific
                    care needs.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">
                    Is {listing.name} accepting new clients?
                  </h3>
                  <p className="text-sm text-gray-600">
                    {listing.accepting
                      ? `Yes, ${listing.name} is currently accepting new clients. Contact them today to schedule a consultation.`
                      : `${listing.name} is currently operating on a waitlist basis. Contact them to be added to their waitlist.`}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">
                    How long has {listing.name} been in business?
                  </h3>
                  <p className="text-sm text-gray-600">
                    {listing.name} was established in {listing.yearEstablished}{" "}
                    and has been serving the {listing.city} community for{" "}
                    {new Date().getFullYear() - listing.yearEstablished} years.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <LeadForm listingName={listing.name} />
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold mb-2">Quick Info</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Price Range</span>
                    <span className="font-medium text-gray-900">
                      {listing.priceRange}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rating</span>
                    <span className="font-medium text-gray-900">
                      {listing.rating}/5 ({listing.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Established</span>
                    <span className="font-medium text-gray-900">
                      {listing.yearEstablished}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Licensed</span>
                    <span className="font-medium text-gray-900">
                      {listing.licensed ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Listings */}
        {cityListings.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">
              Other Senior Care Providers in {listing.city}, {listing.state}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cityListings.slice(0, 4).map((related) => (
                <ListingCard key={related.slug} listing={related} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
