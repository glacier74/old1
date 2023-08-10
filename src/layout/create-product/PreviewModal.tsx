import { GlobalContext } from '@earlybirdim/components'
import { Button, Modal, Switch } from '@heyforms/ui'
import { ModalProps } from '@heyforms/ui/types/modal/Modal'
import clsx from 'clsx'
import { FC, useMemo, useState } from 'react'
import Frame from 'react-frame-component'
import { useLockBodyScroll } from 'react-use'

import templates from '~/layout/builder3/templates'
import { schemasToDefaultOptions } from '~/layout/builder3/utils'

interface PreviewModalProps extends Omit<ModalProps, 'onSelect'> {
  template?: Template_V3
  onSelect: (id: string) => void
}

interface SidebarProps {
  mode: string
  template: Template_V3
  onSelect: (id: string) => void
  onModeChange: (mode: string) => void
}

const PREVIEW_OPTIONS = [
  {
    value: 'desktop',
    label: 'Desktop'
  },
  {
    value: 'tablet',
    label: 'Tablet'
  },
  {
    value: 'phone',
    label: 'Phone'
  }
]

const Sidebar: FC<SidebarProps> = ({ mode, template, onModeChange, onSelect }) => {
  function handleClick() {
    onSelect(template.id)
  }

  return (
    <div className="template-preview-sidebar w-[300px] min-[1400px]:w-[320px] min-[1600px]:w-[360px] px-8 flex flex-col justify-center border-l border-slate-200 bg-slate-50">
      <div className="text-2xl font-semibold text-center">{template.name}</div>
      <div className="mt-2 text-sm text-slate-500 text-center">Works great on every device.</div>
      <Switch.Group
        className="mt-6 mx-auto !w-auto"
        value={mode}
        options={PREVIEW_OPTIONS}
        onChange={onModeChange}
      />

      <Button type="success" className="mt-8 w-full" onClick={handleClick}>
        Use this template
      </Button>
    </div>
  )
}

export const PreviewModal: FC<PreviewModalProps> = ({ template, onSelect, ...restProps }) => {
  const [mode, setMode] = useState<string>('desktop')

  const children = useMemo(() => {
    if (!template) {
      return null
    }

    const tmpl = templates[template.id]

    if (!tmpl) {
      return null
    }

    const options = schemasToDefaultOptions(tmpl.schemas)

    return (
      <>
        <div className={clsx('template-preview-frame', `template-preview-${mode}`)}>
          <Frame initialContent="<!DOCTYPE html><html class='scroll-smooth'><head><script src='https://cdn.tailwindcss.com'></script></head><body class='iframe-scrollbar'><div></div></body></html>">
            <GlobalContext.Provider
              value={{
                productId: 0,
                isPreview: true
              }}
            >
              {tmpl.render({ options })}
            </GlobalContext.Provider>
          </Frame>
        </div>

        <Sidebar mode={mode} template={template} onModeChange={setMode} onSelect={onSelect} />
      </>
    )
  }, [mode, template])

  useLockBodyScroll(!!template)

  return (
    <Modal
      className="template-preview-modal"
      visible={!!template}
      maskClosable={false}
      showCloseIcon={true}
      {...restProps}
    >
      {children}
    </Modal>
  )
}
