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

    getElement():HTMLElement | null {
        return document.getElementById(this.position.toString());
    }

}

export class Minefield extends React.Component<MinefieldProps>{
    height: number;
    width: number;
    mines: number;
    field: Square[][] = [];
    gameOver: boolean = false;

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
        const adjacentSquares = this.getAdjacentSquares(coordinate);
        for (let sq of adjacentSquares) {
            const element = sq.getElement();
            element != null ? element.style.backgroundColor = 'blue' : console.log('element not found');
        }
    }

    handleClick(coordinate:number[]) {
        if (!this.gameOver) {
            console.log(coordinate);
            const square: Square = this.field[coordinate[0]][coordinate[1]];
            // square.element.style.backgroundColor = 'blue';
            if (!square.hasRevealed) {
                square.reveal();
                if (square.hasBomb) {
                    this.revealBomb(square);
                    this.gameOver = true;
                    // bombSquareLogic();
                }
                else if (this.isNearBomb(coordinate)) {
                    this.revealNumber(square);
                    //nearBombLogic();
                }
                else if (!square.hasBomb) {
                    this.revealSafe(square);
                    // safeSquarelogic();
                }
            }
        }
    }

    handleClick2(coordinate:number[]) { 
        console.log(coordinate);
        this.colorAdjacentSquares(coordinate);
    }


    
// maybe move the revealBomb and revealSquare methods into Square class ??
    revealBomb(square:Square) {
        const element:HTMLElement | null = square.getElement();
        element != null ? element.style.backgroundColor = 'red': console.log('null element error');
        console.log('Boom');
    }

    revealNumber(square:Square) {
        const element = square.getElement();
        const bombNumber = this.getAdjacentBombNumber(square.position);
        element != null ? element.style.backgroundColor = 'yellow' : console.log('null element error');
        element != null ? element.textContent = bombNumber.toString(): console.log('null element');
        console.log('you are close to' + bombNumber + 'bombs');

    }

    revealSafe(square:Square) {
        const element:HTMLElement | null = square.getElement();
        element != null ? element.style.backgroundColor = 'green' : console.log('null element error')
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
                                return (
                                    <button id={id} className="square-hidden" onClick={() => this.handleClick(coordinate)}>  </button>
                                )
                            })}
                        </div>
                        )
                    })}
            </div>)}
}






