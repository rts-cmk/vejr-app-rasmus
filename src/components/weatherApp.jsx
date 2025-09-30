import { useEffect, useState } from "react";
import "./weatherApp.css"

export default function WeatherApp(){
    const [city, setCity] = useState("Roskilde")
    const CORDS_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},DK&limit=1&appid=dc8259c7cf20d3a5f68b69d860ddee29`

    const [lat, setLat] = useState(55.6433478)
    const [lon, setLon] = useState(12.0819247)
    const CITY_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=dc8259c7cf20d3a5f68b69d860ddee29`

    useEffect(() => {
        fetch(CORDS_URL).then(response => response.json()).then(data => {
            setLat(data[0].lat)
            setLon(data[0].lon)
        })
    },[city])

    const [cityData, setCityData] = useState(null)

    useEffect(() => {
        fetch(CITY_URL).then(response => response.json()).then(data => setCityData(data))
    },[city])

    return(
        <>
            <label>Skriv Byen: </label>
            <input type="text" onChange={(e) => setCity(e.target.value)}/>

            <section>
                <h1>Vejret i {city}</h1>
                {cityData && 
                    <>
                        <div className="VejrIcon">
                            <p>Vejr: {cityData.weather[0].main}</p>
                            <img src={`https://openweathermap.org/img/wn/${cityData.weather[0].icon}.png`} alt="" />
                        </div>
                        <p>Temperatur: {Math.floor(cityData.main.temp - 273.15)}°C</p>
                        <p>{cityData.clouds.all}% skyet</p>
                        <p>vind: {cityData.wind.speed} m/s</p>
                    </>
                }
            </section>
        </>
    )
}