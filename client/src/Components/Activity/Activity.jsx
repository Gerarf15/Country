import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTypes } from "../action/index";
import { GiWorld } from "react-icons/gi";
import { Link } from "react-router-dom";
import "./Activity.css";

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
  };

  const [activityObj, setActivityObj] = useState(initialAct);
  const [nameType, setNameType] = useState(null);
  const [selectActivity, setSelectActivity] = useState([]);
  const [selectSeason, setSelectSeason] = useState([]);
  //   const [selectCountry, setSelectCountry] = useState([]);

  //obtener el input
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setActivityObj({
      ...activityObj,
      [name]: value,
    });
  };

  const handleSelectSeason = (e) => {
    // const valor = selectSeason.find(elem => elem.id === e.target.value)

    setActivityObj({
      ...activityObj,
      season: e.target.value,
    });
    if (e.target.options[e.target.selectedIndex].text === "Select")
      return alert("item incorrecto");
    /* if (e.target.options[e.target.selectedIndex].text === "Select") return alert("item incorrecto")
        if (valor) return alert("el valor ya fue seleccionado")
        else {
            setSelectSeason([
                ...selectSeason,
                { id: e.target.value, name: e.target.options[e.target.selectedIndex].text }
            ])
        } */
  };

  const handleSelectTypes = (e) => {
    setActivityObj({
      ...activityObj,
      name: e.target.value,
    });
    if (e.target.options[e.target.selectedIndex].text === "Select")
      return alert("item incorrecto");
  };

  const handleSelectCountnries = (e) => {
    const pais = selectCountries.find((coun) => coun.id === e.target.value);
    if (pais) return alert("pais ya seleccionado");
    // console.log(e.target.value, e.target.options[e.target.selectedIndex].text)
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

  //
  const handlePostType = async (e) => {
    e.preventDefault();
    if (!nameType) return alert("ingresar un type");

    const response = await fetch("http://Localhost:3001/type", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nameType }),
    });
    if (response.status === 201) {
      dispatch(getTypes());
      const result = await response.json();
      return alert(result.message);
    } else {
      return alert("no se pudo registrar");
    }
  };

  const handleSumit = async (e) => {
    e.preventDefault();
    if (!activityObj.season) {
      return alert("completar season");
    }
    const arraycountries = getArrayCountries();
    const objToBack = {
      ...activityObj,
      countriesId: arraycountries,
    };
    const response = await fetch("http://Localhost:3001/activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objToBack),
    });

    if (response.status === 201) {
      const result = await response.json();
      alert(result.message);
    } else {
      console.log("Oops, esta mal");
    }
  };

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  return (
    <div className="register_container">
      <nav className="brand_container">
        <Link to="/home" className="home_link">
          <GiWorld />
          <span>Country</span>
        </Link>
      </nav>
      <h2>Register Activity</h2>
      <main className="register_main">
        <form className="form_register" action="" onSubmit={handleSumit}>
          <div>
            <label htmlFor="">name</label>
            <select name="name" id="" onChange={handleSelectTypes} required>
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
          </div>
          <div>
            <form action="">
              <input type="text" name="nameType" onChange={handleInputType} />
              <button type="submit" onClick={handlePostType}>
                + Activity
              </button>
            </form>
          </div>
          <ul className="container_list">
            <li>{activityObj.name}</li>
          </ul>

          <br />
          <label htmlFor="">difficulty</label>
          <input
            type="number"
            min="1"
            max="5"
            pattern="^[0-9]+"
            name="difficulty"
            onChange={handleInputChange}
            required
          />
          <label htmlFor="">duration</label>
          <input
            type="number"
            min="1"
            pattern="^[0-9]+"
            name="duration"
            onChange={handleInputChange}
            required
          />
          <label htmlFor="">season</label>
          <select name="season" id="" onChange={handleSelectSeason} required>
            <option value="">Select</option>
            <option value="summer">Summer</option>
            <option value="auntumn">Auntumn</option>
            <option value="winter">Winter</option>
            <option value="sprint">Sprint</option>
          </select>
          <ul className="container_list">
            <li>{activityObj.season}</li>
          </ul>
          <br />
          <label htmlFor="">Countries</label>
          <>
            <select name="countries" onChange={handleSelectCountnries} required>
              <option value="">Select</option>
              {countriesSave.length > 0 ? (
                countriesSave.map((coun) => {
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
          </>
          <br />
          <button type="submit">Save</button>
        </form>
      </main>
    </div>
  );
};

export default Activity;
