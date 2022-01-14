import React, { useEffect, useState } from "react";
import { getCountriesBack, getSearchName, filterContinents, orderByName } from '../action/index'
import { connect } from 'react-redux'
import { BsBagCheck } from 'react-icons/bs'
import { Link } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar";
import Sidebar from "../Sidebar/Sidebar";

import "./Home.css"

const Home = ({ countries, getCountries, filtered_countries, getSearchName,filterContinents, orderByName }) => {
    const [nameParam, setNameParam] = useState("")
    const countriesForMap = filtered_countries.length > 0 ? filtered_countries : countries
    const [asc, setAsc] = useState(true)


    //paginado
    const [currentpage, setCurrentPage] = useState(1)
    const countryXpage = 10
    const pagesButton = []
    let currentItems

    //numero de pag
    const handleClickPage = (e) => {
        const { id } = e.target
        setCurrentPage(parseInt(id))

    }

    //busqueda
    const handleInputSearch = (e) => {
        const { value } = e.target
        setNameParam(value)
    }

    const handleSearchClick = (e) => {
        e.preventDefault()
        getSearchName(nameParam)
        setNameParam("")
    }

    const handleChangeContinents=(e)=>{
        filterContinents([...countries], e.target.value)
    }

    //orden asc-desc
    const handleOrderAscDesc=()=>{
        setAsc(!asc)
        //despacho las aciones
        let ordParam= asc ? 0 : 1
        orderByName(ordParam, countriesForMap)
        
    }

    for (let i = 1; i <= Math.ceil(countriesForMap.length / countryXpage); i++) {
        pagesButton.push(i)
    }

    const indexLast = currentpage * countryXpage
    const indexFirs = indexLast - countryXpage

    currentItems = countriesForMap.length > 0 ? countriesForMap.slice(indexFirs, indexLast) : false

    const renderPageNumber = pagesButton.map((page, index) => {
        return (
            <li key={index} id={page} onClick={handleClickPage}>
                {page}
            </li>
        )
    })

    useEffect(() => {
        getCountries()
    }, [])

    return (
        <div className="home_container">
            <Sidebar />
            <Link to="/create/activity">
                <BsBagCheck className="add_button" />
            </Link>
            <SearchBar
                handleInputSearch={handleInputSearch}
                handleSearchClick={handleSearchClick}
                nameParam={nameParam}
                handleOrderAscDesc={handleOrderAscDesc}

            />
            <div>
                <select name="" id="" onChange={handleChangeContinents}>
                    <option value="">Select</option>
                    <option value="north america">North America</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Oceania</option>
                    <option value="africa">Africa</option>
                    <option value="south America">South America</option>
                    <option value="antartica">Antartica</option>
                </select>
            </div>
            <div className="pagination">
                <ul  >
                    {renderPageNumber}
                </ul>
            </div>
            <div className="countries">

                {currentItems ? (
                    currentItems.map((coun, index) => {
                        return (
                            <div key={index} className="card">
                                <div className="img_container">
                                    <img src={coun.image} alt="" />

                                </div>
                                <h2>{coun.name}</h2>
                                <h3>{coun.continents}</h3>

                            </div>
                        )
                    })
                ) : (
                    <h1>Not countries</h1>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        countries: state.countries,
        filtered_countries: state.filtered_countries
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCountries: function () {
            dispatch(getCountriesBack())
        },
        getSearchName: function (idPais) {
            dispatch(getSearchName(idPais))
        },
        filterContinents: function (countries, continent) {
            dispatch(filterContinents(countries, continent))
        },
        orderByName: function (ordenParam, country) {
            dispatch(orderByName(ordenParam, country))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)