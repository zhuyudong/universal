import fs from 'fs-extra'
import path from 'path'
import axios from 'axios'
// https://www.cnblogs.com/lihan829/p/15018883.html?share_token=A6523AEE-EA26-4A5A-9FE6-095D0391F7FC&tt_from=weixin&utm_source=weixin&utm_medium=toutiao_ios&utm_campaign=client_share&wxshare_count=1
// [...document.querySelectorAll('.wrap.external')].map(i => i.href.match(/(https%3A\/\/github\.com\/[\w-.]+\/[\w-.]+)/)?.[1].replace('%3A', ':')).filter(Boolean)
import opensourceUrls from '../static/json/repo-github.json'

const root = process.cwd()
const urls = [
  ...new Set(
    opensourceUrls.filter(i => i.startsWith('https://github.com/')).sort()
  )
]
fs.writeFileSync(
  path.resolve(root, 'static/opensource/repo-github.json'),
  JSON.stringify(urls, null, 2)
)
;(async () => {
  // batch request
  // const proes = urls.map(async url => {
  //   // 'https://github.com/facebook/react' -> 'facebook/react'
  //   const repo = url.match(/\/([\w-.]+\/[\w-.]+)\/?$/)[1]
  //   // TODO: GitHub API 接口访问频率限制
  //   return axios('https://api.github.com/repos/' + repo)
  // })
  // const res = await Promise.all(proes)
  // const json = res.reduce((acc, { data }) => {
  //   acc[data['html_url']] = data
  //   return acc
  // }, {} as Record<string, any>)

  // fs.writeFileSync(
  //   path.resolve(__dirname, 'opensource.json'),
  //   JSON.stringify(json, null, 2)
  // )

  const opensources = {}
  for (const url of urls) {
    const repo = url.match(/\/([\w\-.]+\/[\w\-.]+)\/?$/)[1]
    await new Promise(resolve => setTimeout(resolve, 1500)).catch(console.error)
    console.log('fetching: ', repo)
    const res = await axios('https://api.github.com/repos/' + repo)
    console.log(res.data)
    opensources[res.data['html_url']] = res.data
  }
  fs.writeFileSync(
    path.resolve(root, 'static/json/opensource.json'),
    JSON.stringify(opensources, null, 2)
  )
})()
