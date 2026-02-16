import Link from "next/link";
import { getStates, listings } from "@/data/listings";
import ListingCard from "@/components/ListingCard";

export default function HomePage() {
  const states = getStates();
  const featuredListings = listings.filter((l) => l.rating >= 4.8).slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Trusted In-Home Dementia &amp; Memory Care
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Compare specialized Alzheimer&apos;s and dementia caregivers in your
            area. Read reviews, compare services, and find the right memory care
            for your loved one.
          </p>
          <div className="max-w-xl mx-auto bg-white rounded-xl p-2 flex gap-2">
            <input
              type="text"
              placeholder="Enter your city or state..."
              className="flex-1 px-4 py-3 text-gray-900 rounded-lg focus:outline-none"
            />
            <button className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-light transition-colors whitespace-nowrap">
              Search
            </button>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-blue-200">
            <span>✓ {listings.length}+ Verified Providers</span>
            <span>✓ {states.length} States Covered</span>
            <span>✓ Free Consultation</span>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">{listings.length}+</div>
              <div className="text-sm text-gray-500">Verified Providers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">{states.length}</div>
              <div className="text-sm text-gray-500">States Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-gray-500">Free to Families</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">24hr</div>
              <div className="text-sm text-gray-500">Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-2">
          Top-Rated Memory Care Providers
        </h2>
        <p className="text-gray-500 text-center mb-10">
          Highly rated dementia and Alzheimer&apos;s care agencies trusted by families
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListings.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      </section>

      {/* Browse by State */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-2">
            Browse Dementia Care by State
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Find in-home memory care providers in your state
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {states.map((state) => (
              <Link
                key={state.slug}
                href={`/${state.slug}`}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-primary border border-gray-200 transition-colors"
              >
                <span className="font-medium text-gray-800">{state.name}</span>
                <span className="text-sm text-gray-400">{state.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Search Your Area",
              desc: "Browse dementia and memory care providers by state, city, or type of care needed.",
            },
            {
              step: "2",
              title: "Compare Specialists",
              desc: "Read reviews, compare memory care services, pricing, and caregiver qualifications.",
            },
            {
              step: "3",
              title: "Get Free Consultation",
              desc: "Request a free care assessment from specialized dementia care providers.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Specialized Dementia Care */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose Specialized In-Home Dementia Care?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Trained Memory Care Specialists",
                desc: "Our listed providers employ caregivers specifically trained in Alzheimer's and dementia care techniques.",
              },
              {
                title: "Comfort of Home",
                desc: "Familiar surroundings reduce confusion and anxiety for individuals with memory conditions.",
              },
              {
                title: "Personalized Care Plans",
                desc: "Every care plan is tailored to the individual's stage of dementia and specific needs.",
              },
              {
                title: "Family Peace of Mind",
                desc: "Know your loved one is safe with qualified professionals while maintaining independence.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 border border-blue-100">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Help Finding Memory Care?
          </h2>
          <p className="text-lg text-green-100 mb-8">
            Our dementia care advisors help families find the right in-home
            memory care. Get a free, no-obligation consultation today.
          </p>
          <Link
            href="/get-started"
            className="inline-block bg-white text-accent px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-colors"
          >
            Get Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
