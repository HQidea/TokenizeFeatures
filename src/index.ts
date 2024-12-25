
class TokenizeFeatures {
  static COMMA_CODE = ','.charCodeAt(0);
  static EQUAL_CODE = '='.charCodeAt(0);
  #str: string;
  #tokenizedFeatures: Map<string, any>;

  constructor(str: string) {
    this.#str = str;
    this.#tokenizedFeatures = new Map<string, any>();
    this.tokenize();
  }

  tokenize() {
    const _str = this.#str;
    let i = 0;

    while (i < _str.length) {
      let name = '';
      let value = '';

      while (i < _str.length && this.isFeatureSeparator(_str.charAt(i))) {
        i++;
      }

      while (i < _str.length && !this.isFeatureSeparator(_str.charAt(i))) {
        name += _str.charAt(i);
        i++;
      }

      name = this.normalizeFeatureName(name);

      while (i < _str.length && _str.charCodeAt(i) !== TokenizeFeatures.EQUAL_CODE) {
        if (_str.charCodeAt(i) === TokenizeFeatures.COMMA_CODE || !this.isFeatureSeparator(_str.charAt(i))) {
          break;
        }
        i++;
      }

      if (this.isFeatureSeparator(_str.charAt(i))) {
        while (i < _str.length && this.isFeatureSeparator(_str.charAt(i))) {
          if (_str.charCodeAt(i) === TokenizeFeatures.COMMA_CODE) {
            break;
          }
          i++;
        }

        while (i < _str.length && !this.isFeatureSeparator(_str.charAt(i))) {
          value += _str.charAt(i);
          i++;
        }
      }

      if (name) {
        this.#tokenizedFeatures.set(name, value.toLowerCase());
      }
    }
  }

  get(name: string): string {
    return this.#tokenizedFeatures.get(name);
  }

  isSet(name: string): boolean {
    const has = this.#tokenizedFeatures.has(name);

    if (has) {
      const value = this.#tokenizedFeatures.get(name);

      if (value === '' || value === 'yes' || value === 'true') {
        return true;
      } else {
        let int = parseInt(value);
        if (isNaN(int)) {
          int = 0;
        }
        return int !== 0;
      }
    }

    // should Return defaultValue
    return false;
  }

  normalizeFeatureName(str: string): string {
    const _str = str.toLowerCase();
    switch (_str) {
      case 'screenx':
        return 'left';
      case 'screeny':
        return 'top';
      case 'innerwidth':
        return 'width';
      case 'innerheight':
        return 'height';
      default:
        return _str;
    }
  }

  isFeatureSeparator(char: string): boolean {
    const code = char.charCodeAt(0);
    return this.isASCIIWhitespace(code) || code === TokenizeFeatures.EQUAL_CODE || code === TokenizeFeatures.COMMA_CODE;
  }

  isASCIIWhitespace(code: number): boolean {
    return (
      code === 0x0009 || // TAB
      code === 0x000A || // LF
      code === 0x000C || // FF
      code === 0x000D || // CR
      code === 0x0020    // SPACE
    );
  }

}

export default TokenizeFeatures;
