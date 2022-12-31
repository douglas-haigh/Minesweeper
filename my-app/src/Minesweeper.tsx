// import Mine 
import React, { useState } from "react";
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

export class Square{  
    private _hasBomb: boolean = false;
    private _hasRevealed: boolean = false;
    private _position: number[];
    
    constructor(pPosition:number[]) { 
        this._position = pPosition;
        console.log(this.position.toString())

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

    get position(): number[] {
        return this._position;
    }

    getElement() {
        return document.getElementById(this.position.toString());
    }

}

export class Minefield extends React.Component<MinefieldProps>{
    height: number;
    width: number;
    mines: number;
    field: Square[][] = [];

    constructor(props: MinefieldProps) { 
        super(props);
        console.log("constructing");
        this.height = this.props.height;
        this.width = this.props.width 
        this.mines = this.props.numMines;
        for (let col = 0; col < this.width; col++) {
            this.field.push([]);
            for (let row = 0; row < this.height; row++) {
                this.field[col].push(new Square([col,row]));
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
        // square.element.style.backgroundColor = 'blue';
        if (!square.hasRevealed) {
            square.reveal();
            if (square.hasBomb) {
                this.revealBomb(square);
                // bombSquareLogic();
            }
            else if (!square.hasBomb) {
                this.revealSafe(square);
                // safeSquarelogic();
            }
        }
    }
// maybe move the revealBomb and revealSquare methods into Square class ??
    revealBomb(square:Square) {
        const element:HTMLElement | null = square.getElement();
        element != null ? element.style.backgroundColor = 'red': console.log('element with id' + square.position.toString() +  'not found');
        console.log('Boom');
    }

    // revealNumber(coordinate:number[], number:number) {
    //     const squareElement: any = document.getElementById(coordinate.toString());
    //     squareElement.style.backgroundcolor = 'yellow';
    //     console.log('you are close to' + number + 'bombs');
    // }

    revealSafe(square:Square) {
        const element:HTMLElement | null = square.getElement();
        element != null ? element.style.backgroundColor = 'green' : console.log('error');
    }

    render() {
        return (
            <div className="minefield"> 
                {this.field.map((col) => {
                    return (
                        <div>
                            {col.map((row) => {
                                const coordinate: number[] = [this.field.indexOf(col),col.indexOf(row)];
                                const id: string = coordinate.toString();
                                console.log('id = '+ id);
                                return (
                                    <button id={id} className="square-hidden" onClick={() => this.handleClick(coordinate)}>  </button>
                                )
                            })}
                        </div>
                        )
                    })}
            </div>)}
}






