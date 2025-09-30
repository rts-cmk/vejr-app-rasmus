import { useState } from "react"
import CitySearch from "./components/CitySearch"
import WeatherDisplay from "./components/WeatherDisplay"
import FiveDayWeather from "./components/FiveDayWeather"

function App() {

  const [cityData, setCityData] = useState(null)

  return (
    <>
      <CitySearch result={setCityData} />
      <WeatherDisplay city={cityData} />
      <FiveDayWeather ciry={cityData} />
    </>
  )
}

export default App
