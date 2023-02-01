import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTypes } from "../action/index";
import { Link } from "react-router-dom";
import turis from '../../Assets/turismo.jpg'
import swal from 'sweetalert';
import "./Activity.css";

function validate(activityObj, nameType) {

  // let regex = new RegExp("[a-zA-Z ]{2,254}");


  let errors = {}
  if (!activityObj.name) {
      errors.name = "Name is required"
  }/* else if(!regex.test(activityObj.name)){
      errors.name = "deben ser letras"
  } */


  if(!activityObj.difficulty){
      errors.difficulty = "difficulty is required"
  }/* else if(!regex.test(activityObj.difficulty)){
    errors.difficulty = "deben ser numeros positivos"
  } */
  else if(Number(activityObj.difficulty) <= 0){
      errors.difficulty = "must be a positive number"
  }else if(typeof activityObj.difficulty === "number"){
      errors.difficulty = "must be numbers"
  }else if(activityObj.difficulty > 10){
    errors.difficulty=("valor maximo es 10")
  }

  if (!activityObj.duration) {
      errors.duration = "duration is required"
  }else if(Number(activityObj.duration) <= 0){
      errors.duration = "must be a positive number"
  }else if(typeof activityObj.duration === "number"){
      errors.duration = "must be numbers"
  }else if(activityObj.duration > 10){
    errors.duration=("valor maximo es 10")
  }
  
  return errors
}

const Activity = () => {
  const countriesSave = useSelector((state) => state.countries);
  const typesSave = useSelector((state) => state.types);
  const dispatch = useDispatch();

  // const [selectSeason, setSelectSeason] = useState()
  const [selectCountries, setSelectCountries] = useState([]);

  const initialAct = {
    name: "",
    difficulty: "",
    duration: "",
    season: null,
    countriesId: [],
    nameType: ""
  };

  const [activityObj, setActivityObj] = useState(initialAct);
  const [nameType, setNameType] = useState(null);
  const [selectActivity, setSelectActivity] = useState([]);
  const [selectSeason, setSelectSeason] = useState([]);
  const [errors, setErrors] = useState("")

  //   const [selectCountry, setSelectCountry] = useState([]);

  //obtener el input
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setActivityObj({
      ...activityObj,
      [name]: value,
    });

    setErrors(validate({
      ...activityObj,
      [name]: value
  }))
  };

  const handleSelectSeason = (e) => {
    setActivityObj({
      ...activityObj,
      season: e.target.value,
    });
    if (e.target.options[e.target.selectedIndex].text === "Select")
      return alert("item incorrecto");
  };

  const handleSelectTypes = (e) => {
    const { name, value } = e.target;
    if (e.target.options[e.target.selectedIndex].text === "Select")
      return alert("item incorrecto");
    setActivityObj({
      ...activityObj,
      name: e.target.value,
    });
    setErrors(validate({
      ...activityObj,
      [name]: value
    }))
  };

  const handleSelectCountnries = (e) => {
    const pais = selectCountries.find((coun) => coun.id === e.target.value);
    if (pais) return alert("pais ya seleccionado");
    // console.log(e.target.value, e.target.options[e.target.selectedIndex].text)
    if (e.target.options[e.target.selectedIndex].text === "Select")
      return alert("item incorrecto");
    setSelectCountries([
      ...selectCountries,
      {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    ]);
  };

  const getArrayCountries = () => {
    let arraycountries = selectCountries.map((countries) => countries.id);
    return arraycountries;
  };

  //add button
  const handleInputType = (e) => {
    const { value } = e.target;
    setNameType(value);
  };

  //select remove
  const handleRemove = (e) => {
    const clickActivity = selectActivity.filter(
      (act) => act.id !== e.target.id
    );
    const clickSeason = selectSeason.filter((sea) => sea.id !== e.target.id);
    const clickCountry = selectCountries.filter(
      (coun) => coun.id !== e.target.id
    );
    setSelectActivity(clickActivity);
    setSelectSeason(clickSeason);
    setSelectCountries(clickCountry);
  };

  //agregar el tipo de actividad
  const handlePostType = async (e) => {
    e.preventDefault();
    if (!nameType) return swal("Error!","enter a type", "error");
    let regex = new RegExp(/^[A-Z]+$/i)
    if (!regex.test(nameType)) {
      return swal("Error!","must be just letters", "error")
    }

    const response = await fetch("http://Localhost:3001/type", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nameType }),
    });
    if (response.status === 201) {
      dispatch(getTypes());
      // const result = await response.json();
      return swal("Good type!", "type register!", "success");;
    } else {
      return swal("Error!","could not register", "error");
    }
  };

  //enviar todos los datos
  const handleSumit = async (e) => {
    e.preventDefault();
    if (!activityObj.name || !activityObj.difficulty || !activityObj.duration || !activityObj.season || !activityObj.countriesId) {
      return swal("Error!","fill in fields", "error");
    }
    if(activityObj.difficulty <= 0 || activityObj.duration <= 0){
      return swal("Error!","must be positive numbers", "error")
    }else if(activityObj.difficulty > 10 || activityObj.duration > 10){
      return swal("Error!", "the maximum value is 10", "error");
    }
    
    const arraycountries = getArrayCountries();
    if(arraycountries.length === 0){
      return swal("Error!", "please, select country", "error");
    }
    const objToBack = {
      ...activityObj,
      countriesId: arraycountries,
    };
    if(!objToBack.countriesId) {return swal("Error!","fill in fields", "error");}
    const response = await fetch("http://Localhost:3001/activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objToBack),
    });
    /* fetch("http://Localhost:3001/activity",{
      
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objToBack),
      
    })
    .then(response=> {
      return response.json()})
    .then(result) */

    // const result = await response.json();
    if (response.status === 201) {
      swal("Good activity!", "activity register!", "success");;
    } else {
      swal("Error!", "activity not register!", "error");
    }
  };

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  return (
    <div className="register_container">
      <nav className="brand_container">
        <Link to="/home" className="home_link">
          <span>Country</span>
        </Link>
      </nav>
      <h2>Register Activity</h2>
      <main className="register_main">
      <div className="register_img">
        <img src={turis} alt="turista" width="340" height="300"/>
      </div>
        <form className="form_register" action="" onSubmit={handleSumit}>
            <span className="titles">name</span>
            <div className="container_selects">
              <select name="name" id="" onChange={handleSelectTypes} className="selects_css">
                <option value="">Select</option>
                {typesSave.length > 0 ? (
                  typesSave.map((types) => {
                    return (
                      <option key={types.id} value={types.name}>
                        {types.name}
                      </option>
                    );
                  })
                  ) : (
                    <option value="">Activities</option>
                    )}
              </select>
          <ul className="container_list">
            <li>{activityObj.name}</li>
          </ul>
            </div>
              {errors.name && <p className="errors_names">{errors.name}</p>}
              <input type="text" name="nameType" onChange={handleInputType}/>
              <button type="submit" onClick={handlePostType}>
                + Activity
              </button>

          <br />
          {/* <span className="titles">difficulty</span> */}
          <input
            type="number"
            name="difficulty"
            placeholder="difficulty"
            onChange={handleInputChange}
          />
          {errors.difficulty && <p className="errors_names">{errors.difficulty}</p>}

          {/* <span className="titles">duration</span> */}
          <input
            type="number"
            name="duration"
            placeholder="duration"
            onChange={handleInputChange}
          />
          {errors.duration && <p className="errors_names">{errors.duration}</p>}

          <div className="container_selects">
            <div>

          <span className="titles">season</span>
            </div>
          <select name="season" id="" onChange={handleSelectSeason} className="selects_css">
            <option value="">Select</option>
            <option value="summer">Summer</option>
            <option value="auntumn">Auntumn</option>
            <option value="winter">Winter</option>
            <option value="sprint">Sprint</option>
          </select>

          <ul className="container_list">
            <li>{activityObj.season}</li>
          </ul>
          </div>
          <br />
          <div className="container_selects">
            <div>

          <span className="titles">Countries</span>
            </div>
            
          <>
            <select name="countries" onChange={handleSelectCountnries} className="selects_css">
              <option value="">Select</option>
              {countriesSave.length > 0 ? (
                countriesSave.sort((a,b) => a.name < b.name ? -1 : +(a.name > b.name)).map((coun) => {
                  return (
                    <option
                      key={coun.id}
                      value={coun.id}
                      className="control_couns"
                    >
                      {coun.name}
                    </option>
                  );
                })
              ) : (
                <option value="">cargando...</option>
              )}
            </select>
          </>
          <br />
            <ul className="container_list">
              {selectCountries.map((el) => (
                <li key={el.id}>
                  {el.name}
                  <span id={el.id} className="remove" onClick={handleRemove}>
                    X
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <br />
          <button type="submit"  className="btn_register">Save</button>
        </form>
      </main>
    </div>
  );
};

export default Activity;
