import React from 'react';
import { BsTrashFill } from "react-icons/bs";
import '../css/cards.css'

const CardCurrency = (props) => {
   
     return ( 
        <div className='card_container'>
            <div>
                <p>{props.currens} - {'USD'}</p>
            </div>
            <div>
                <h2>22.33</h2>
            </div>
                <div>
                    <button
                        type="button"
                        className='delet_button'
                        onClick={() => props.remove(props.currens)} 
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