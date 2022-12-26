import '../css/autoCompleteItem.css'

const AutoCompleteItem = ({currens, addCard}) => {

    const addCardCurrensy = function (event) {
        addCard(event.target.value)
    }

    return ( 
        <button 
            value={currens}
            type="submit" 
            className='autoCompleteItem'
            onClick={addCardCurrensy}
        >
            {currens}
        </button>
     );
}
 
export default AutoCompleteItem;