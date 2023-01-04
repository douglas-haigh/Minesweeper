import React, {useState, useEffect} from 'react';
import './App.css';
import { DifficultyPopup } from './ChooseDifficulty';
import { Difficulty } from './Difficulty';
// import { Minefield } from './Minesweeper';
import { MinefieldFactory} from './MinefieldFactory'

export default function App(): any {


  const [isOpen, setIsOpen] = useState(false);
  const [difficulty, setDifficulty]= useState<Difficulty>(Difficulty.Medium);
  
  const handlePopup = () => {
    setIsOpen(!isOpen); 
  }

  // useEffect(() => {setDifficulty(difficulty);}, [difficulty]);


  
  return ( 
    <div className='App'>
    
      <div className='popup'> 
        <DifficultyPopup 
          setDifficulty={setDifficulty}
          handlePopup={handlePopup}
        /> 

      </div>
  
      <MinefieldFactory difficulty={difficulty}/> 

    </div>
  )
}

