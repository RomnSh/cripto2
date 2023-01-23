import React, { useState, useEffect, useContext  } from 'react';
import { BsTrashFill } from "react-icons/bs";
import '../css/cards.css'
import { Context } from '../Context';

const CardCurrency = (props) => {
    const [course, setCourse] = useState([])
    const apiKey = "0540ac14660cf7002d6f96fd8a4571357bbcdd65a9a0bde132287d224c01e0ab"
    const setSelectedСardCourse = useContext(Context)
    
    
    async function fetchCourse () {
        try {
            const response = await fetch (`https://min-api.cryptocompare.com/data/price?fsym=${props.currens}&tsyms=USD&api_key=${apiKey}`)
            const data = await response.json()
            if (data.Response !== 'Error'){
                setCourse((course) => ([...course, data.USD])  )
            }else{
                setCourse('no course')  
            }
        } catch (e) {
            console.error(e);
        }  
    } 
    useEffect(() => {
        fetchCourse ()
       // eslint-disable-next-line react-hooks/exhaustive-deps 
      },[])

    useEffect(() => {
        setInterval( () => {
            fetchCourse () 
        },5000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    if (props.selectedСard === props.currens) {
        setSelectedСardCourse(course)  
    }
    
     return ( 
        <div 
        className='card_container' 
        data-custom-id={props.currens}
        onClick = {props.onClick}
        >
            <div>
                <p className='card_currency_title'>{props.currens} - {'USD'}</p>
            </div>
            <div>
                <h3 className='card_currency_course'
                >
                    {course[course.length - 1]}
                </h3>
            </div>
                <div>
                    <button
                        type="button"
                        className='delet_button'
                        onClick={ (event) => {
                            event.stopPropagation();                            
                            props.remove(props.currens)}
                        } 
                    >
                        <span>
                            <BsTrashFill/>
                        </span>
                        <span> Видалити</span>
                    </button>
                </div>
        </div>
     );
}
 
export default CardCurrency;