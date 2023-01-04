import { Difficulty } from "./Difficulty";
import { Minefield } from "./Minesweeper";
import React from "react";
import { render } from "@testing-library/react";


export const MinefieldFactory = (props: {difficulty: Difficulty}) => { 

        const difficulty = props.difficulty;

        switch(difficulty) { 
        case Difficulty.Easy:
            console.log('difficulty easy = ' + props.difficulty)
            const easyMinefield =  new Minefield({height: 9, width: 9, numMines: 10})
            // easyMinefield.clearMinefield();
            return ( easyMinefield.render()) 
            // return (<Minefield height={9} width={9} numMines={10}/>)

        case Difficulty.Medium:
            console.log('difficulty medium = ' + props.difficulty)
            const mediumMinefield =  new Minefield({height: 12, width: 12, numMines: 20})
            // mediumMinefield.clearMinefield();
            return ( mediumMinefield.render()) 

        case Difficulty.Hard:
            console.log('difficulty hard = ' + props.difficulty)
            const hardMinefield =  new Minefield({height: 15, width: 15, numMines: 40})
            // hardMinefield.clearMinefield();
            return ( hardMinefield.render()) 
        }
    }

// export const MinefieldFactoryMemo = React.memo(MinefieldFactory);