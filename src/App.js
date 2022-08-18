import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet' ;
import axios from "axios";
import {Alert, Spinner} from "react-bootstrap";
import useSWR from "swr";
import {Icon} from "leaflet/dist/leaflet-src.esm";
import { GeoJSON } from 'react-leaflet';
import {preventDefault} from "leaflet/src/dom/DomEvent";
import {clear} from "@testing-library/user-event/dist/clear";
import {cleanup} from "@testing-library/react";













const MyData = (props, event) => {
  // create state variable to hold data when it is fetched




  let [data, setData] = useState();

    // useEffect to fetch data on mount

    useEffect(() => {
      // async function!

      let getData = async () => {
        // 'await' the data
        let response = await axios.get(props.name);
        // save data to state
        setData(response.data);
      };

      getData();


    }, [props.name]);



  // render react-leaflet GeoJSON when the data is ready
  if (data) {
    //return <input type={"text"} value={name} onChange={updateName}/>;

   return <GeoJSON data={data} />


  } else {
    //return <input type={"text"} value={name} onChange={updateName}/>;
    return null;


  }

};


function App(event) {


  let [name, setName] = useState("http://127.0.0.1:8000/api/world/");


  let updateName = (event) => {

    if (event.key === 'Enter' && event.target.value.slice(-4) != "1914" && event.target.value != "German Empire") {
      event.preventDefault();
      setName("http://127.0.0.1:8000/api/world/" + event.target.value)
    }
    ;

    if (event.key === 'Enter' && event.target.value === "German Empire") {
      event.preventDefault();
      setName("http://127.0.0.1:8000/api/german_empire")
    }
    ;

    if (event.key === 'Enter' && event.target.value.slice(-4) === "1914") {
      event.preventDefault();
      setName("http://127.0.0.1:8000/api/world1914/" + event.target.value.slice(0, -4))
    }

    //else {setName("")}
    //return <MyData name={name + "/"}/>
  };

  useEffect(() => {
    console.log("value of 'name' changed to", name.slice(0, 42));

  }, [name]);

  let NewData = (event) => {

    if (event.key === "Enter" && event.target.value.slice(-4) != "1914" && event.target.value != "German Empire") {

    }

    return <MyData name={name + "/"}/>
  }

  if (event.key === "Enter" && event.target.value === "German Empire") {



  return <MyData name={name}/>
}

  if (event.key === "Enter" && event.target.value.slice(-4) === "1914") {
    return <MyData name={name.slice(0, 42) + "/"}/>
  };

  return (
  <div>


  <form>
  <link rel="stylesheet" href="style.css"/>
    <label  htmlFor="country">Country:</label>
  <input  id="country" type={"text"} placeholder={"type a country here"} onKeyDown={updateName}/>
  </form>



    <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={true} onKeyDown={updateName}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

      <NewData/>

  </MapContainer>


</div>

  );
}

export default App;
