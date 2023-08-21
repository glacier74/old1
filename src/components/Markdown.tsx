import { FC } from 'react'
import MarkdownView from 'react-showdown'

interface MarkdownProps extends ComponentProps {
  markdown: string
}

export const Markdown: FC<MarkdownProps> = ({ markdown, ...restProps }) => {
  return (
    <MarkdownView
      options={{
        simpleLineBreaks: true
      }}
      markdown={markdown.replace(/\n/g, '<br />')}
      {...restProps}
    />
  )
}
