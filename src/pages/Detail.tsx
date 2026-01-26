import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, Wind, Droplets, Cloud, Sun, Calendar, Heart } from 'lucide-react';
import { fetchWeather, fetchForecast } from '../api/api';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';
import { type RootState } from '../store';
import type { WeatherData, ForecastData } from '../types/weather';

const displayTemp = (temp: number, unit: string) => {
  if (unit === 'kelvin') return `${Math.round(temp)}K`;
  if (unit === 'fahrenheit') return `${Math.round(temp)}°F`;
  return `${Math.round(temp)}°C`;
};

const formatDateForForecast = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

export default function Details() {
  const { city } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const unit = useSelector((state: RootState) => state.settings.unit);
  const favorites = useSelector((state: RootState) => state.favorites.list);

  const [current, setCurrent] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!city) return;
    setLoading(true);
    setError('');

    Promise.all([fetchWeather(city, unit), fetchForecast(city, unit)])
      .then(([curr, fore]) => {
        setCurrent(curr);
        setForecast(fore);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('City not found');
        setLoading(false);
      });
  }, [city, unit]);

  // ✅ використали loading — warning зникне
  if (loading) {
    return (
      <div className="flex flex-col items-center pt-20 gap-4">
        <div className="h-10 w-10 rounded-full border-2 border-white/20 border-t-white animate-spin" />
        <p className="text-slate-300/70 text-sm">Loading…</p>
      </div>
    );
  }

  if (error || !current || !forecast) {
    return (
      <div className="flex flex-col items-center pt-20 gap-4">
        <p className="text-red-400">{error}</p>
        <button onClick={() => navigate('/')} className="text-indigo-400 hover:text-indigo-300">
          Go Home
        </button>
      </div>
    );
  }

  const isFav = favorites.some((f) => f.id === current.id);

  const dailyForecast = forecast.list
    .filter((reading) => reading.dt_txt.includes('12:00:00'))
    .slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-slate-400 hover:text-white transition-colors mb-4"
      >
        <ArrowLeft size={16} className="mr-2" /> Back
      </button>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 p-8 p-12 text-white shadow-2xl border border-slate-700/50">
        <div className="absolute top-0 right-0 p-32 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col flex-row justify-between items-center">
          <div className="text-center text-left">
            <div className="flex items-center gap-4 justify-center justify-start">
              <h1 className="text-4xl text-6xl font-bold tracking-tight">{current.name}</h1>
              <button
                onClick={() => (isFav ? dispatch(removeFavorite(current.id)) : dispatch(addFavorite(current)))}
                className={`p-2 rounded-full bg-white/10 backdrop-blur-sm transition-all ${
                  isFav ? 'text-rose-500 bg-rose-500/20' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Heart fill={isFav ? 'currentColor' : 'none'} />
              </button>
            </div>

            <p className="text-indigo-200 text-lg mt-2 capitalize">{current.weather[0].description}</p>

            <div className="text-7xl text-9xl font-bold mt-6 tracking-tighter">
              {displayTemp(current.main.temp, unit)}
            </div>
          </div>

          <div className="mt-8 mt-0">
            <img
              src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`}
              alt="weather icon"
              className="w-48 h-48 drop-shadow-2xl filter-none grayscale-0 saturate-100 contrast-100 mix-blend-normal opacity-100"
              onError={(e) => {
                // ✅ fallback якщо @4x не віддався
                e.currentTarget.src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 grid-cols-4 gap-4 mt-8 bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex flex-col items-center p-2">
            <Wind className="text-indigo-400 mb-2" />
            <span className="text-slate-400 text-xs uppercase tracking-wider">Wind</span>
            <span className="text-lg font-bold">{current.wind.speed} m/s</span>
          </div>

          <div className="flex flex-col items-center p-2">
            <Droplets className="text-blue-400 mb-2" />
            <span className="text-slate-400 text-xs uppercase tracking-wider">Humidity</span>
            <span className="text-lg font-bold">{current.main.humidity}%</span>
          </div>

          <div className="flex flex-col items-center p-2">
            <Cloud className="text-slate-400 mb-2" />
            <span className="text-slate-400 text-xs uppercase tracking-wider">Cloudiness</span>
            <span className="text-lg font-bold">{current.clouds.all}%</span>
          </div>

          <div className="flex flex-col items-center p-2">
            <Sun className="text-amber-400 mb-2" />
            <span className="text-slate-400 text-xs uppercase tracking-wider">Pressure</span>
            <span className="text-lg font-bold">{current.main.pressure} hPa</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Calendar size={20} className="text-indigo-500" /> 5-Day Forecast
        </h3>

        <div className="grid grid-cols-2 grid-cols-5 gap-3">
          {dailyForecast.map((day) => (
            <div
              key={day.dt}
              className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl flex flex-col items-center hover:bg-slate-800 transition-colors"
            >
              <span className="text-slate-400 text-sm mb-2">{formatDateForForecast(day.dt)}</span>

              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt="icon"
                className="w-12 h-12"
              />

              <span className="text-xl font-bold text-white mt-2">
                {displayTemp(day.main.temp, unit)}
              </span>

              <span className="text-xs text-slate-500 mt-1 capitalize">{day.weather[0].main}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
