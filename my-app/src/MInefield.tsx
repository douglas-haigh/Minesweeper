
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

export class Minefield extends React.Component {
    field: Square[][] = [];
    constructor(props: {height:number, width: number} ) { 
        super(props);
        // this.height = props.height;
        // this.width = props.width; 
        for (let col = 0; col < props.width; col++) {
            this.field.push([]);
            for (let row = 0; row < props.height; row++) {
                this.field[col].push(new Square(false));
            }
        }
    }
    render() {
        return( 
            <div className="minefield"> 
                    {this.field.map((col) => {
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

}




   
  
