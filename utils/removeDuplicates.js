/**
 * @param {Array} arr The Array to iterate over
 * @param {String} property The property to check against
 * @returns {Array} An array with unique objects
 */
export default function removeDuplicates(arr, property) {
    return arr
        // store the comparison values in array
        .map(e => e[property])
        // store the indexes of the unique objects
        .map((e, i, all) => all.indexOf(e) === i && i)
        // eliminate the false indexes & return unique objects
        .filter(e => arr[e])
        .map(e => arr[e])
}