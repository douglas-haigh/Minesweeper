
import {Difficulty} from './Difficulty'


interface popupProps {
    setDifficulty: Function;
    handlePopup: () => void;
}

export const DifficultyPopup = (props: popupProps) => {
    return (
        <div>
            Change Difficulty:
            <div id='difficulty-button'> 
                <button onClick={ () => {
                        props.setDifficulty(Difficulty.Easy)
                        props.handlePopup();
                    }} >  
                    Easy   
                </button>

                <button onClick={ () => {
                    props.setDifficulty(Difficulty.Medium)
                    props.handlePopup();
                }}> 
                    Medium 
                </button>

                <button onClick={ () => {
                    props.setDifficulty(Difficulty.Hard)
                    props.handlePopup();
                    }}>   
                    Hard   
                </button>
                
                <span className='popup-close-box' onClick={() => props.handlePopup()}> x </span>
            </div>
        </div>
    )
}




