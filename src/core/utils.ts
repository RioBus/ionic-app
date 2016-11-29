/**
 * ColorUtils is a helper class to generate colors.
 * 
 * @export
 * @class ColorUtils
 */
export class ColorUtils {

    /**
     * Generates a random number between 0-255 to use as color filter.
     * 
     * @private
     * @static
     * @returns {number}
     */
    private static random(): number {
        return Math.floor(Math.random() * 255);
    }

    /**
     * Returns a Hex string for the given values of RGB.
     * 
     * @static
     * @param {number} r - Red filter value (0-255)
     * @param {number} g - Green filter value (0-255)
     * @param {number} b - Blue filter value (0-255)
     * @returns {string}
     */
    public static RGBtoHex(r: number, g: number, b: number): string {
        return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    /**
     * Generates a random color.
     * 
     * @static
     * @param {(r: number, g: number, b: number) => boolean} [fn] - Filters the color
     * @returns {string}
     */
    public static randomColor(fn?: (r: number, g: number, b: number) => boolean): string {
        let red: number = ColorUtils.random();
        let green: number = ColorUtils.random();
        let blue: number = ColorUtils.random();
        return (!fn || fn(red, green, blue)) ? ColorUtils.RGBtoHex(red, green, blue) : ColorUtils.randomColor(fn);
    }
}
