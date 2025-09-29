import { useEffect, useState } from "react";
import "../assets/OpenWe"

export default function WeatherApp(){
    const [city, setCity] = useState("odense")
    const CORDS_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},DK&limit=1&appid=dc8259c7cf20d3a5f68b69d860ddee29`

    const [lat, setLat] = useState(0)
    const [lon, setLon] = useState(0)
    const CITY_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid={API key}`

    console.log(lat, lon)

    useEffect(() => {
        fetch(CORDS_URL).then(response => response.json()).then(data => {
            setLat(data[0].lat)
            setLon(data[0].lon)
        })
    },[city])

    useEffect(() => {

    },[])

    return(
        <input type="text" onChange={(e) => setCity(e.target.value)}/>
    )
}