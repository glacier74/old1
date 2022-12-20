import { Input, Select, Switch, Tooltip } from '@heyforms/ui'
import { IconQuestionCircle } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import { FC, useCallback, useMemo } from 'react'

import { IconLayoutCenter, IconLayoutRight } from '~/components'
import { useBuilderContext } from '~/layout/builder/context'
import { BlockIconName } from '~/layout/builder/views/LeftSidebar/BlockCard'

interface CallToActionProps {
  blocks: any[]
  button: ButtonBlock
  index: number
  onChange: (buttonId: string, action: ButtonBlockAction) => void
}

const CallToAction: FC<CallToActionProps> = ({ blocks, button, index, onChange }) => {
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

  const handleValueChange = useCallback(
    (value: any) => {
      onChange(button.id, {
        ...(button.action || {}),
        value
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
            onChange={handleValueChange}
          />
        ) : (
          <Select
            options={blocks as unknown as any[]}
            value={button.action?.value}
            valueKey="id"
            valueRender={valueRender as unknown as any}
            optionRender={optionRender}
            placeholder="Select a block"
            onChange={handleValueChange}
          />
        )}
      </div>
    </div>
  )
}

export const HeroSectionSettings: FC<{ block: HeroSectionBlock }> = ({ block }) => {
  const { state, dispatch } = useBuilderContext()
  const blocks = useMemo(
    () => state.blocks.filter(b => b.id !== block.id),
    [state.blocks, block.id]
  )

  const options: any[] = useMemo(
    () => [
      {
        value: 'left',
        label: (
          <Tooltip ariaLabel="Align left">
            <IconLayoutRight className="w-4 h-4" />
          </Tooltip>
        )
      },
      {
        value: 'center',
        label: (
          <Tooltip ariaLabel="Align center">
            <IconLayoutCenter className="w-4 h-4" />
          </Tooltip>
        )
      }
    ],
    []
  )

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
    <div className="px-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Layout</div>
        <Switch.Group
          className="builder-mode"
          value={block.layout || 'left'}
          options={options}
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
              blocks={blocks}
              button={button}
              index={index}
              onChange={handleActionChange}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
