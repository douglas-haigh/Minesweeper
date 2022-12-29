// import Mine 

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
    field: Square[][] = [];

    constructor(pHeight:number, pWidth: number ) { 
        this.height = pHeight;
        this.width = pWidth; 
        for (let col = 0; col < this.width; col++) {
            this.field.push([]);
            for (let row = 0; row < this.height; row++) {
                this.field[col].push(new Square(false));
            }
        }
    }
}

export const MinefieldCreator = (props: {height: number, width: number}): any => {
    const minefield = new Minefield(props.height,props.width);
    console.log(props.width);
    return( 
        <div className="minefield"> 
                {minefield.field.map((col) => {
                    return (
                        <div>
                            {col.map(() => {
                                return <p> M </p>;
                            })}
                            
                        </div>
                        )
                    })}
            </div>
            )
    }


   
  
