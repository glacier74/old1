import clsx from 'clsx'
import { Children, FC, cloneElement, useState } from 'react'

interface $SwitchGroupProps extends Omit<ComponentProps, 'style'> {
  defaultValue?: string
  onChange?: (value: string) => void
  style?: {
    color?: string
    background?: string
    tintColor?: string
    tintBackground?: string
  }
}

interface SwitchItemProps extends ComponentProps {
  isActive?: boolean
  value: string
  onClick?: (value: string) => void
}

export const $SwitchGroup: FC<$SwitchGroupProps> = ({
  className,
  defaultValue,
  children: rawChildren,
  onChange,
  ...restProps
}) => {
  const [active, setActive] = useState(defaultValue)

  function handleClick(value: string) {
    setActive(value)
    onChange?.(value)
  }

  const children = Children.map(rawChildren, (child: any) => {
    return cloneElement(child, {
      ...child.props,
      isActive: child.props.value === active,
      style: {
        color: restProps.style?.tintColor,
        background: restProps.style?.tintBackground
      },
      onClick: handleClick
    })
  })

  return (
    <div className={clsx('earlybird-switch-group', className)} {...restProps}>
      {children}
    </div>
  )
}

export const SwitchItem: FC<SwitchItemProps> = ({
  className,
  isActive,
  value,
  style,
  children,
  onClick,
  ...restProps
}) => {
  function handleClick() {
    onClick?.(value)
  }

  return (
    <button
      type="button"
      className={clsx('earlybird-switch-item', className)}
      style={isActive ? style : undefined}
      onClick={handleClick}
      {...restProps}
    >
      {children}
    </button>
  )
}
