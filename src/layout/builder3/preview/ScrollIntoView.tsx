import { FC, useEffect } from 'react'
import { useFrame } from 'react-frame-component'

interface ScrollIntoViewProps {
  selectedOptionName?: string
  selectedCompletionName?: string
}

export const ScrollIntoView: FC<ScrollIntoViewProps> = ({
  selectedOptionName,
  selectedCompletionName
}) => {
  const { document: doc } = useFrame()

  useEffect(() => {
    const optionName = selectedOptionName || selectedCompletionName

    if (!optionName || !doc) {
      return
    }

    const el = doc.getElementById(optionName)

    if (el) {
      el.scrollIntoView({
        block: 'start'
      })
    }
  }, [doc, selectedCompletionName, selectedOptionName])

  return null
}
