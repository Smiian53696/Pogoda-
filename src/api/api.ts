const API_BASE_URL = "https://api.openweathermap.org/data/2.5"; // Bazowy URL API OpenWeather
const API_KEY = import.meta.env.VITE_API_KEY; // Klucz API

const mapUnitToAPI = (unit: string): string => {
    if (unit === 'fahrenheit') return 'imperial';
    if (unit === 'celsius') return 'metric';
    return ''; 
};

export async function fetchWeather(city: string, unit: string) { // Pobiera aktualną pogodę

    console.log(API_KEY) // wypisuje klucz
    const apiUnit = mapUnitToAPI(unit); // Zamiana jednostki na format API
    const unitQuery = apiUnit ? `&units=${apiUnit}` : '';

    const res = await fetch(`${API_BASE_URL}/weather?q=${city}&appid=${API_KEY}${unitQuery}`);

    if (!res.ok) {
        throw new Error(`City not found`); // Gdy miasto nie istnieje lub błąd -> rzucamy wyjątek
    }
    return res.json();

}

export async function fetchForecast(city: string, unit: string) { // Pobiera prognozę 5-dniową
    const apiUnit = mapUnitToAPI(unit); // Zamiana jednostki na format API
    const unitQuery = apiUnit ? `&units=${apiUnit}` : '';

    const res = await fetch(`${API_BASE_URL}/forecast?q=${city}&appid=${API_KEY}${unitQuery}`); // Request do endpointu /forecast

    if (!res.ok) { // Gdy odpowiedź nie jest OK
        throw new Error(`Failed to fetch forecast`);
    }
    return res.json(); // Zwracamy JSON (dane prognozy)
  
}