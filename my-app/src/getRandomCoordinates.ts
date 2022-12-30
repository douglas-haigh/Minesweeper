export function getRandomCoordinates<S>(array: S[][], numberOfCoords:number): number[][] {
    // Works for rectangular arrays.

    const dimensions: number[] = [array.length,array[0].length]
    const randoms: number[][] = [];
    let randx: number, randy: number;
    while (randoms.length<numberOfCoords) {
        randx = Math.floor(Math.random() * dimensions[0])
        randy = Math.floor(Math.random() * dimensions[1])
        if (!randoms.some((coord) => coord[0] === randx && coord[1] === randy)) {
            randoms.push([randx,randy]);
        } 
    }
    return randoms;
}
