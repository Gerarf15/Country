import React from 'react'
import {GrUpdate} from 'react-icons/gr'
import { useDispatch } from 'react-redux'
import {resetSearch} from '../action/index'
import './SearchBar.css'

function SearchBar ({
    handleInputSearch, 
    handleSearchClick, 
    nameParam,
    handleOrderAscDesc,
    asc,
    handleOrderPopulation,
    ascPob
}){
    const dispartch = useDispatch()

    const handleClickReset=()=>{
        dispartch(resetSearch())
    }

    return <div className="search_container">
        <div className="order_container">
                <div className="order_name">
                    <h2>Orden</h2>
                    <button className="border_btn" onClick={handleOrderAscDesc}>{asc ? "Z-A" : "A-Z" }</button>
                </div>
                <div className="order_rat">
                    <h2 >Orden Population</h2>
                    <button className="border_btn" onClick={handleOrderPopulation}>{ascPob ? "0-9" : "9-0" }</button>

                </div>
            </div> 

            <div className="search_container">
                <form action="" onSubmit={handleSearchClick}>
                    
                    <input className="input_search" type="text" onChange={handleInputSearch} 
                    value={nameParam} required/>
                    
                    <button className="btn_search" type="submit" >Search</button>
                    <span className="reset_btn" onClick={handleClickReset}>
                        <GrUpdate/>

                    </span>
                </form>

            </div>
        </div>

}

export default SearchBar

