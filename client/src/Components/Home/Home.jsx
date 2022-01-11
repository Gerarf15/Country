import React, {useEffect, useState} from "react";
import {getCountriesBack} from '../action/index'
import {connect} from 'react-redux'
import SearchBar from "../SearchBar/SearchBar";
import {BsBagCheck} from 'react-icons/bs'
import {Link} from "react-router-dom"

import "./Home.css"

const Home = ({countries, getCountries})=> {

    //paginado
    const [currentpage, setCurrentPage] = useState(1)
    const countryXpage = 10
    const pagesButton = []
    let currentItems

    //numero de pag
    const handleClickPage=(e)=>{
        const{id}= e.target
        setCurrentPage(parseInt(id))

    }

    for (let i = 1; i <= Math.ceil(countries.length / countryXpage); i++) {
        pagesButton.push(i)
    }

    const indexLast = currentpage * countryXpage
    const indexFirs = indexLast - countryXpage

    currentItems = countries ? countries.slice(indexFirs, indexLast) : false

    const renderPageNumber = pagesButton.map((page, index)=>{
        return (
            <li key={index} id={page} onClick={handleClickPage}>
                {page}
            </li>
        )
    })

    useEffect(()=>{
        getCountries()
    },[])

    return (
        <div className="home_container">
            <Link to="/create/activity">
                <BsBagCheck className="add_button"/>
            </Link>
            <SearchBar/>
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

const mapStateToProps=(state)=>{
    return{
        countries: state.countries
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        getCountries:function(){
            dispatch(getCountriesBack())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)