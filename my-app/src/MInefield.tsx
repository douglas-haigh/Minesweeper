// import Mine 
import React from "react";

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

export class Minefield {
    height: number;
    width: number;
    mines: number;
    field: Square[][] = [];
    // edges: Square[] = [];
    // corners: Square[] = [this.field[0][0]];


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
        // this.corners.push(this.field[0][this.height], this.field[this.width][0], this.field[this.width][this.height]);
        // for (let sq of this.field[0]) {
        //     this.edges.push(sq)
        // } 
        // for (let sq of this.field[this.width]) {
        //     this.edges.push(sq)
        // } 
        // for (let i=0;i<this.width;i++) {
        //     this.edges.push(this.field[i][0]);
        //     this.edges.push(this.field[i][this.height]);
        // }
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

    revealSquare(squareNumber:number[]): void {
        // const squareElement:HTMLElement = document.getElementById(squareNumber.toString());
        const square:Square = this.field[squareNumber[0]][squareNumber[1]];
        square.reveal();
        if (square.hasBomb) { 
            console.log("you hit a bomb!");
        }
        else { console.log("phew") }
    }
}

export const RenderMinefield = ({minefield}: {minefield: Minefield}) => {
    return  (
        <div className="minefield"> 
            {minefield.field.map((col) => {
                return (
                    <div>
                        {col.map((row) => {
                            const coordinate: number[] = [minefield.field.indexOf(col),col.indexOf(row)];
                            const id: string = coordinate.toString();
                            return (
                                <button id={id} className="square-hidden" onClick={() => handleClick(coordinate)}>  </button>
                            )
                        })}
                    </div>
                    )
                })}
        </div>
    ) 
}

function handleClick(sq:number[]) {
    console.log(sq);
}



