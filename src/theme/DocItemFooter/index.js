/* eslint-disable no-unused-vars */
import React from 'react'
import DocItemFooterOriginal from '@theme-original/DocItemFooter'
import DocsRating from '../../../core/DocsRating'

export default function DocItemFooter(props) {
  return (
    <>
      <DocsRating label={props.content.metadata.unversionedId} />
      <DocItemFooterOriginal {...props} />
    </>
  )
}
