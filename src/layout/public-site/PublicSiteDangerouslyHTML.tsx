import { isEmpty, isValid, isValidArray } from '@nily/utils'
import parse from 'html-react-parser'
import Head from 'next/head'
import { parse as parse2 } from 'node-html-parser'
import { FC } from 'react'

function parseHTML(html: string) {
  const root = parse2(html)
  const linkNodes = root.querySelectorAll('link')

  const links: string[] = []

  if (isValidArray(linkNodes)) {
    linkNodes.forEach(node => {
      links.push(node.toString())
      node.remove()
    })
  }

  return {
    links: links.join('\n'),
    html: root.toString()
  }
}

export const PublicSiteDangerouslyHTML: FC<{ html?: string }> = ({ html }) => {
  if (isEmpty(html)) {
    return null
  }

  const result = parseHTML(html!)

  return (
    <>
      {isValid(result.links) && (<Head>{parse(result.links)}</Head>)}
      {parse(result.html)}
    </>
  )
}
