import "./CitySearch.css"

export default function CitySearch({ result }){

    const API_KEY = import.meta.env.VITE_API_KEY
    const GEO_URL = import.meta.env.VITE_GEO_API

    const submitHandeler = async event => {
        event.preventDefault()

        const formElement = event.target
        const formData = new FormData(formElement)
        const city = formData.get("city")

        const url = new URL(GEO_URL)

        url.searchParams.set("appid", API_KEY)
        url.searchParams.set("q", `${city},DK`)

        const response = await fetch(url)
        const data = await response.json()

        result(data[0])
    }

    return(
        <form onSubmit={submitHandeler}>
            <label>Skriv by: </label>
            <input type="search" name="city"/>
            <button type="submit">Søg</button>
        </form>
    )
}