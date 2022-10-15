/**
 * @type {import('stylelint').Config}
 * @see https://github.com/kunlunjs/kunlun-fabric/blob/main/src/stylelint.ts
 */
module.exports = {
  extends: [
    // default: less
    // require.resolve('@kunlunjs/fabric/dist/stylelint')
    // or
    require.resolve('@kunlunjs/fabric/dist/stylelint-scss')
  ],
  rules: {
    'custom-property-pattern': null,
    'no-duplicate-selectors': null,
    'declaration-block-no-redundant-longhand-properties': null
  }
}
