import React from 'react'
import { useDispatch } from 'react-redux'
import { resetSearch } from '../action/index'
import './SearchBar.css'

function SearchBar({
    handleInputSearch,
    handleSearchClick,
    nameParam,
    handleOrderAscDesc,
    asc,
    handleOrderPopulation,
    ascPob
}) {
    const dispartch = useDispatch()

    const handleClickReset = () => {
        dispartch(resetSearch())
    }

    return (

        <div className="search_container">
            <div className="order_container">
                <div className="order_name">
                    <h3>Orden</h3>
                    <button className="border_btn" onClick={handleOrderAscDesc}>{asc ? "Z-A" : "A-Z"}</button>
                </div>
            </div>
            <div className="search">
                <button className="btn_search" onClick={handleClickReset}>
                    Reset
                </button>
                <form className='search_form' action="" onSubmit={handleSearchClick}>

                    <input className="input_search" type="text" onChange={handleInputSearch} value={nameParam} />

                    <button className="btn_search" type="submit" >Search</button>
                </form>

            </div>
            <div className="order_container">
                <div className="order_rat">
                    <h3 >Population</h3>
                    <button className="border_btn" onClick={handleOrderPopulation}>{ascPob ? "0-9" : "9-0"}</button>

                </div>
            </div>
        </div>


    )
}

export default SearchBar

