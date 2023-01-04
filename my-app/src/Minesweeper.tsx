// import Mine 
import React from "react";
import { getRandomCoordinates } from "./getRandomCoordinates";
import {Square} from "./Square"


interface MinefieldProps { 
    height: number;
    width: number;
    numMines: number;
}

export class Minefield extends React.Component<MinefieldProps>{
    height: number;
    width: number;
    mines: number;
    field: Square[][] = [];
    gameOver: boolean = false;
    style: React.CSSProperties | undefined;

    constructor(props: MinefieldProps) { 
        super(props);
        this.height = this.props.height;
        this.width = this.props.width 
        this.mines = this.props.numMines;

        console.log(`constructing minefield w dimensions` + [this.height, this.width])

        for (let col = 0; col < this.width; col++) {
            this.field.push([]);
            for (let row = 0; row < this.height; row++) {
                this.field[col].push(new Square([col,row]));
            }
        }
        const mineLocations: number[][] = getRandomCoordinates(this.field, this.mines);
        for (let coordinate of mineLocations) {
            this.field[coordinate[0]][coordinate[1]].plantBomb(); 

        }
        this.style = {
            display: `grid`,
            gridTemplateColumns: `repeat(${this.width}, 30px)`,
            gridTemplateRows: `repeat(${this.height}, 30px)`,
            justifyContent: `center`
        };
    }

    clearMinefield() {
        for (let col of this.field) {
            for (let sq of col) {
                sq.clear();
            }
        }
    }

    getAdjacentSquares(coordinate: number[]): Square[] { 
        const row = coordinate[0];
        const col = coordinate[1];
    
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

    getAdjacentUnrevealedSquares(coordinate:number[]): Square[] { 

        const adjacentSquares = this.getAdjacentSquares(coordinate);
        const unrevealedSquares: Square[] = [];

        for (let sq of adjacentSquares) {
            if (sq.hasRevealed === false) { 
                unrevealedSquares.push(sq);
            }
        }
        return unrevealedSquares;
    }


    getAdjacentSafeSquares(coordinate:number[]): Square[] { 
        const adjacentSquares = this.getAdjacentUnrevealedSquares(coordinate);
        const safeSquares: Square[] = [];
        for (let sq of adjacentSquares) {
            if (!this.isNearBomb(coordinate)) { 
                safeSquares.push(sq);
            }
        }
        return safeSquares;
    }

    isNearBomb(coordinate:number[]):boolean {
        const adjacentSquares = this.getAdjacentSquares(coordinate);
        for (let square of adjacentSquares) {
            if (square.hasBomb) return true
        }
        return false
    }

    getAdjacentBombNumber(coordinate: number[]): number { 
        let bombCount = 0;
        const adjacentSquares: Square[] = this.getAdjacentSquares(coordinate);

        for (let sq of adjacentSquares) {
            if (sq.hasBomb) bombCount ++ 
        }
        return bombCount
    }

    colorAdjacentSquares(coordinate:number[]) {
        const adjacentSquares = this.getAdjacentSafeSquares(coordinate);
        const colors = ['blue', 'red'];
        const randColor = colors[Math.floor(Math.random()*2)]
        for (let sq of adjacentSquares) {
            const element = sq.getElement();
            element != null ? element.style.backgroundColor = randColor : console.log('element not found');
            sq.reveal();
        }
    }

    revealSquare(sq:Square) { 
        const coordinate = sq.position;

        if (sq.hasBomb) { 
            sq.revealBomb();
        }
        else if (this.isNearBomb(coordinate)) {
            sq.revealNumber(this.getAdjacentBombNumber(coordinate));
        }
        else if (!this.isNearBomb(coordinate)) {
            sq.revealSafe();
        }
    }


    handleClick2(coordinate:number[]) { 
        this.colorAdjacentSquares(coordinate);
    }

    //  above 2 functions are for testing purposes.

    revealSafeSquares(sq: Square) {
        const coordinate = sq.position;
        this.revealSquare(sq);
        if (!this.isNearBomb(coordinate)) { 
            const adjacentSquares = this.getAdjacentUnrevealedSquares(coordinate);
            for (let square of adjacentSquares) { 
                if (!this.isNearBomb(coordinate)) {
                    this.revealSafeSquares(square);
                    }
                else if (!square.hasBomb) {
                    this.revealSquare(square);
                }
            }
        }
    }

    handleClick(coordinate:number[]) {
        if (!this.gameOver) {
            const square: Square = this.field[coordinate[0]][coordinate[1]];

            if (!square.hasRevealed) {
                square.reveal();
                if (square.hasBomb) {
                    square.revealBomb();
                    this.gameOver = true;
                }

                else if (this.isNearBomb(coordinate)) {
                    const bombNumber = this.getAdjacentBombNumber(square.position);
                    square.revealNumber(bombNumber);
                }
                else if (!square.hasBomb) {
                    this.revealSafeSquares(square);                   
                }
            }
        }
    }

    render() {
        return (
            <div className="minefield" style={this.style}> 
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






