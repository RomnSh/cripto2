import  { useEffect, useState } from 'react';


const CourseFetching = (currensName) => {
    const [course, setCourse] = useState('')
    const apiKey = "0540ac14660cf7002d6f96fd8a4571357bbcdd65a9a0bde132287d224c01e0ab"
    
    async function fetchCourse () {
        try {
            const response = await fetch (`https://min-api.cryptocompare.com/data/price?fsym=${currensName}&tsyms=USD&api_key=${apiKey}`)
            const data = await response.json()
            if (data.Response !== 'Error'){
                setCourse( data.USD)
            }else{
                setCourse('no course')  
            }
        } catch (e) {
            console.error(e);
        }  
    } 
    
    // useEffect(() => {
        
    //         fetchCourse () 
        
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //   },[])
    


      useEffect(() => {
        fetchCourse ()
        
      },[])

    return course ;
}
 
export default CourseFetching;