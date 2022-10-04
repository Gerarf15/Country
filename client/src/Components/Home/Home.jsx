import React, { useEffect, useState } from "react";
import {
  getCountriesBack,
  getSearchName,
  filterContinents,
  orderByName,
  orderByPopulation,
  getTypes,
  filterByActivity,
  setPageBack,
  filterArea
} from "../action/index";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

import "./Home.css";

const Home = ({
  countries,
  getCountries,
  filtered_countries,
  getSearchName,
  filterContinents,
  orderByName,
  orderByPopulation,
  getTypes,
  typesSave,
  filterByActivity,
  searching,
  pageBack,
  setPageBack,
  filterArea
}) => {
  const [nameParam, setNameParam] = useState("");
  const countriesForMap =
    filtered_countries.length > 0
      ? filtered_countries
      : searching
        ? false
        : countries;
  const [asc, setAsc] = useState(true);
  const [ascPob, setAscDesPob] = useState(true);

  //paginado
  const currentpage = pageBack === 0 ? 1 : pageBack;
  const countryXpage = 10;
  const pagesButton = [];
  let currentItems;

  //numero de pag
  const handleClickPage = (e) => {
    const { id } = e.target;
    setPageBack(parseInt(id))
    // setCurrentPage(parseInt(id));
  };

  //busqueda
  const handleInputSearch = (e) => {
    const { value } = e.target;
    setNameParam(value);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    getSearchName(nameParam);
    setNameParam("");
  };

  //filter continentes
  const handleChangeContinents = (e) => {
    filterContinents([...countries], e.target.value);
  };

  //orden asc-desc
  const handleOrderAscDesc = () => {
    setAsc(!asc);
    //despacho las aciones
    let ordParam = asc ? 0 : 1;
    orderByName(ordParam, countriesForMap);
  };

  //orden population
  const handleOrderPopulation = () => {
    setAscDesPob(!ascPob);
    let ordPobParam = ascPob ? 0 : 1;
    orderByPopulation(ordPobParam, countriesForMap);
  };

  const handelFilterArea = () => {
    filterArea([...countries])
  }

  for (let i = 1; i <= Math.ceil(countriesForMap.length / countryXpage); i++) {
    pagesButton.push(i);
  }

  const indexLast = currentpage * countryXpage;
  const indexFirs = indexLast - countryXpage;

  currentItems = !countriesForMap
    ? false
    : countriesForMap.length > 0
      ? countriesForMap.slice(indexFirs, indexLast)
      : false;

  const handleSelectTypes = (e) => {
    filterByActivity(e.target.value, countriesForMap.length > 0 ? [...countriesForMap] : []);
  };
  const renderPageNumber = pagesButton.map((page, index) => {
    return (
      <li key={index} id={page} onClick={handleClickPage}>
        {page}
      </li>
    );
  });

  useEffect(() => {
    getCountries();
    getTypes();
  }, []);

  return (
    <div className="home_container">
      <nav className="nav_container">

        <Link to="/create/activity">
          <button className="add_button">Create Activity</button>
        </Link>
        <SearchBar
          handleInputSearch={handleInputSearch}
          handleSearchClick={handleSearchClick}
          nameParam={nameParam}
          asc={asc}
          handleOrderAscDesc={handleOrderAscDesc}
          handleOrderPopulation={handleOrderPopulation}
          ascPob={ascPob}
        />
      <div className="container_select">
        <div >
          <select name="" id="" onChange={handleChangeContinents} className="selects_css" >
            <option value="">Continent</option>
            <option value="north america">North America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
            <option value="africa">Africa</option>
            <option value="south america">South America</option>
            <option value="antartica">Antartica</option>
          </select>
        </div>
        <div>
          <select name="name" id="" onChange={handleSelectTypes} className="selects_css">
            <option value="">Activity</option>
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
      </div>
      </nav>

      <div className="pagination">
        <ul>{renderPageNumber}</ul>
      </div>

      {/* <button onClick={handelFilterArea}>Filter Area</button> */}

      <div className="countries">
        {currentItems ? (
          currentItems.map((coun, index) => {
            return (
              <Link
                to={`/countrie/detail/${coun.id}`}
                key={index}
                className="card"
              >
                <div className="img_container">
                  <img src={coun.image} alt="" />
                </div>
                <div className="info_card">
                  <span>{coun.name}</span>
                  <span>{coun.continents}</span>
                  <span>population: {coun.population}</span>
                  <span>Activities: </span>
                  {coun.activities.length > 0 ? (
                    coun.activities.map((act, index) => <span key={index}>{act.name}</span>)
                  ) : (
                    <h5>not activities</h5>
                  )}
                </div>
              </Link>
            );
          })
        ) : (
          <h2>Not found countries</h2>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    countries: state.countries,
    filtered_countries: state.filtered_countries,
    typesSave: state.types,
    searching: state.searching,
    pageBack: state.pageBack
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCountries: function () {
      dispatch(getCountriesBack());
    },
    getSearchName: function (idPais) {
      dispatch(getSearchName(idPais));
    },
    filterContinents: function (countries, continent) {
      dispatch(filterContinents(countries, continent));
    },
    orderByName: function (ordenParam, country) {
      dispatch(orderByName(ordenParam, country));
    },
    orderByPopulation: function (ordenPobParam, countries) {
      dispatch(orderByPopulation(ordenPobParam, countries));
    },
    getTypes: function () {
      dispatch(getTypes());
    },
    filterByActivity: function (activityParam, countries) {
      dispatch(filterByActivity(activityParam, countries));
    },
    setPageBack: function (page) {
      dispatch(setPageBack(page));
    },
    filterArea: function (countries) {
      dispatch(filterArea(countries))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
