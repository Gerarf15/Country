import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getCountriesBack} from '../action/index'


const Activity = () => {

    // const dispatch = useDispatch()
    const countriesSave = useSelector((state)=> state.countries)
    
    /* useEffect(()=>{
        dispatch(getCountriesBack())
    }) */

    return (
        <div>
            <h1>Register Activity</h1>
            <form action="">
                <label htmlFor="">name</label>
                <input type="text" name="name" />
                <label htmlFor="">difficulty</label>
                <input type="number" name="difficulty" />
                <label htmlFor="">duration</label>
                <input type="number" name="duration" />
                <label htmlFor="">season</label>
                <input type="text" name="season" />

                <br />
                <label htmlFor="">Countries</label>
                <>
                    <select name="" >
                        {
                            countriesSave.length > 0 ? (
                                countriesSave.map((coun) => {
                                    return (
                                        <option key={coun.id} value={coun.id} className="control_couns" >
    
                                            {coun.name}
                                        </option>
    
                                    )
                                })
                            ) : (
                                <option value="">
                                    cargando...

                                </option>
                            )
                        }
                    </select>
                </>
                <br />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default Activity
