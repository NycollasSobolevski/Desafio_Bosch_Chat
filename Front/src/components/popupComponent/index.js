import { useEffect, useState } from "react"
import './style.css'

const PopupComponent = (props) => {
    const [popup, setPopup] = useState(
    <>
        <div class="alert bg-warning col col-md-6 col-lg-6 col-sm-10">
            <button class="alert-icon" type="button" aria-label="Close" onClick={ () =>
                setPopup() }>
                <span aria-hidden="true">&times;</span>
            </button>
        <div class="alert-contet">
            { props.message }</div>
        </div>
    </>
    );


    return(
        <>
            { popup }
        </>
    )
}


export default PopupComponent