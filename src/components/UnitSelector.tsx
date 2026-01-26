import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../store';
import { setUnit } from '../store/unitsSlice';
import { type TemperatureUnit } from '../types/weather';

export default function UnitSelector() {
  const dispatch = useDispatch();
  const currentUnit = useSelector((state: RootState) => state.settings.unit);
  const units: TemperatureUnit[] = ['celsius', 'fahrenheit', 'kelvin'];

  return (
    <div className="glass rounded-2xl p-1 flex">
      {units.map((u) => (
        <button
          key={u}
          onClick={() => dispatch(setUnit(u))}
          className={`px-3 py-2 text-xs font-extrabold uppercase rounded-xl transition ${
            currentUnit === u
              ? 'bg-white text-slate-950 shadow'
              : 'text-slate-200/70 hover:text-white hover:bg-white/10'
          }`}
        >
          {u === 'celsius' ? '°C' : u === 'fahrenheit' ? '°F' : 'K'}
        </button>
      ))}
    </div>
  );
}
