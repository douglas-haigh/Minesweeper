// import Mine 
import React from "react";
import { getRandomCoordinates } from "./getRandomCoordinates";


interface MinefieldProps { 
    height: number;
    width: number;
    numMines: number;
}


function range(start:number, end:number):number[] { 
    let ans = [];
    for (let i=start; i < end; i++ ) {
        ans.push(i);
    }
    return ans;
};

export class Square {  
    private _hasBomb: boolean;
    private _hasRevealed: boolean = false;

    constructor(pHasBomb: boolean) { 
        this._hasBomb = pHasBomb;
    }

    get hasBomb(): boolean { 
        return this._hasBomb;
    }
    plantBomb(): void {
        this._hasBomb = true;
    }

    get hasRevealed(): boolean {
        return this._hasRevealed;
    }
    reveal(): void { 
        this._hasRevealed = true;
    }
}

export class Minefield extends React.Component<MinefieldProps>{
    height: number;
    width: number;
    mines: number;
    field: Square[][] = [];
    // edges: Square[] = [];
    // corners: Square[] = [this.field[0][0]];

    constructor(props: MinefieldProps) { 
        super(props);
        console.log("constructing");
        this.height = this.props.height;
        this.width = this.props.width 
        this.mines = this.props.numMines;
        for (let col = 0; col < this.width; col++) {
            this.field.push([]);
            for (let row = 0; row < this.height; row++) {
                this.field[col].push(new Square(false));
            }
        }
        const mineLocations: number[][] = getRandomCoordinates(this.field, this.mines);
        for (let coordinate of mineLocations) {
            this.field[coordinate[0]][coordinate[1]].plantBomb(); 
            console.log("bomb planted at" + coordinate)
        }
    }

    getAdjacentSquares(squareNumber: number[]): Square[] { 
        const col = squareNumber[0];
        const row = squareNumber[1];
    
        let adjacentSquares: Square[] = [];
        
        if (row > 0) {
            adjacentSquares.push(this.field[row - 1][col]);
          }

          if (row < this.field.length - 1) {
            adjacentSquares.push(this.field[row + 1][col]);
          }

          if (col > 0) {
            adjacentSquares.push(this.field[row][col - 1]);
          }

          if (col < this.field[row].length - 1) {
            adjacentSquares.push(this.field[row][col + 1]);
          }

          if (row > 0 && col > 0) {
            adjacentSquares.push(this.field[row - 1][col - 1]);
          }

          if (row > 0 && col < this.field[row].length - 1) {
            adjacentSquares.push(this.field[row - 1][col + 1]);
          }

          if (row < this.field.length - 1 && col > 0) {
            adjacentSquares.push(this.field[row + 1][col - 1]);
          }

          if (row < this.field.length - 1 && col < this.field[row].length - 1) {
            adjacentSquares.push(this.field[row + 1][col + 1]);
          }
          return adjacentSquares;
    }

    handleClick(coordinate:number[]) {
        console.log(coordinate);
        const square: Square = this.field[coordinate[0]][coordinate[1]];
        if (square.hasBomb) { console.log('Boom')};
    }
    // revealSquare(squareNumber:number[]): void {
    //     // const squareElement:HTMLElement = document.getElementById(squareNumber.toString());
    //     const square:Square = this.field[squareNumber[0]][squareNumber[1]];
    //     square.reveal();
    //     if (square.hasBomb) { 
    //         console.log("you hit a bomb!");
    //     }
    //     else { console.log("phew") }
    // }
    render() {
        return (
            <div className="minefield"> 
                {this.field.map((col) => {
                    return (
                        <div>
                            {col.map((row) => {
                                const coordinate: number[] = [this.field.indexOf(col),col.indexOf(row)];
                                const id: string = coordinate.toString();
                                return (
                                    <button id={id} className="square-hidden" onClick={() => this.handleClick(coordinate)}>  </button>
                                )
                            })}
                        </div>
                        )
                    })}
            </div>)}
}






