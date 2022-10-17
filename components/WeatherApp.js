import { useState } from "react";
import axios from "axios";
import { SearchImage } from "./Images";


function WeatherApp() {
    const [weather, setWeather] = useState('');
    const [city, setCity] = useState('');
    const apiKey = "";


    const apiCall = async (e) => {
        e.preventDefault()
        const loc = e.target.elements.loc.value
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}`;
        const req = axios.get(url);
        const res = await req;
        setWeather({
            descp: res.data.weather[0].description,
            temp: res.data.main.temp,
            city: res.data.name,
            humidity: res.data.main.humidity,
            press: res.data.main.pressure,
        })

        setCity(res.data.name)
    }

    let K = weather.temp;
    let C = K - 273.15

    const Weath = () => {
        return <div>
                <hr />
            <div className="Weath mt-4 mb-2">
                <div className="welement">
                    🌡 기온 : {C.toFixed(1)}˚
                </div>
                <div className="welement">
                    💧 습도 : {weather.humidity}%
                </div>
            </div>
        </div>
    }

    return (
      <>
        <div className="mainweather mr-3">
          <div className="weather max-w-24">
            <div className="font-semibold mb-2 bg-blue-200 select-none">오늘의 날씨 ☀️</div>
            <form onSubmit={apiCall} className="form">
              <div className="flex">
              <input type="text" placeholder="city" name="loc" className="pl-1" />
                <button className="bttn">
                  <SearchImage className="w-8 h-8 fill-gray-600"></SearchImage>
                </button>
              </div>
            </form>
            {weather && <Weath />}
          </div>
        </div>
      </>
    );
}
    export default WeatherApp