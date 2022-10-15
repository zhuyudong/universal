import fs from 'fs-extra'
import path from 'path'
import glob from 'glob-promise'
import siteConfig from '../docusaurus.config'

// eslint-disable-next-line regexp/no-super-linear-backtracking, regexp/match-any, regexp/no-useless-flag
const codeBlockReferenceRegExp = new RegExp(/```[a-zA-Z]+([\w\W]+)```/m)

const missingAssets = []
let queue = Promise.resolve()
glob('./{blog,docs,content}/**/*.{md,mdx}')
  .then(files => {
    files.forEach(file => {
      queue = queue
        .then(() => {
          return fs.readFile(file)
        })
        .then(contents => {
          let matches
          while (
            (matches = codeBlockReferenceRegExp.exec(contents.toString()))
          ) {
            const pathToFile = path.join(
              './',
              matches[1].replace(siteConfig.baseUrl, '')
            )
            missingAssets.push({ imagePath: pathToFile, markdownPath: file })
          }
        })
    })
    return queue
  })
  .then(() => {
    queue = Promise.resolve()
    missingAssets.forEach(missingAsset => {
      const { imagePath, markdownPath } = missingAsset
      queue = queue
        .then(() => {
          return fs.stat('./static/' + imagePath)
        })
        .then(() => {})
        .catch(() => {
          console.error(
            'Could not find ' +
              'static/' +
              imagePath +
              ' which has at least one reference in ' +
              markdownPath +
              ". Did you forget to add the asset to '/static/docs/assets'?"
          )
        })
    })
    return queue
  })
