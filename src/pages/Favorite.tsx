import { useSelector } from 'react-redux';
import { type RootState } from '../store';
import CityCard from '../components/CityCard';
import { HeartOff } from 'lucide-react';

export default function Favorites() {
  const favorites = useSelector((state: RootState) => state.favorites.list); //Pobranie listy ulubionych miast z globalnego stanu Redux

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-500 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <HeartOff size={64} className="mb-4 opacity-50" />
        <h2 className="text-xl font-medium">No favorite locations yet</h2>
      </div>
    );
  }
 
  return ( //Główny kontener strony ulubionych
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Favorite Locations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((city) => (
          <CityCard key={city.id} data={city} />
        ))}
      </div>
    </div>
  );
}