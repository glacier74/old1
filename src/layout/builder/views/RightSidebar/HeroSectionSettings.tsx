import { Input, Select, Spin, Switch, Tooltip } from '@heyforms/ui'
import { isValid, isValidArray } from '@nily/utils'
import { IconQuestionCircle } from '@tabler/icons'
import { FC, startTransition, useCallback, useMemo, useState } from 'react'

import { IconLayoutCenter, IconLayoutRight } from '~/components'
import { useBuilderContext } from '~/layout/builder/context'
import { BlockIconName } from '~/layout/builder/views/LeftSidebar/BlockCard'
import { ProducthuntService } from '~/service'

interface CallToActionProps {
  blocks: any[]
  button: ButtonBlock
  index: number
  onChange: (buttonId: string, action: ButtonBlockAction) => void
}

const CallToAction: FC<CallToActionProps> = ({ blocks, button, onChange }) => {
  const typeOptions: any[] = useMemo(
    () => [
      {
        value: 'block',
        label: 'Scroll to block'
      },
      {
        value: 'link',
        label: 'Navigate to URL'
      }
    ],
    []
  )

  function valueRender(option: any) {
    if (!option) {
      return null
    }

    return <BlockIconName className="flex-1" type={option.type} />
  }

  function optionRender(option: any) {
    return (
      <BlockIconName className="flex-1 p-2 cursor-pointer hover:bg-slate-100" type={option.type} />
    )
  }

  const handleTypeChange = useCallback(
    (type: any) => {
      onChange(button.id, {
        ...(button.action || {}),
        type
      })
    },
    [button.action]
  )

  const handleLinkChange = useCallback(
    (value: any) => {
      onChange(button.id, {
        ...(button.action || {}),
        type: 'link',
        value
      } as ButtonBlockAction)
    },
    [button.action]
  )

  const handleBlockChange = useCallback(
    (blockId: any) => {
      onChange(button.id, {
        ...(button.action || {}),
        type: 'block',
        blockId
      } as ButtonBlockAction)
    },
    [button.action]
  )

  return (
    <div className="mt-2 space-y-2">
      <Switch.Group
        className="builder-cta-switch"
        value={button.action?.type || 'block'}
        options={typeOptions}
        onChange={handleTypeChange}
      />

      <div>
        {button.action?.type === 'link' ? (
          <Input
            type="url"
            placeholder="https://example.com"
            value={button.action?.value}
            onChange={handleLinkChange}
          />
        ) : (
          <Select
            options={blocks as unknown as any[]}
            value={button.action?.blockId}
            valueKey="id"
            valueRender={valueRender as unknown as any}
            optionRender={optionRender}
            placeholder="Select a block"
            onChange={handleBlockChange}
          />
        )}
      </div>
    </div>
  )
}

const producthuntUrlRegex = /^https:\/\/www\.producthunt\.com\/(posts|products)\/([^?&=\/]+)/i

const producthuntTypeOptions: any[] = [
  {
    value: 'featured',
    label: 'Drive support'
  },
  {
    value: 'top-post-badge',
    label: 'Social proof'
  }
]

const producthuntPeriodOptions: any[] = [
  {
    value: 'daily',
    label: 'Daily'
  },
  {
    value: 'weekly',
    label: 'Weekly'
  },
  {
    value: 'monthly',
    label: 'Monthly'
  }
]

const producthuntThemeOptions: any[] = [
  {
    value: 'light',
    label: 'Light'
  },
  {
    value: 'neutral',
    label: 'Neutral'
  },
  {
    value: 'dark',
    label: 'Dark'
  }
]

const ProducthuntBadge: FC<{ block: HeroSectionBlock }> = ({ block }) => {
  const { dispatch } = useBuilderContext()
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)

  const typeOptions = useMemo(() => {
    const types = ['featured']

    if (isValidArray(block.producthuntBadge?.topPostBadges)) {
      types.push('top-post-badge')
    }

    return producthuntTypeOptions.filter(row => types.includes(row.value))
  }, [block.producthuntBadge?.topPostBadges])

  const periodOptions = useMemo(() => {
    if (isValidArray(block.producthuntBadge?.topPostBadges)) {
      const periods = block.producthuntBadge!.topPostBadges.map(b => b.period)

      return producthuntPeriodOptions.filter(row => periods.includes(row.value))
    }
  }, [block.producthuntBadge?.topPostBadges])

  async function handleUrlChange(url: string) {
    let producthuntBadge: AnyMap<string> | undefined = undefined

    if (isValid(url)) {
      const matches = url.match(producthuntUrlRegex)

      if (!matches) {
        return setError('Invalid Product Hunt product link')
      }

      setLoading(true)
      setError(undefined)

      try {
        const result = await ProducthuntService.badge(matches[2])

        producthuntBadge = {
          ...result,
          url,
          type: 'featured',
          theme: 'light',
          period: 'daily'
        }
      } catch (err: any) {
        setError(err.message)
      }

      setLoading(false)
    }

    dispatch({
      type: 'updateBlock',
      payload: {
        blockId: block.id,
        updates: {
          producthuntBadge
        }
      }
    })
  }

  async function handleInputChange(url: any) {
    startTransition(() => {
      handleUrlChange(url)
    })
  }

  const handleTypeChange = useCallback(
    (type: any) => {
      dispatch({
        type: 'updateBlock',
        payload: {
          blockId: block.id,
          updates: {
            producthuntBadge: {
              ...block.producthuntBadge,
              type
            }
          }
        }
      })
    },
    [block.producthuntBadge]
  )

  const handleThemeChange = useCallback(
    (theme: any) => {
      dispatch({
        type: 'updateBlock',
        payload: {
          blockId: block.id,
          updates: {
            producthuntBadge: {
              ...block.producthuntBadge,
              theme
            }
          }
        }
      })
    },
    [block.producthuntBadge]
  )

  const handlePeriodChange = useCallback(
    (period: any) => {
      dispatch({
        type: 'updateBlock',
        payload: {
          blockId: block.id,
          updates: {
            producthuntBadge: {
              ...block.producthuntBadge,
              period
            }
          }
        }
      })
    },
    [block.producthuntBadge]
  )

  return (
    <div className="p-4 border-t border-gray-100">
      <div className="flex items-center">
        <div className="text-sm font-medium">Product Hunt badge</div>
      </div>

      <div className="mt-2">
        <div className="relative">
          <Input
            type="url"
            placeholder="Paste Product Hunt product link here."
            value={block.producthuntBadge?.url}
            disabled={loading}
            onChange={handleInputChange}
          />
          {loading && (
            <div className="w-[2.25rem] h-[2.25rem] absolute top-px right-px flex items-center justify-center rounded-md bg-slate-100">
              <Spin className="w-4 h-4 text-slate-700" />
            </div>
          )}
        </div>
        {error && <div className="form-item-error">{error}</div>}
      </div>

      {block.producthuntBadge?.id && (
        <div className="mt-2 space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Type</div>
            <Switch.Group
              value={block.producthuntBadge?.type}
              options={typeOptions}
              onChange={handleTypeChange}
            />
          </div>

          {block.producthuntBadge?.type === 'top-post-badge' && (
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Period</div>
              <Switch.Group
                value={block.producthuntBadge?.period}
                options={periodOptions}
                onChange={handlePeriodChange}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Theme</div>
            <Switch.Group
              value={block.producthuntBadge?.theme}
              options={producthuntThemeOptions}
              onChange={handleThemeChange}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export const HeroSectionSettings: FC<{ block: HeroSectionBlock }> = ({ block }) => {
  const { state, dispatch } = useBuilderContext()
  const blocks = useMemo(
    () => state.blocks.filter(b => b.id !== block.id),
    [state.blocks, block.id]
  )

  const layoutOptions: any[] = [
    {
      value: 'left',
      label: (
        <div className="flex items-center px-1">
          <IconLayoutRight className="w-4 h-4" />
          <span className="text-sm ml-1">Left</span>
        </div>
      )
    },
    {
      value: 'center',
      label: (
        <div className="flex items-center px-1">
          <IconLayoutCenter className="w-4 h-4" />
          <span className="text-sm ml-1">Center</span>
        </div>
      )
    }
  ]

  const handleLayoutChange = useCallback(
    (layout: any) => {
      dispatch({
        type: 'updateBlock',
        payload: {
          blockId: block.id,
          updates: {
            layout
          }
        }
      })
    },
    [block.id]
  )

  const handleActionChange = useCallback(
    (buttonId: string, action: any) => {
      dispatch({
        type: 'updateBlock',
        payload: {
          blockId: block.id,
          updates: {
            buttons: block.buttons.map(b => {
              return b.id === buttonId ? { ...b, action } : b
            })
          }
        }
      })
    },
    [block]
  )

  return (
    <>
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Layout align</div>
          <Switch.Group
            className="builder-mode"
            value={block.layout || 'left'}
            options={layoutOptions}
            onChange={handleLayoutChange}
          />
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm font-medium">Call-to-Action</span>

              <Tooltip
                ariaLabel={
                  <div className="w-64 p-1 text-left whitespace-pre-line">
                    Set the behavior after clicking the Call to Action button here, which can be to
                    scroll to a block or navigate to a customized URL.
                  </div>
                }
              >
                <IconQuestionCircle className="w-5 h-5 ml-2 text-slate-500 cursor-pointer hover:text-slate-700" />
              </Tooltip>
            </div>
          </div>

          <div className="space-y-2 divide divide-slate-100">
            {block.buttons.map((button, index) => (
              <CallToAction
                key={button.id}
                blocks={blocks}
                button={button}
                index={index}
                onChange={handleActionChange}
              />
            ))}
          </div>
        </div>
      </div>

      <ProducthuntBadge block={block} />
    </>
  )
}
