import React from 'react';
import '../css/searchForm.css'
const SearchForm = ({formInputValue, addCardFromForm}) => {
    const hendleNameChange = (event) =>{
        formInputValue(event.target.value)
    }

    const addCard = (event) => {
        event.preventDefault()
        addCardFromForm (event.target[0].value)
    }

    return ( 
    <form className= 'search_form' onSubmit={addCard}>
        <h4 className= 'searchform_ticker'>Тікер</h4>
        <input 
            type="text"
            placeholder='Search your currency...'
            className='search_input'
            onChange={hendleNameChange}
            onSubmit={addCard}
        />
    </form>
   );
}
 
export default SearchForm ;