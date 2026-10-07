const { NotImplementedError } = require('../lib');

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */
function renameFiles(names) {
  const used = new Map();
  return names.map((name) => {
    if (!used.has(name)) {
      used.set(name, 1);
      return name;
    }
    let k = used.get(name);
    let candidate = `${name}(${k})`;
    while (used.has(candidate)) {
      k++;
      candidate = `${name}(${k})`;
    }
    used.set(name, k + 1);
    used.set(candidate, 1);
    return candidate;
  });
}

module.exports = {
  renameFiles
};
