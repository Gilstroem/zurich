export function removeAt(array, index) {
    return array.slice(0, index).concat(array.slice(index + 1));
}
