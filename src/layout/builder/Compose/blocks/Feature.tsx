import { Menus, Switch, Tooltip } from '@heyforms/ui'
import { IconLayoutAlignLeft, IconLayoutAlignRight } from '@tabler/icons'
import { FC, useMemo } from 'react'

import { useComposeStore } from '../store'
import { BlockComponent, BlockPreview, BlockProps } from './Block'
import { Heading } from './Heading'
import { Image, ImagePreview } from './Image'
import { Text } from './Text'

export interface FeatureProps extends BlockProps {
  block: FeatureBlock
}

export const FeaturePreview: FC<FeatureProps> = ({ block, ...restProps }) => {
  const CustomTag = `h${block.heading.level}` as any

  return (
    <BlockPreview block={block} {...restProps}>
      <div className={`block-feature-container block-feature-align-${block.align}`}>
        {/* Left column */}
        <div className="block-feature-col">
          <ImagePreview block={block.image} />
        </div>

        {/* Right column */}
        <div className="block-feature-col">
          {/* Heading */}
          <CustomTag className="block-feature-heading rich-text" placeholder=" ">
            {block.heading.html}
          </CustomTag>

          {/* Description */}
          <div className="block-context-container">
            <div className="rich-text" placeholder=" ">
              {block.content.html}
            </div>
          </div>
        </div>
      </div>
    </BlockPreview>
  )
}

export const FeatureSettings: FC<Pick<FeatureProps, 'block'>> = ({ block }) => {
  const { dispatch } = useComposeStore()

  const options: any[] = useMemo(
    () => [
      {
        value: 'left',
        label: (
          <Tooltip ariaLabel="Left to right">
            <IconLayoutAlignLeft />
          </Tooltip>
        )
      },
      {
        value: 'right',
        label: (
          <Tooltip ariaLabel="Right to left">
            <IconLayoutAlignRight />
          </Tooltip>
        )
      }
    ],
    []
  )

  function handleChange(align: any) {
    dispatch({
      type: 'updateBlock',
      payload: {
        blockId: block.id,
        updates: {
          align
        }
      }
    })
  }

  return (
    <>
      <Menus.Label className="uppercase" label="Options" />

      <div className="flex items-center justify-between px-4 py-2 text-slate-700">
        <span>Layout</span>
        <Switch.Group value={block.align} options={options} onChange={handleChange} />
      </div>

      <Menus.Divider />
    </>
  )
}

export const Feature: FC<FeatureProps> = ({ block, placeholder, ...restProps }) => {
  return (
    <BlockComponent block={block} enableAction={true} {...restProps}>
      <div className={`block-feature-container block-feature-align-${block.align}`}>
        {/* Left column */}
        <div className="block-feature-col">
          <Image
            block={block.image}
            enableAction={false}
            uploadDesc1="builder.feature.uploadTip1"
            uploadDesc2="builder.feature.uploadTip2"
          />
        </div>

        {/* Right column */}
        <div className="block-feature-col">
          {/* Heading */}
          <Heading
            className="block-feature-heading"
            block={block.heading}
            placeholder="builder.feature.heading"
            enableAction={false}
          />

          {/* Description */}
          <div className="block-context-container">
            <Text
              block={block.content}
              placeholder="builder.feature.description"
              enableAction={false}
            />
          </div>
        </div>
      </div>
    </BlockComponent>
  )
}
