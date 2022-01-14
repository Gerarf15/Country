import React from 'react'
import {GrUpdate} from 'react-icons/gr'
import {BiFilterAlt} from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import {resetSearch} from '../action/index'
import './SearchBar.css'

function SearchBar ({
    handleInputSearch, 
    handleSearchClick, 
    nameParam,
    handleOrderAscDesc,
    asc,
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
                {/* <div className="order_rat">
                    <h2 >Orden Rating</h2>
                    <button className="border_btn" onClick={handleOrderPopulation}>{ascRat ? "0-9" : "9-0" }</button>

                </div> */}
            </div> 

            <form action="" onSubmit={handleSearchClick}>
                <span className="filter_btn" >
                    <BiFilterAlt/>

                </span>
                <input type="text" onChange={handleInputSearch} 
                value={nameParam} required/>
                
                <button type="submit" >Search</button>
                <span className="reset_btn" onClick={handleClickReset}>
                    <GrUpdate/>

                </span>
            </form>
        </div>

}

export default SearchBar

