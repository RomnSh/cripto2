import '../css/addButon.css'
import { IoIosAddCircleOutline } from "react-icons/io";


const AddButton = ({formValue, addCardFromForm}) => {
   
   const addCardForm = function () {
    addCardFromForm(formValue)
   }

    return ( 
        <button 
            className="add_button"
            onClick={addCardForm}
        >
            <IoIosAddCircleOutline className='add_Icon'/> 
            <span> Додати</span>
        </button>
     );
}
 
export default AddButton;