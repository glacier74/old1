import { Button, Switch } from '@heyforms/ui'
import { IconChevronLeft, IconDeviceDesktop, IconDeviceMobile } from '@tabler/icons'
import Link from 'next/link'
import { FC, useMemo } from 'react'

import { useBuilderContext } from '~/layout/builder2/context'

export const Navbar: FC = () => {
  const { state, dispatch } = useBuilderContext()

  const previewModeOptions: any[] = useMemo(
    () => [
      {
        value: 'desktop',
        label: (
          <div className="flex items-center px-1.5 space-x-1.5">
            <IconDeviceDesktop className="w-4 h-4" />
            <span>Desktop</span>
          </div>
        )
      },
      {
        value: 'mobile',
        label: (
          <div className="flex items-center px-1.5 space-x-1.5">
            <IconDeviceMobile className="w-4 h-4" />
            <span>Mobile</span>
          </div>
        )
      }
    ],
    []
  )

  function handleModeChange(previewMode: any) {
    dispatch({
      type: 'updateState',
      payload: {
        updates: {
          previewMode
        }
      }
    })
  }

  return (
    <div className="flex items-center justify-between h-[3.5rem] px-4 border-b border-gray-200">
      <div className="flex-1">
        <Link
          className="inline-flex items-center text-sm -ml-0.5 pl-0.5 pr-3 py-1 rounded hover:bg-gray-100"
          href="/"
        >
          <IconChevronLeft className="w-6 h-6 text-gray-600" />
          <span className="ml-1">EarlyBird</span>
        </Link>
      </div>

      <div className="flex-[2_1_0%] flex items-center justify-center">
        <Switch.Group
          className="builder-mode"
          value={state.previewMode}
          options={previewModeOptions}
          onChange={handleModeChange}
        />
      </div>

      <div className="flex-1 flex items-center justify-end">
        <Button type="success" className="!py-1.5">
          Publish
        </Button>
      </div>
    </div>
  )
}
