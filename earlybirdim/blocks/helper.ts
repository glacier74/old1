import { CSSProperties } from 'react'

export function linkStyle(appearance = 'plain', style: Partial<CSSProperties> = {}) {
  const $style: Partial<CSSProperties> = {
    color: style.color
  }

  $style.background = appearance === 'filled' ? style.background : 'transparent'
  $style.borderColor = appearance === 'outline' ? style.color : 'transparent'
  $style.borderWidth = appearance === 'outline' ? style.borderWidth || '1px' : '0px'

  return $style
}

export function inputStyle(style: Partial<CSSProperties> = {}) {
  return {
    color: style.color,
    background: style.background,
    borderColor: style.borderColor
  }
}
