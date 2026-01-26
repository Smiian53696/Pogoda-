
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SUGGESTED_CITIES = [
  "Warsaw",
  "Krakow",
  "Gdansk",
  "Wroclaw",
  "Poznan",
] as const;

export default function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/details/${query}`);
  };

  return (
    <div className="grid place-items-center min-h-[70vh] animate-in fade-in duration-700">
      <div className="w-full max-w-2xl text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs text-slate-200/80 mb-5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Live forecast • OpenWeather
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Find the weather
            <span className="text-white/60"> in seconds</span>
          </h1>
          <p className="mt-3 text-slate-200/70">
            Search any city to see current conditions + 5-day forecast.
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-white/10 blur-2xl opacity-40" />
          <form
            onSubmit={handleSearch}
            className="relative glass rounded-3xl p-2 flex items-stretch shadow-2xl ring-1 ring-white/10 hover:ring-white/20 transition"
          >
            <div className="relative flex-grow">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Kyiv"
                className="w-full bg-transparent text-white placeholder:text-slate-300/40 rounded-2xl py-5 pl-14 pr-4 text-lg focus:outline-none"
              />
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300/60"
                size={22}
              />
            </div>
            <button
              type="submit"
              className="rounded-2xl px-8 font-bold text-sm sm:text-base bg-white text-slate-950 hover:bg-white/90 transition shadow-lg"
            >
              Search
            </button>
          </form>

          <div className="mt-5 text-xs text-slate-300/60">
            Pro tip: try “Tokyo”, “New York”, “Lisbon”
          </div>

          {/* Suggested cities below the global search */}
          <div className="mt-6">
            <div className="text-xs text-slate-300/70 mb-2">
              Nearby cities (PL):
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {SUGGESTED_CITIES.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => navigate(`/details/${city}`)}
                  className="px-4 py-2 rounded-full glass glass-hover text-sm text-slate-200/90"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
