import { Difficulty } from "./Difficulty";
import { Minefield } from "./Minesweeper";
import React from "react";
import { render } from "@testing-library/react";

interface FactoryProps { 
    difficulty: Difficulty;
}

export class MinefieldFactory extends React.Component<FactoryProps> {

        minefield: Minefield;
        difficulty: Difficulty

        constructor(props: FactoryProps) { 
            super(props)
            this.difficulty = this.props.difficulty;
            switch(this.difficulty) { 
            
            case Difficulty.Easy:
                console.log('difficulty easy = ' + props.difficulty)
                this.minefield = new Minefield({height:9, width:9,numMines:10})
                break
                // return <Minefield height={9} width={9} numMines={10} />
            
            case Difficulty.Medium:
                console.log('difficulty medium = ' + props.difficulty)
                this.minefield = new Minefield({height:12, width:12,numMines:20})
                break
                // return <Minefield height={12} width={12} numMines={20} />

            case Difficulty.Hard:
                console.log('difficulty hard = ' + props.difficulty)
                this.minefield = new Minefield({height:15, width:15,numMines:30})
                break
                // return <Minefield height={15} width={15} numMines={30} />
            }
        }

    render() {
        console.log('rendering minefield')
        console.log(this.difficulty)
        return (
            this.minefield.render()
        )
    }
}

// export const MinefieldFactoryMemo = React.memo(MinefieldFactory);