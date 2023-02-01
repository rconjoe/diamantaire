import { CustomException } from './';

/**
 * @param {string} src
 * @param {Array.<{name:string, value:string}>} [attributes=[]]
 * based on https://dev.to/timber/wait-for-a-script-to-load-in-javascript-579k
 */
export default class ScriptLoader {
  constructor(options) {
    const { src, attributes = [] } = options;

    this.src = src;
    this.attributes = attributes;
    this.isLoaded = false;
  }

  appendToDOM(script) {
    const [firstEl] = document.getElementsByTagName('script');

    firstEl.parentNode.insertBefore(script, firstEl);
  }

  setAdditionalAttributes(script) {
    if (!this.attributes.length) {
      return;
    }

    this.attributes.forEach(attribute => {
      const [name, value] = Object.entries(attribute)[0];

      script.setAttribute(name, value);
    });
  }

  // TODO: expose script as a way to cleanup listeners
  addScriptListeners(script, resolve, reject) {
    script.addEventListener('load', () => {
      this.isLoaded = true;

      resolve(script);
    });

    script.addEventListener('error', () => {
      reject(new CustomException(`${this.src} could not be loaded`, this.src));
    });
  }

  loadScript() {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');

      // TODO: give optionality for defer vs async
      s.async = true;
      s.type = 'text/javascript';
      s.src = this.src;

      this.setAdditionalAttributes(s);
      this.appendToDOM(s);
      this.addScriptListeners(s, resolve, reject);
    });
  }

  load() {
    return new Promise(async (resolve, reject) => {
      if (!this.isLoaded) {
        try {
          await this.loadScript();
          resolve();
        } catch (e) {
          reject(e);
        }
      } else {
        resolve();
      }
    });
  }
}
