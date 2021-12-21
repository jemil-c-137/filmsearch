const makeSlug = (string) => string.toLowerCase().split(' ').join('-');

module.exports = {
  makeSlug
}
