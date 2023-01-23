import React, { useState } from 'react';
import './css/App.css';
import LoaderSpiner from './components/Loader'
import CardFetching from './hooks/CardFetching'
import SearchForm from './components/SearchForm';
import AutoCompleteItem from './components/AutoCompleteItem';
import CardCurrency from './components/CardCarrensu';
import WarningTiker from './components/WarningTiker';
import AddButton from './components/AddButton';
import Schedule from './components/Schedule';
import {Context} from './Context'


function App() {
  const {loading, currensy} = CardFetching()
  const [formValue, setFormValue] = useState('')
  const [filterCurrensys, setfilterCurrensys] = useState([])
  const [choiceCurrensys, setchoiceCurrensys] = useState([])
  const [showWarning, setShowWarning] = useState(false)
  const [warningMssage, setWarningMssage] = useState('')
  const [showSchedule, setshowSchedule] = useState(false)
  const [selectedСard, setselectedСard] = useState('')
  const [priceInTime, setPriceInTime] = useState([])
  
 
  const handlerSearchName = (searchFormValue) => {
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
    if (deleteElement === selectedСard) {
      setshowSchedule(false)
    }
  }

  const addCardFromForm =(formValue) =>{
    const newCard = currensy.filter((currensy) =>{
        return currensy[0].toLowerCase() === formValue.toLowerCase()
      })
      if (newCard.length >0 && !choiceCurrensys.includes(newCard[0])) {
        setchoiceCurrensys ([...choiceCurrensys, newCard[0]])
      }else if (newCard.length >0) {
        setWarningMssage ('Такий тікер існує!!')
        setShowWarning (true)
      }else {
        setWarningMssage ("Невірне ім'я!!")
        setShowWarning (true)
    }
}

  const setselectedСardCourse = (course) => {
    setPriceInTime(course)
  }
 
  const handlerSelectedСard = (e) => {
    setshowSchedule(true)
    setselectedСard (e.currentTarget.getAttribute('data-custom-id'))
  }

  const hideSchedule = () => {
    setshowSchedule(false)
  }

  return (
    <Context.Provider value={setselectedСardCourse}>
      <div className="App">
        {loading && <LoaderSpiner/>}
        <div className='App_form'>
          {loading || <SearchForm 
            formInputValue = {handlerSearchName}
            addCardFromForm = {addCardFromForm}
          />}
          {filterCurrensys.length>0 && 
          <div className='autoCompleteContainer'> 
            {loading ||  filterCurrensys.map(currens => 
              <AutoCompleteItem         
              currens = {currens[0]} 
              addCard = {addNewCard}
              key ={currens[1].Id}
              
              /> 
            )}
          </div>}
          
            {showWarning && <WarningTiker warningMssage = {warningMssage}/>}
            {loading || <AddButton 
            formValue ={formValue}
            addCardFromForm = {addCardFromForm}
            />}
        </div>
        
        {choiceCurrensys.length>0 && <div 
        className='card_fild'
        
        > 
          {choiceCurrensys.map(choiceCurrensys => 
            <CardCurrency          
            currens = {choiceCurrensys[0]} 
            key = {choiceCurrensys[1].Id}
            remove ={removeCard}
            onClick = {handlerSelectedСard}
            selectedСard = {selectedСard}
            
            /> 
          )} 
        </div>}
          {showSchedule && <Schedule 
          // selectedСard ={selectedСard}
          courseInTime ={priceInTime}
          hideSchedule = {hideSchedule}
        />}
      </div>
    </Context.Provider>
  );
}

export default App;
