import path from 'path'

/** @type {import('@docusaurus/types').Plugin} */
export default () => ({
  name: 'docusaurus-theme-reference-codeblock',

  getThemePath() {
    return path.resolve(__dirname, './theme')
  },
  // https://docusaurus.io/zh-CN/docs/api/plugin-methods/lifecycle-apis#configureWebpack
  configWebpack(/* config, isServer, utils */) {
    return {
      resolve: {
        fallback: {
          url: require.resolve('url/')
        }
      }
    }
  }
})
