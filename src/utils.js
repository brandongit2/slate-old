/**
 * Finds the distance between two points.
 *
 * @param {number} a - The first point, in the form [x1, y1]
 * @param {number} b - The second point, in the form [x2, y2]
 *
 * @returns {number} The distance between the two points.
 */
export function distance(a, b) {
    return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
}

/**
 * Finds the midpoint of two points.
 *
 * @param {number} a - The first point, in the form [x1, y1]
 * @param {number} b - The second point, in the form [x2, y2]
 *
 * @returns {number} The midpoint of the two points, in the form [x, y].
 */
export function midpoint(a, b) {
    if (a && b) {
        return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    }
}

/**
 * Takes the base-b logarithm of x.
 *
 * @param {number} x - The number to take the logarithm of.
 * @param {number} b - The base of the logarithm.
 *
 * @returns {number} The base-b logarithm of x.
 */
export function log_b(x, b) {
    return Math.log(x) / Math.log(b);
}
