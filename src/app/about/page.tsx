import { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "About SeniorCareDirectory",
  description:
    "Learn about SeniorCareDirectory.com and our mission to help families find trusted in-home senior care providers.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "About" }]} />
      <h1 className="text-3xl font-bold mb-6">About SeniorCareDirectory</h1>
      <div className="space-y-6">
        <p className="text-lg text-gray-600">
          SeniorCareDirectory.com is dedicated to helping families find
          trusted, quality in-home senior care providers across the United
          States. We understand that finding the right care for a loved one is
          one of the most important decisions a family can make.
        </p>
        <h2 className="text-2xl font-semibold mt-8">Our Mission</h2>
        <p className="text-gray-600">
          We believe every senior deserves compassionate, professional care in
          the comfort of their own home. Our directory makes it easy to compare
          providers, read reviews, and connect with the right agency for your
          family&apos;s needs.
        </p>
        <h2 className="text-2xl font-semibold mt-8">What We Offer</h2>
        <ul className="space-y-3 text-gray-600 list-disc pl-6">
          <li>
            <strong>Comprehensive Listings:</strong> Detailed profiles of home
            care agencies including services, pricing, and reviews.
          </li>
          <li>
            <strong>Verified Information:</strong> We regularly update our
            listings to ensure accuracy and reliability.
          </li>
          <li>
            <strong>Free Consultations:</strong> Connect directly with care
            providers at no cost to you.
          </li>
          <li>
            <strong>Educational Resources:</strong> Guides and articles to help
            you navigate the senior care landscape.
          </li>
        </ul>
        <div className="bg-blue-50 rounded-xl p-6 mt-8">
          <h3 className="text-lg font-semibold text-primary mb-2">
            Are You a Senior Care Provider?
          </h3>
          <p className="text-gray-600 mb-4">
            List your agency on SeniorCareDirectory.com to connect with
            families in your area who are looking for quality in-home care.
          </p>
          <Link
            href="/get-started"
            className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-light transition-colors"
          >
            List Your Agency
          </Link>
        </div>
      </div>
    </div>
  );
}
