// import Mine 

export class Square {  
    private _hasBomb: boolean = false;

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
    field: Square[][];

    constructor(pHeight:number, pWidth: number ) { 
        this.height = pHeight;
        this.width = pWidth;
        this.field = new Array(this.width) 
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                const emptySquare: Square = new Square();
                this.field[col].push(emptySquare);
            }
        }
        console.log(this.field);
    }
}