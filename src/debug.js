import { sprites } from "./draw";
import { Input } from "./systems";

/**
 * @class
 */
export class Debug {
  /**
   * @param {Draw} imageName
   * @param {string} imagePath
   * @returns {Promise<HTMLImageElement>}
   */
  listSprites() {
    let keys = Object.keys(sprites);
    keys.forEach((key) => {
      console.log(key + "|" + sprites[key]);
    });
  }
}
