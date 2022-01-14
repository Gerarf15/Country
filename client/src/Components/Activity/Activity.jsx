import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getTypes } from '../action/index'


const Activity = () => {

    const countriesSave = useSelector((state)=> state.countries)
    const typesSave = useSelector((state)=> state.types)
    const dispatch = useDispatch()


    // const [selectSeason, setSelectSeason] = useState()
    const [selectCountries, setSelectCountries] = useState([])
    
    const initialAct = {
        name:"",
        difficulty:"",
        duration:"",
        season:null,
        countriesId: []
        
    }

    const [activityObj, setActivityObj] = useState(initialAct) 

    //obtener el input
    const handleInputChange=(e)=>{
        const {name, value} = e.target
    
        setActivityObj({
            ...activityObj,
            [name]: value
        })
    }

    
    const handleSelectSeason=(e)=>{
        // const valor = selectSeason.find(elem => elem.id === e.target.value)

        setActivityObj({
            ...activityObj,
            season: e.target.value
        })
        if (e.target.options[e.target.selectedIndex].text === "Select") return alert("item incorrecto")
        /* if (e.target.options[e.target.selectedIndex].text === "Select") return alert("item incorrecto")
        if (valor) return alert("el valor ya fue seleccionado")
        else {
            setSelectSeason([
                ...selectSeason,
                { id: e.target.value, name: e.target.options[e.target.selectedIndex].text }
            ])
        } */
    }

    const handleSelectTypes =(e)=>{
        setActivityObj({
            ...activityObj,
            name: e.target.value
        })
        if (e.target.options[e.target.selectedIndex].text === "Select") return alert("item incorrecto")
    }

    const handleSelectCountnries=(e)=>{
        const pais = selectCountries.find(coun=> coun.id === e.target.value)
        if(pais) return alert("pais ya seleccionado") 
        // console.log(e.target.value, e.target.options[e.target.selectedIndex].text)
        setSelectCountries([
            ...selectCountries,
            { id: e.target.value, name: e.target.options[e.target.selectedIndex].text }
        ])
    }
    
    const getArrayCountries = () => {
        let arraycountries = selectCountries.map(countries => countries.id)
        return arraycountries
    }
    
    const handleSumit= async(e)=>{
        e.preventDefault()    
        if(!activityObj.season ){
            return alert("completar season")
        }  
        const arraycountries = getArrayCountries()
        const objToBack = {
            ...activityObj,
            countriesId: arraycountries
        }
        const response = await fetch("http://Localhost:3001/activity", 
        {method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objToBack) }
        )

        
        if(response.status === 201){
            const result = await response.json()
            alert(result.message)

         }else{
            console.log("Oops, esta mal")
         }
    }

    useEffect(()=>{
        dispatch(getTypes())
    },[])

    return (
        <div>
            <h1>Register Activity</h1>
            <form action="" onSubmit={handleSumit}>
                <label htmlFor="">name</label>
                <select name="name" id="" onChange={handleSelectTypes}>
                    <option value="">Select</option>
                    {
                        typesSave.length > 0 ? typesSave.map(types => {
                            return <option key={types.id} value={types.name}>{types.name}</option>
                        }) : (
                            <option  value="">Activities</option>
                        )
                    }
                </select>
                <ul className="container_list"><li>{activityObj.name}</li> </ul>

                <label htmlFor="">difficulty</label>
                <input type="number" name="difficulty" onChange={handleInputChange}/>
                <label htmlFor="">duration</label>
                <input type="number" name="duration" onChange={handleInputChange}/>
                <label htmlFor="">season</label>
                <select name="season" id="" onChange={handleSelectSeason}>
                    <option value="">Select</option>
                    <option value="summer" >Summer</option>
                    <option value="auntumn">Auntumn</option>
                    <option value="winter">Winter</option>
                    <option value="sprint">Sprint</option>
                </select>
                <ul className="container_list"><li>{activityObj.season}</li> </ul>
                <br />
                <label htmlFor="">Countries</label>
                <>
                    <select name="countries" onChange={handleSelectCountnries}>
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
                <ul className="container_list"> {selectCountries.map(el => <li key={el.id}>{el.name} {/* <span id={el.id} className="remove" onClick={handleRemove}>X</span> */} </li>)}</ul>
                    
                </>
                <br />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default Activity
