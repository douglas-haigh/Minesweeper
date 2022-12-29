// import Mine 

import React from "react";

export class Square {  
    private _hasBomb: boolean;

    constructor(pHasBomb: boolean) { 
        this._hasBomb = pHasBomb;
    }

    get hasBomb(): boolean { 
        return this._hasBomb;
    }
    plantBomb(): void {
        this._hasBomb = true;
    }
}

export class Minefield {
    height: number;
    width: number;
    mines: number;
    field: Square[][] = [];

    constructor(pHeight:number, pWidth: number, pMines:number) { 
        this.height = pHeight;
        this.width = pWidth; 
        this.mines = pMines;
        for (let col = 0; col < this.width; col++) {
            this.field.push([]);
            for (let row = 0; row < this.height; row++) {
                this.field[col].push(new Square(false));
            }
        }

    }
}

export const RenderMinefield = (props: {height: number, width: number}) => {
    // const minefield = new Minefield(props.height,props.width, 0);
    // return( 
    //     <div className="minefield"> 
    //             {minefield.field.map((col) => {
    //                 return (
    //                     <div>
    //                         {col.map((i) => {
                            
    //                             return <p className="square-hidden"> M </p>;
    //                         })}
    //                     </div>
    //                     )
    //                 })}
    //         </div>
    //         )
    const totalSquaresArray = new Array(props.height*props.width).fill(0);
    return (
        <div className="minefield">
            {totalSquaresArray.map(() => {
                return <p className="square-hidden">  </p>
            })}
        </div>
    )
    }


   
  
