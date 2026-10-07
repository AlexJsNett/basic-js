const { NotImplementedError } = require('../lib');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  process(message, key, sign) {
    if (message === undefined || key === undefined) {
      throw new Error('Incorrect arguments!');
    }
    const text = message.toUpperCase();
    const keyUpper = key.toUpperCase();
    let keyIndex = 0;
    let result = '';
    for (const ch of text) {
      if (ch >= 'A' && ch <= 'Z') {
        const shift = keyUpper.charCodeAt(keyIndex % keyUpper.length) - 65;
        const code = (((ch.charCodeAt(0) - 65 + sign * shift) % 26) + 26) % 26;
        result += String.fromCharCode(code + 65);
        keyIndex++;
      } else {
        result += ch;
      }
    }
    return this.isDirect ? result : result.split('').reverse().join('');
  }

  encrypt(message, key) {
    return this.process(message, key, 1);
  }

  decrypt(message, key) {
    return this.process(message, key, -1);
  }
}

module.exports = {
  directMachine: new VigenereCipheringMachine(),
  reverseMachine: new VigenereCipheringMachine(false),
  VigenereCipheringMachine,
};
