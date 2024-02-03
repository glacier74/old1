import { Button, Form, Slider, notification, useForm } from '@heyforms/ui'
import { deepClone, isValid } from '@nily/utils'
import { useCallback, useEffect, useState } from 'react'

import { ColorPicker } from '~/components/ColorPicker'
import { JINGLEBIO_THEMES } from '~/constants'
import { SiteSettingsService } from '~/service'
import { useStore } from '~/store'
import { useRequest } from '~/utils'

import { ImagePickField } from './ImagePickerField'

export function adaptTheme(theme: AnyMap) {
  const _theme = deepClone(theme)

  _theme.widgetBgHover = _theme.widgetBg
  _theme.widgetBgActive = _theme.widgetBg
  _theme.widgetFollowBgHover = _theme.widgetFollowBg
  _theme.widgetFollowBgActive = _theme.widgetFollowBg

  return _theme
}

export const Customize = () => {
  const { siteSettings, updateSiteSettings } = useStore()
  const [form] = useForm()

  const [values, setValues] = useState<AnyMap>(siteSettings.theme || JINGLEBIO_THEMES[0])

  async function updateTheme(theme: AnyMap) {
    const _theme = adaptTheme(theme)

    updateSiteSettings({
      tempTheme: undefined,
      theme: _theme
    })
    await SiteSettingsService.updateSettings(siteSettings.productId, {
      theme: _theme
    })

    notification.success({
      title: 'Page style have been updated successfully'
    })
  }

  const { loading, request } = useRequest(updateTheme, [], {
    errorNotify: true
  })

  const { loading: loading2, request: request2 } = useRequest(updateTheme, [], {
    errorNotify: true
  })

  function handleColorChange(color: string) {
    form.setFieldValue('bgColor', color)
  }

  const handleImageClear = useCallback(() => {
    form.setFieldValue('bgOpacity', 0)
    form.setFieldValue('bgImage', undefined)

    const newValues = {
      ...values,
      bgOpacity: 0,
      bgImage: undefined
    }

    setValues(newValues)
    updateSiteSettings({
      tempTheme: adaptTheme(newValues)
    })
  }, [form, updateSiteSettings, values])

  function handleValuesChange(_: AnyMap, allValues: AnyMap) {
    console.log('handleValuesChange', adaptTheme(allValues))

    setValues(allValues)
    updateSiteSettings({
      tempTheme: adaptTheme(allValues)
    })
  }

  function handleRevert() {
    request2(JINGLEBIO_THEMES[0])
  }

  useEffect(() => {
    return () => {
      updateSiteSettings({
        tempTheme: undefined
      })
    }
  }, [])

  return (
    <div className="p-5">
      <Form
        className="design-customize-form"
        initialValues={values}
        form={form}
        onValuesChange={handleValuesChange}
        onFinish={request}
      >
        <div className="text-sm mb-2 font-semibold text-slate-900">Background</div>
        <Form.Item name="bgColor" label="Color" rules={[{ required: true }]}>
          <ColorPicker placement="bottom-start" />
        </Form.Item>
        <Form.Item name="bgImage" label="Image">
          <ImagePickField onColorChange={handleColorChange} onClear={handleImageClear} />
        </Form.Item>
        {isValid(values?.bgImage) && (
          <Form.Item name="bgOpacity" label="Brightness" rules={[{ required: true }]}>
            <Slider className="w-[110px]" min={-1} max={1} step={0.1} defaultValue={0} />
          </Form.Item>
        )}

        <div className="text-sm mt-8 mb-2 font-semibold text-slate-900">Information</div>
        <Form.Item name="headline" label="Headline" rules={[{ required: true }]}>
          <ColorPicker placement="bottom-start" />
        </Form.Item>
        <Form.Item name="subheadline" label="Subheadline" rules={[{ required: true }]}>
          <ColorPicker placement="bottom-start" />
        </Form.Item>

        <div className="text-sm mt-8 mb-2 font-semibold text-slate-900">Widget</div>
        <Form.Item name="widgetBg" label="Background" rules={[{ required: true }]}>
          <ColorPicker placement="bottom-start" />
        </Form.Item>
        <Form.Item name="widgetBorder" label="Border">
          <ColorPicker placement="bottom-start" />
        </Form.Item>
        <Form.Item name="widgetTitle" label="Title" rules={[{ required: true }]}>
          <ColorPicker placement="bottom-start" />
        </Form.Item>
        <Form.Item name="widgetMeta" label="Meta" rules={[{ required: true }]}>
          <ColorPicker placement="bottom-start" />
        </Form.Item>
        <Form.Item name="widgetFollowBg" label="Button Background" rules={[{ required: true }]}>
          <ColorPicker placement="bottom-start" />
        </Form.Item>
        <Form.Item name="widgetFollowText" label="Button Text" rules={[{ required: true }]}>
          <ColorPicker placement="bottom-start" />
        </Form.Item>

        <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-100">
          <Button htmlType="button" loading={loading2} onClick={handleRevert}>
            Revert
          </Button>
          <Button type="success" htmlType="submit" loading={loading}>
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  )
}
