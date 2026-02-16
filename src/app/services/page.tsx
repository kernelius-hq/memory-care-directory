import { Metadata } from "next";
import { getAllServices, listings } from "@/data/listings";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Senior Home Care Services Guide",
  description:
    "Learn about the different types of in-home senior care services available. From personal care to dementia care, find the right support for your loved one.",
};

const serviceDescriptions: Record<string, string> = {
  "Personal Care":
    "Assistance with daily activities like bathing, dressing, grooming, and toileting. Personal care aides help seniors maintain their hygiene and dignity.",
  "Dementia Care":
    "Specialized care for individuals with Alzheimer's or other forms of dementia. Caregivers are trained in memory care techniques and safety protocols.",
  "Companionship":
    "Social interaction, conversation, and engagement activities. Companions help combat loneliness and keep seniors mentally stimulated.",
  "Meal Preparation":
    "Planning and cooking nutritious meals tailored to dietary needs and preferences. Includes grocery shopping and kitchen cleanup.",
  "Medication Reminders":
    "Ensuring seniors take their medications on time and in the correct dosages. Caregivers track medication schedules and coordinate with pharmacies.",
  "24-Hour Care":
    "Round-the-clock care for seniors who need continuous supervision and assistance. Multiple caregivers rotate to provide uninterrupted support.",
  "Live-In Care":
    "A dedicated caregiver lives in the senior's home, providing consistent care and companionship throughout the day and night.",
  "Transportation":
    "Safe transportation to medical appointments, errands, social events, and other activities. Caregivers provide door-to-door assistance.",
  "Respite Care":
    "Temporary care that gives family caregivers a break. Professional caregivers step in for a few hours, days, or weeks.",
  "Light Housekeeping":
    "Help with household tasks like laundry, vacuuming, dusting, and organizing. Keeps the home clean and safe for the senior.",
  "Skilled Nursing":
    "Medical care provided by licensed nurses, including wound care, IV therapy, and health monitoring. Requires physician orders.",
  "Hospice Support":
    "Compassionate end-of-life care focused on comfort and quality of life. Works alongside hospice teams to support the patient and family.",
  "Post-Surgery Care":
    "Recovery assistance after surgical procedures. Includes wound monitoring, mobility support, and medication management.",
  "Alzheimer's Care":
    "Focused care for Alzheimer's disease patients at all stages. Caregivers use proven techniques to manage symptoms and maintain quality of life.",
};

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "Services" }]} />
      <h1 className="text-3xl font-bold mb-2">
        Senior Home Care Services Guide
      </h1>
      <p className="text-gray-500 mb-10 max-w-3xl">
        Understanding the types of in-home care available can help you make the
        best decision for your loved one. Here&apos;s a guide to the most common
        senior care services.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => {
          const count = listings.filter((l) =>
            l.services.includes(service)
          ).length;
          return (
            <div
              key={service}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-lg font-semibold">{service}</h2>
                <span className="text-sm text-gray-400 whitespace-nowrap ml-4">
                  {count} provider{count !== 1 ? "s" : ""}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {serviceDescriptions[service] ||
                  "Specialized care service provided by experienced caregivers."}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
