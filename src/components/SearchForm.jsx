import React from 'react';
import '../css/searchForm.css'
const SearchForm = ({formInputValue, addCardFromForm}) => {
    const handlerNameChange = (event) =>{
        formInputValue(event.target.value)
    }

    const addCard = (event) => {
        event.preventDefault()
        addCardFromForm (event.target[0].value)
    }

    return ( 
    <form className= 'search_form' onSubmit={addCard}>
        <h5 className= 'searchform_ticker'>Тікер</h5>
        <input 
            type="text"
            placeholder='Search your currency...'
            className='search_input'
            onChange={handlerNameChange}
            onSubmit={addCard}
        />
    </form>
   );
}
 
export default SearchForm ;