declare let localStorage: any;

export class storage {

  static prefix = 'sophos_';

  static get(key: string) {
    if (this.exists(key))
      return JSON.parse(localStorage[_(key)]);
    return null;
  }

  static raw(key: string) {
    if (this.exists(key))
      return localStorage[_(key)];
    return null;
  }

  static exists(key: string) {
    return !!localStorage[_(key)];
  }

  static set(key: string, value: any) {
    localStorage[_(key)] = JSON.stringify(value);
  }

  static remove(key: string) {
    localStorage.removeItem(_(key));
  }

  static push(key: string, value: any) {
    if (!this.exists(key))
      this.set(key, value);
    else {
      const values = this.get(key);
      values.push(value);
      this.set(key, values);
    }
  }

  static unshift(key: string, value: any) {
    if (!this.exists(key))
      this.set(key, value);
    else {
      const values = this.get(key);
      values.unshift(value);
      this.set(key, values);
    }
  }

  static clear() {
    localStorage.clear();
  }

  static unset(key) {
    localStorage.removeItem(_(key));
  }

}

function _(key) {
  return `${storage.prefix}${key}`;
}
