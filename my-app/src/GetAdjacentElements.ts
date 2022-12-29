
export function getAdjacentElements(arr: any[][], element: any) {
    const adjacentElements = [];
    const row = arr.findIndex(subArr => subArr.includes(element));
    const col = arr[row].findIndex(e => e === element);
  
    // Check if element is not in the first row
    if (row > 0) {
      adjacentElements.push(arr[row - 1][col]);
    }
    // Check if element is not in the last row
    if (row < arr.length - 1) {
      adjacentElements.push(arr[row + 1][col]);
    }
    // Check if element is not in the first column
    if (col > 0) {
      adjacentElements.push(arr[row][col - 1]);
    }
    // Check if element is not in the last column
    if (col < arr[row].length - 1) {
      adjacentElements.push(arr[row][col + 1]);
    }
  
    // Check if element is not in the top-left corner
    if (row > 0 && col > 0) {
      adjacentElements.push(arr[row - 1][col - 1]);
    }
    // Check if element is not in the top-right corner
    if (row > 0 && col < arr[row].length - 1) {
      adjacentElements.push(arr[row - 1][col + 1]);
    }
    // Check if element is not in the bottom-left corner
    if (row < arr.length - 1 && col > 0) {
      adjacentElements.push(arr[row + 1][col - 1]);
    }
    // Check if element is not in the bottom-right corner
    if (row < arr.length - 1 && col < arr[row].length - 1) {
      adjacentElements.push(arr[row + 1][col + 1]);
    }
  
    return adjacentElements;
  }
  