import { useEffect, useState } from "react";
import "./FiveDayWeather.css"

export default function FiveDayWeather({ city }){

    const [fiveDayData, setFiveDatData] = useState(null)

    useEffect(() => {
        if(city === null) return

        const API_KEY = import.meta.env.VITE_API_KEY
        const Five_Day_WEATHER_URL = import.meta.env.VITE_Five_DAY_WEATHER_API

        const fetchData = async () => {
            const url = new URL(Five_Day_WEATHER_URL)
            const {lat, lon} = city
            const units = "metric"
            const lang = "da"

            url.search = new URLSearchParams({lat, lon, units, lang, appid: API_KEY})

            const response = await fetch(url)
            const data = await response.json()
            setFiveDatData(data.list)
        }

        fetchData()
    },[city])

    return(
        fiveDayData !== null &&
        <table>
            <thead>
                <tr>
                    <th>Dato/Tid</th>
                    <th>Vejret</th>
                    <th>Temperatur</th>
                    <th>Procentdel skyet</th>
                    <th>Vindhastighed</th>
                </tr>
            </thead>
            <tbody>
                {fiveDayData.map((elm) => {
                    return(
                    <tr key={elm.dt_txt}>
                        <th>{new Date(elm.dt_txt).getDate()}/{new Date(elm.dt_txt).getMonth() + 1}/{new Date(elm.dt_txt).getFullYear()} kl. {new Date(elm.dt_txt).getHours()}.00</th>
                        <th>{elm.weather[0].description} <img src={`https://openweathermap.org/img/wn/${elm.weather[0].icon}.png`} alt={elm.weather[0].description} /></th>
                        <th>{elm.main.temp}°C</th>
                        <th>{elm.clouds.all}%</th>
                        <th>{elm.wind.speed} m/s</th>
                    </tr>
                    )
                })}
            </tbody>
        </table>
    )
}