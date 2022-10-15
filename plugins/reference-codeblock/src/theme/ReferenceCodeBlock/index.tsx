import type { Dispatch } from 'react'
import { useReducer } from 'react'
import { URL } from 'url'
import BrowserOnly from '@docusaurus/core/lib/client/exports/BrowserOnly'
import CodeBlock from '@theme-init/CodeBlock'

import type {
  ReferenceCodeBlockProps,
  Reference,
  DispatchMessage
} from '../types'

const initialFetchResultState = {
  code: 'loading...',
  error: null,
  loading: null
}

// const noteStyle: CSSProperties = {
//   fontSize: '.9em',
//   fontWeight: 600,
//   color: '#0E75DD',
//   textAlign: 'center',
//   paddingBottom: '13px',
//   textDecoration: 'underline'
// }

/**
 * parses reference
 * @param {string} ref url to remote file
 */
export function parseReference(ref: string): Reference {
  /**
   * webpack causes failures when it tries to render this page
   */
  const global = globalThis || {}
  // @ts-ignore
  if (!global.URL) {
    // @ts-ignore
    global.URL = URL
  }
  const host = `${location.protocol}//${location.host}` // location.origin
  const httpsIndex = ref.indexOf('https')
  const startWithHttps = httpsIndex > -1
  const fullUrl = startWithHttps ? ref.slice(httpsIndex, -1) : `${host}${ref}`
  const [url, loc] = fullUrl.split('#')

  const [fromLine, toLine] = loc
    ? loc.split('-').map(lineNr => parseInt(lineNr.slice(1), 10) - 1)
    : [0, Infinity]
  if (startWithHttps) {
    const [org, repo, blob, branch, ...pathSeg] = new global.URL(url).pathname
      .split('/')
      .slice(1)

    return {
      url: `https://raw.githubusercontent.com/${org}/${repo}/${branch}/${pathSeg.join(
        '/'
      )}`,
      fromLine,
      toLine,
      title: pathSeg.join('/')
    }
  }
  return {
    url,
    fromLine,
    toLine,
    // http://host/json/curate.json -> /json/opensource.json
    title: url.slice(url.match(/^(https?:\/\/[\w\-.:]*)\//)![1].length)
    // http://host/json/opensource.json -> opensource.json
    // title: url.match(/\/([\w-]+\.[a-z]+)(\n)*$/)?.[1] || url
  }

  // @ts-ignore
}

async function fetchCode(
  { url, fromLine, toLine }: Reference,
  fetchResultStateDispatcher: Dispatch<DispatchMessage>
) {
  let res: Response

  try {
    res = await fetch(url)
  } catch (err: any) {
    return fetchResultStateDispatcher({ type: 'error', value: err })
  }

  if (res.status !== 200) {
    const error = await res.text()
    return fetchResultStateDispatcher({ type: 'error', value: error })
  }

  const body = (await res.text())
    .split('\n')
    .slice(fromLine, (toLine || fromLine) + 1)
  const preceedingSpace = body.reduce((prev: number, line: string) => {
    if (line.length === 0) {
      return prev
    }

    const spaces = line.match(/^\s+/)
    if (spaces) {
      return Math.min(prev, spaces[0].length)
    }

    return 0
  }, Infinity)

  return fetchResultStateDispatcher({
    type: 'loaded',
    value: body.map(line => line.slice(preceedingSpace)).join('\n')
  })
}

export function codeReducer(prevState: any, { type, value }: DispatchMessage) {
  switch (type) {
    case 'reset': {
      return initialFetchResultState
    }
    case 'loading': {
      return { ...prevState, loading: true }
    }
    case 'loaded': {
      return { ...prevState, code: value, loading: false }
    }
    case 'error': {
      return { ...prevState, error: value, loading: false }
    }
    default:
      return prevState
  }
}

function ReferenceCode(props: ReferenceCodeBlockProps) {
  const [fetchResultState, fetchResultStateDispatcher] = useReducer(
    codeReducer,
    initialFetchResultState
  )

  const codeSnippetDetails = parseReference(props.children)
  if (fetchResultState.loading !== false) {
    fetchCode(codeSnippetDetails, fetchResultStateDispatcher)
  }

  const titleMatch = props.metastring?.match(/title="(?<title>.*)"/)

  const customProps = {
    ...props,
    metastring: titleMatch?.groups?.title
      ? ` title="${titleMatch?.groups?.title}"`
      : !props.metastring?.match(/notitle/)
      ? ` title="${codeSnippetDetails.title.replace(/\n/g, '')}"`
      : '',
    children: initialFetchResultState.code
  }

  console.log('fetchResultState.code: ', fetchResultState.code)
  return (
    <div>
      <BrowserOnly>
        {() => <CodeBlock {...customProps}>{fetchResultState.code}</CodeBlock>}
      </BrowserOnly>
      {/* <CodeBlock {...customProps}>{fetchResultState.code}</CodeBlock> */}
      {/* <div style={noteStyle}>
        <a href={props.children} target="_blank" rel="noreferrer">
          See full example on Remote
        </a>
      </div> */}
    </div>
  )
}

export default ReferenceCode
