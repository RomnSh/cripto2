import { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai";
import '../css/schedule.css'



const Schedule = (props) => {

    const [price, setPrise] = useState([])
    useEffect(() => {
        setPrise (props.courseInTime)
    }, [props.courseInTime])
    
    function veigthGraph (course) {
        const maxValue = Math.max(...price)
        const minValue = Math.min(...price)
        if ((maxValue-minValue) === 0) {
            return 10
        } else {
            return (((course-minValue) / (maxValue-minValue) * 100) + 5 )
        }  
    }


    return ( 
        <div className="scheduleContainer">
            <div className='hideSchedule' onClick={props.hideSchedule}>
                <span className="material-symbols-outlined"> <AiOutlineCloseCircle/></span>
            </div>

            {price.map ((course, index) => <div className="schedul_column" style={{height: `${veigthGraph (course)}%`}} key={index}><span className='schedul_column_course'>{course}</span></div>) }
        
        </div>
     );
}
 
export default Schedule;