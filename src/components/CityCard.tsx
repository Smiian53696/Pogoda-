import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, Wind, Cloud } from 'lucide-react';
import { type RootState } from '../store';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';
import { type WeatherData } from '../types/weather';
import { convertTemp } from '../utils/tempConverter'; 

//Interfejs definiujący typ danych przekazywanych do komponentu CityCard
//Zapewnia bezpieczeństwo typów dzięki TypeScript
interface Props {
  data: WeatherData;
}

export default function CityCard({ data }: Props) { //Komponent reprezentujący kartę miasta z podstawowymi informacjami pogodowymi
  const navigate = useNavigate(); //Hook do nawigacji między stronami (np. przejście do szczegółów miasta)
  const dispatch = useDispatch(); //Hook do wysyłania akcji do Redux store
  const unit = useSelector((state: RootState) => state.settings.unit); //Pobieranie aktualnej jednostki temperatury z Redux (Celsius, Fahrenheit, Kelvin)
  const favorites = useSelector((state: RootState) => state.favorites.list); //Pobieranie listy ulubionych miast z Redux store
  const isFav = favorites.some(f => f.id === data.id);//Sprawdzenie


//Funkcja obsługująca dodawanie/usuwanie miasta z ulubionych stopPropagation zapobiega kliknięciu całej karty 
  const toggleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    isFav ? dispatch(removeFavorite(data.id)) : dispatch(addFavorite(data));
  };

  return ( //Kliknięcie całej karty przenosi użytkownika do strony szczegółów miasta
    <div 
      onClick={() => navigate(`/details/${data.name}`)}
      className="relative bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-indigo-500/10 group"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{data.name}</h3>
          <p className="text-slate-400 text-sm capitalize">{data.weather[0].description}</p>
        </div>
        <button 
          onClick={toggleFav}
          className={`p-2 rounded-full transition-colors ${isFav ? 'text-rose-500 bg-rose-500/10' : 'text-slate-600 hover:text-rose-500'}`}
        >
          <Heart fill={isFav ? "currentColor" : "none"} size={20} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-4xl font-bold text-white tracking-tighter">
            {convertTemp(data.main.temp, unit)} 
          </span>
          <div className="flex gap-3 mt-3 text-xs text-slate-400">
            <span className="flex items-center gap-1"><Wind size={12}/> {data.wind.speed} m/s</span>
            <span className="flex items-center gap-1"><Cloud size={12}/> {data.clouds.all}%</span>
          </div>
        </div>
        <img 
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
          alt="icon" 
          className="w-20 h-20 drop-shadow-2xl"
        />
      </div>
    </div>
  );
}