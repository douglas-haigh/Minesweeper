import { Minefield } from "./Minesweeper";

export class Square{  
    private _hasBomb: boolean = false;
    private _hasRevealed: boolean = false;
    private _position: number[];
    
    constructor(pPosition:number[]) { 
        this._position = pPosition;
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

    getElement():HTMLElement{
        return document.getElementById(this.position.toString())!;
    }

    revealBomb() {
        this.reveal();
        const element:HTMLElement | null = this.getElement();
        element != null ? element.style.backgroundColor = 'red': console.log('null element error');
        console.log('Boom');
    }

    revealNumber(bombNumber:number) {
        this.reveal();
        const element = this.getElement();
        element.style.backgroundColor = 'yellow'
        element.textContent = bombNumber.toString();
    }

    revealSafe() {
        this.reveal();
        const element:HTMLElement | null = this.getElement();
        element.style.backgroundColor = 'green';
    }

    clear() { 
        this._hasBomb = false
        this._hasRevealed = false
        const element = this.getElement();
        // element.style.backgroundColor = 'rgba(192, 192, 1.92, 1 )';
        // element.textContent = 'p';
    }
}
