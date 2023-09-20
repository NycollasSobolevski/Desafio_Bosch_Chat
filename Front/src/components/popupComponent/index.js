import { useEffect, useState } from "react"
import './style.css'

const PopupComponent = (props) => {

    const [showMore, setShowMore] = useState(
        <>
            { props.showMore }
        </>
    )

    const [popup, setPopup] = useState(
    <div className="alert">
        <button class="alert-icon" type="button" aria-label="Close" onClick={ () =>
            setPopup() }>
            <span aria-hidden="true">&times;</span>
        </button>
        <div className="alert-contet col-8">
            { props.message }
        </div>
        <details className="alert-showmore col-4">
            <summary> Show More (for nerds!) </summary>
            { showMore }
        </details>
    </div>
    );


    return(
        <>
            { popup }
        </>
    )
}


export default PopupComponent