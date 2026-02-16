import { Metadata } from "next";
import LeadForm from "@/components/LeadForm";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Get Free Senior Care Consultation",
  description:
    "Request a free, no-obligation consultation to find the right in-home senior care for your loved one.",
};

export default function GetStartedPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "Get Started" }]} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <h1 className="text-3xl font-bold mb-4">
            Find the Right Senior Care for Your Family
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Tell us about your care needs and we&apos;ll connect you with
            trusted providers in your area. Our service is completely free.
          </p>
          <div className="space-y-6">
            {[
              {
                title: "Tell Us Your Needs",
                desc: "Fill out the form with details about the type of care you're looking for.",
              },
              {
                title: "Get Matched",
                desc: "We'll connect you with qualified providers in your area within 24 hours.",
              },
              {
                title: "Compare & Choose",
                desc: "Review your options, ask questions, and select the best fit for your family.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <LeadForm />
        </div>
      </div>
    </div>
  );
}
