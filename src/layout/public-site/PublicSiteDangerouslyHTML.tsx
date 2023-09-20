import { isEmpty } from '@nily/utils'
import parse from 'html-react-parser'
import Head from 'next/head'
import Script from 'next/script'
import { FC } from 'react'
import sanitizeHtml from 'sanitize-html'

const SCRIPT_REGEX = /<script[\s\S]*?>[\s\S]*?<\/script>/gi
const REMOTE_SCRIPT_REGEX = /<script.*?src="([^"]+)".*?><\/script>/i
const REMOTE_SCRIPT_ATTRIBUTE_REGEX =
  /(?<name>\w+)=["']?(?<value>(?:.(?!["']?\s+(?:\S+)=|\s*\/?[>"']))+.)["']?/gi
const INLINE_SCRIPT_REGEX = /<script[\s\S]*?>([\s\S]*?)<\/script>/i

function parseScripts(html: string) {
  const remoteScripts: AnyMap<string>[] = []
  const inlineScripts: string[] = []

  const matches = html.match(SCRIPT_REGEX)

  if (matches) {
    for (const script of matches) {
      let match = script.match(REMOTE_SCRIPT_REGEX)

      if (match) {
        const attributes: AnyMap<string> = {}

        for (const { groups } of script.matchAll(REMOTE_SCRIPT_ATTRIBUTE_REGEX)) {
          attributes[groups!.name] = groups!.value
        }

        remoteScripts.push(attributes)
        continue
      }

      match = script.match(INLINE_SCRIPT_REGEX)

      if (match) {
        inlineScripts.push(match[1])
      }
    }
  }

  return {
    remoteScripts,
    inlineScripts
  }
}

const HEAD_TAGS = ['meta', 'link', 'title', 'base']
const OTHER_TAGS = sanitizeHtml.defaults.allowedTags.concat(['style', 'iframe'])
const OTHER_ATTRIBUTES = {
  ...sanitizeHtml.defaults.allowedAttributes,
  iframe: [
    'src',
    'id',
    'class',
    'data-*',
    'width',
    'height',
    'style',
    'allowfullscreen',
    'allow',
    'title',
    'scrolling'
  ],
  '*': ['id', 'class', 'data-*', 'href', 'align', 'alt', 'center', 'style']
}

export const PublicSiteDangerouslyHTML: FC<{ html?: string }> = ({ html }) => {
  if (isEmpty(html)) {
    return null
  }

  const { remoteScripts, inlineScripts } = parseScripts(html!)

  return (
    <>
      <Head>
        {parse(
          sanitizeHtml(html!, {
            allowedTags: HEAD_TAGS,
            allowedAttributes: false
          })
        )}
      </Head>

      {parse(
        sanitizeHtml(html!, {
          allowedTags: OTHER_TAGS,
          allowedAttributes: OTHER_ATTRIBUTES,
          allowVulnerableTags: true,
          nonTextTags: [...HEAD_TAGS, 'script']
        })
      )}

      {remoteScripts.map((row, index) => (
        <Script key={index} {...row} strategy="beforeInteractive" />
      ))}

      {inlineScripts.map((html, index) => (
        <Script key={index} dangerouslySetInnerHTML={{ __html: html }} />
      ))}
    </>
  )
}
