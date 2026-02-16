import Link from "next/link";
import { Listing } from "@/data/listings";

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <Link
            href={`/${listing.stateSlug}/${listing.citySlug}/${listing.slug}`}
            className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors"
          >
            {listing.name}
          </Link>
          <p className="text-sm text-gray-500 mt-1">
            {listing.city}, {listing.state}
          </p>
        </div>
        <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
          <span className="text-yellow-500 text-sm">★</span>
          <span className="text-sm font-semibold text-green-800">
            {listing.rating}
          </span>
          <span className="text-xs text-gray-500">
            ({listing.reviewCount})
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {listing.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {listing.services.slice(0, 3).map((service) => (
          <span
            key={service}
            className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
          >
            {service}
          </span>
        ))}
        {listing.services.length > 3 && (
          <span className="text-xs text-gray-500 px-2 py-1">
            +{listing.services.length - 3} more
          </span>
        )}
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{listing.priceRange}</span>
          {listing.accepting ? (
            <span className="text-green-600 font-medium">Accepting Clients</span>
          ) : (
            <span className="text-red-500 font-medium">Waitlist Only</span>
          )}
        </div>
        <Link
          href={`/${listing.stateSlug}/${listing.citySlug}/${listing.slug}`}
          className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
