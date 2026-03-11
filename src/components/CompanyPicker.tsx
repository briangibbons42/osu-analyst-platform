"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CompanyPicker() {
  const [ticker, setTicker] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = ticker.trim().toUpperCase();
    if (!clean) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/edgar?ticker=${encodeURIComponent(clean)}`);
      const data = await res.json();

      if (data.valid) {
        router.push(`/research/${clean}`);
      } else {
        setError(data.message || "Company not found. Check the ticker and try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <label
        htmlFor="ticker"
        className="mb-2 block text-sm font-bold uppercase tracking-widest text-body-text"
      >
        Research a Company
      </label>
      <div className="flex gap-3">
        <input
          id="ticker"
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Enter ticker (e.g. MU, AAPL, MSFT)"
          className="flex-1 rounded-md border border-light-gray bg-white px-4 py-3 text-sm text-paddletail-black placeholder:text-gray-400 focus:border-beaver-orange focus:outline-none focus:ring-2 focus:ring-beaver-orange/30"
        />
        <button
          type="submit"
          disabled={loading || !ticker.trim()}
          className="rounded-md bg-beaver-orange px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-hover disabled:opacity-50"
        >
          {loading ? "Checking..." : "Validate"}
        </button>
      </div>
      {error && (
        <p className="mt-3 text-sm text-red-600">{error}</p>
      )}
    </form>
  );
}
