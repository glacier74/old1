import { Icon } from '@earlybirdim/icons'
import { Button, Dropdown, Menus, Tabs } from '@heyforms/ui'
import { FC, useState } from 'react'

import { IconPicker } from '../components'
import { useOptions } from '../context'
import { OptionProps } from './OptionGroup'

export const IconOption: FC<OptionProps> = ({ parentName, schema }) => {
  const { value, update } = useOptions<string>([parentName, schema.name].filter(Boolean).join('.'))
  const [visible, setVisible] = useState(false)

  const Overlay = (
    <Menus className="icon-picker">
      <Tabs defaultActiveName="icon">
        <Tabs.Pane name="icon" title="Icon">
          <IconPicker onChange={handleChange} />
        </Tabs.Pane>
      </Tabs>
    </Menus>
  )

  function handleChange(name: string) {
    update(name)
  }

  function handleClear() {
    update(undefined)
  }

  return (
    <div className="builder-option">
      <div className="builder-option__title">{schema.title}</div>
      <div className="builder-option__content">
        <div className="flex items-center gap-4">
          {value && <Icon name={value} className="w-5 h-5 text-slate-600" />}

          <div className="flex items-center gap-2">
            <Dropdown
              visible={visible}
              placement="auto"
              overlay={Overlay}
              dismissOnClickInside={false}
              offset={[0, 30]}
              onDropdownVisibleChange={setVisible}
            >
              <Button className="!py-1 !px-1.5">Change</Button>
            </Dropdown>

            {value && (
              <Button.Link className="!py-1 !px-2" onClick={handleClear}>
                Clear
              </Button.Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
