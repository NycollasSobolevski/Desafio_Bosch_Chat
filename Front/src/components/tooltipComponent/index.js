import './style.scss'


const Tooltip = (props) => {
    return(
        <div className='d-flex justify-content-between col-md-6 col-sm-12'>
            <span className={ "tooltip tooltip-" + props.role} role="tooltip">
                <span className='close-button' onClick={ props.function }> &times; </span>
                { props.message } 
            </span>
            <span className='show-more'>
                <details>
                    <summary>
                        Show more
                    </summary>
                    <p>
                        { props.showMore }
                    </p>
                </details>
            </span>
        </div>
    )
}


export default Tooltip