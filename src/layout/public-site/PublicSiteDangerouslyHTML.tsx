import { isEmpty, isValid, isValidArray } from '@nily/utils'
import HTMLReactParser from 'html-react-parser'
import Head from 'next/head'
import { parse } from 'node-html-parser'
import { FC, useEffect } from 'react'
import { useFrame } from 'react-frame-component'

import { loadScriptsAsync } from '~/utils'

function parseHTML(html: string) {
  const root = parse(html)

  const headNodes = root.querySelectorAll('link,meta,style')
  const scriptNodes = root.querySelectorAll('script')

  const heads: string[] = []
  const scripts: any[] = []

  if (isValidArray(headNodes)) {
    headNodes.forEach(node => {
      heads.push(node.toString())
      node.remove()
    })
  }

  if (isValidArray(scriptNodes)) {
    scriptNodes.forEach(node => {
      scripts.push({
        ...node.attrs,
        content: node.textContent
      })
      node.remove()
    })
  }

  return {
    heads: heads.join('\n'),
    scripts,
    html: root.toString()
  }
}

export const InjectHeadCode: FC<{ code?: string }> = ({ code }) => {
  const { document: frameDocument } = useFrame()

  useEffect(() => {
    if (isValid(code)) {
      loadScriptsAsync((frameDocument || document).body, result.scripts)
    }
  }, [])

  if (isEmpty(code)) {
    return null
  }

  const result = parseHTML(code!)

  if (result.heads) {
    return <>{HTMLReactParser(result.heads)}</>
  }

  return null
}

export const InjectBodyCode: FC<{ code?: string }> = ({ code }) => {
  if (isEmpty(code)) {
    return null
  }

  const result = parseHTML(code!)

  return <>{HTMLReactParser(result.html)}</>
}

export const PublicSiteDangerouslyHTML: FC<{ html?: string }> = ({ html }) => {
  const { document: frameDocument } = useFrame()

  useEffect(() => {
    if (isValid(html)) {
      loadScriptsAsync((frameDocument || document).body, result.scripts)
    }
  }, [])

  if (isEmpty(html)) {
    return null
  }

  const result = parseHTML(html!)

  return (
    <>
      {isValid(result.heads) && <Head>{HTMLReactParser(result.heads)}</Head>}
      {HTMLReactParser(result.html)}
    </>
  )
}
