"use client";

import { useState } from "react";

export default function LeadForm({ listingName }: { listingName?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          careType: formData.get("careType"),
          message: formData.get("message"),
          listingName: listingName || "",
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="text-3xl mb-2">✓</div>
        <h3 className="text-lg font-semibold text-green-800 mb-1">
          Request Sent!
        </h3>
        <p className="text-sm text-green-700">
          {listingName
            ? `${listingName} will contact you within 24 hours.`
            : "A care advisor will contact you within 24 hours."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold mb-1">
        {listingName ? `Contact ${listingName}` : "Get Free Memory Care Consultation"}
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Fill out this form and a dementia care advisor will reach out to you.
      </p>
      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-2 rounded mb-3">
          {error}
        </p>
      )}
      <div className="space-y-3">
        <input
          name="name"
          type="text"
          placeholder="Your Full Name"
          required
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          required
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          required
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <select
          name="careType"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          required
        >
          <option value="">Type of Care Needed</option>
          <option value="early-stage-dementia">Early-Stage Dementia Care</option>
          <option value="alzheimers-care">Alzheimer&apos;s Care</option>
          <option value="advanced-dementia">Advanced Dementia Care</option>
          <option value="memory-care">General Memory Care</option>
          <option value="respite-care">Respite Care (Give Family a Break)</option>
          <option value="24-hour-care">24-Hour / Live-In Memory Care</option>
          <option value="other">Other</option>
        </select>
        <textarea
          name="message"
          placeholder="Tell us about your loved one's condition and care needs (optional)"
          rows={3}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent-light transition-colors disabled:opacity-50"
        >
          {loading ? "Sending..." : "Request Free Consultation"}
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-3 text-center">
        By submitting, you agree to our privacy policy. We&apos;ll never share
        your information without consent.
      </p>
    </form>
  );
}
