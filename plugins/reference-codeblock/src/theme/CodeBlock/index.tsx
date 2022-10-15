import CodeBlock from '@theme-init/CodeBlock'
import ReferenceCodeBlock from '../ReferenceCodeBlock'

import type { ReferenceCodeBlockProps } from '../types'

const componentWrapper = (Component: typeof CodeBlock) => {
  function WrappedComponent(props: ReferenceCodeBlockProps) {
    if (props.reference) {
      return <ReferenceCodeBlock {...props} />
    }

    return <CodeBlock {...props} />
  }

  return WrappedComponent
}

module.exports = componentWrapper(CodeBlock)
