import { useEffect, useState } from "react"
import "./weatherApp.css"

export default function WeatherDisplay({ city }){

    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {

        if (city === null) return

        const API_KEY = import.meta.env.VITE_API_KEY
        const WEATHER_URL = import.meta.env.VITE_WEATHER_API

        const fetchData = async () => {

        const url = new URL(WEATHER_URL)
        const {lat, lon} = city
        const units = "metric"
        const lang = "da"

        url.search = new URLSearchParams({lat, lon, units, lang, appid: API_KEY})

        const response = await fetch(url)
        const data = await response.json()

        setWeatherData(data)
        console.log(data)
        }

        fetchData()

    },[city])

    return (
        weatherData !== null && 
        <section>
            <h1>Vejret i {city?.name}</h1>
            <figure>
                <p>Vejr: {weatherData.weather[0].main}</p>
                <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="" />
            </figure>
            <p>Temperatur: {weatherData.main.temp}°C</p>
            <p>{weatherData.clouds.all}% skyet</p>
            <p>vind: {weatherData.wind.speed} m/s</p>
        </section>
    )
}