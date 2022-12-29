import { FC } from 'react'

import { THEMES } from '~/constants'
import { useBuilderContext } from '~/layout/builder/context'

interface ThemeItemProps {
  theme: Theme
  onClick: (theme: Theme) => void
}

const ThemeItem: FC<ThemeItemProps> = ({ theme, onClick }) => {
  function handleClick() {
    onClick(theme)
  }

  return (
    <div
      className="flex items-center px-5 py-4 border border-slate-100 shadow-sm rounded-lg text-slate-700 bg-white cursor-pointer"
      style={{
        background: theme.background
      }}
      onClick={handleClick}
    >
      <div className="flex-1">
        <div
          className="text-sm font-medium"
          style={{
            color: theme.text
          }}
        >
          Headline
        </div>
        <div
          className="text-sm"
          style={{
            color: theme.textLight
          }}
        >
          Content
        </div>
      </div>
      <div
        className="w-12 h-4 rounded-md"
        style={{
          background: theme.buttonBackground
        }}
      ></div>
    </div>
  )
}

export const ThemePane: FC = () => {
  const { dispatch } = useBuilderContext()

  function handleClick(theme: Theme) {
    dispatch({
      type: 'setTheme',
      payload: theme
    })
  }

  return (
    <div className="p-5 space-y-3">
      {THEMES.map((theme, index) => (
        <ThemeItem key={index} theme={theme} onClick={handleClick} />
      ))}
    </div>
  )
}
