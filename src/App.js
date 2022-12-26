import React, { useState } from 'react';
import './css/App.css';
import LoaderSpiner from './components/Loader'
import CardFetching from './hooks/CardFetching'
import SearchForm from './components/SearchForm';
import AutoCompleteItem from './components/AutoCompleteItem';
import CardCurrency from './components/CardCarrensu';
import WarningTiker from './components/WarningTiker';
import AddButton from './components/AddButton';


function App() {
  const {loading, currensy} = CardFetching()
  const [formValue, setFormValue] = useState('')
  const [filterCurrensys, setfilterCurrensys] = useState([])
  const [choiceCurrensys, setchoiceCurrensys] = useState([])
  const [showWarning, setShowWarning] = useState(false)
  const [warningMssage, setWarningMssage] = useState('')
  
  
  const hendelSearchName = (searchFormValue) => {
    setFormValue(searchFormValue)
    setShowWarning (false)
    if (searchFormValue.trim().length > 1) {
      setfilterCurrensys (currensy.filter((currens) => {
        return  currens[0].toLowerCase().includes(searchFormValue.trim().toLowerCase())
      }).slice(0, 4)) 
    } 
  }
  
  const addNewCard = (clickValue) => {
    setShowWarning (false)
    const newCard = filterCurrensys.filter((filtredCarensys) =>{
      return filtredCarensys[0].toLowerCase().includes(clickValue.toLowerCase())
    })
    if (!choiceCurrensys.includes(newCard[0])) {
      setchoiceCurrensys ([...choiceCurrensys, newCard[0]])
    }else{
      setWarningMssage ('Такий тікер існує!!')
      setShowWarning (true)
    }
  }
  
  const removeCard = (deleteElement) => {
    setShowWarning (false)
    setchoiceCurrensys(choiceCurrensys.filter(choiceCurrensys => choiceCurrensys[0] !== deleteElement))
  }

  const addCardFromForm =(formValue) =>{
    const newCard = currensy.filter((currensy) =>{
        return currensy[0].toLowerCase() === formValue.toLowerCase()
      })
      if (newCard.length >0) {
        if (!choiceCurrensys.includes(newCard[0])) {
        setchoiceCurrensys ([...choiceCurrensys, newCard[0]])
      }else{
        setWarningMssage ('Такий тікер існує!!')
        setShowWarning (true)
      }
      }else {
        setWarningMssage ("Невірне ім'я!!")
        setShowWarning (true)
    }
 
}

  
  return (
    <div className="App">
      {loading && <LoaderSpiner/>}
      <div className='App_form'>
        <SearchForm 
        formInputValue ={hendelSearchName}
        addCardFromForm = {addCardFromForm}
        />
        {showWarning && <WarningTiker warningMssage = {warningMssage}/>}
        { loading ||  filterCurrensys.map(currens => 
          <AutoCompleteItem         
          currens = {currens[0]} 
          addCard = {addNewCard}
          key ={currens[1].Id}/> 
          )}
          <AddButton 
          formValue ={formValue}
          addCardFromForm = {addCardFromForm}
          />
      </div>
      
      { choiceCurrensys.length>0 && <div className='card_fild'> 
        {choiceCurrensys.map(choiceCurrensys => 
          <CardCurrency          
          currens = {choiceCurrensys[0]} 
          key ={choiceCurrensys[1].Id}
          remove ={removeCard}
          /> 
        )} 
      </div>}
    </div>
  );
}

export default App;
