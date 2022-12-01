import { Button, notification } from '@heyforms/ui'
import { deepClone } from '@nily/utils'
import { IconChevronLeft } from '@tabler/icons'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

import { useProductId } from '~/layout'
import { useBuilderContext } from '~/layout/builder/context'
import { SiteSettingsService } from '~/service'
import { useRequest } from '~/utils'

export const Navbar: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const productId = useProductId()
  const { state, dispatch } = useBuilderContext()

  const { loading, error, request } = useRequest(async () => {
    await SiteSettingsService.update(productId, {
      blocks: JSON.stringify(state.blocks) as any
    })

    dispatch({
      type: 'update',
      payload: {
        lastSyncedBlocks: deepClone(state.blocks),
        isBlocksChanged: false
      }
    })
  }, [productId, state.blocks])

  // const options: any[] = useMemo(
  //   () => [
  //     {
  //       value: 'desktop',
  //       label: (
  //         <Tooltip ariaLabel="Desktop">
  //           <IconDeviceDesktop className="w-4 h-4" />
  //         </Tooltip>
  //       )
  //     },
  //     {
  //       value: 'mobile',
  //       label: (
  //         <Tooltip ariaLabel="Mobile">
  //           <IconDeviceMobile className="w-4 h-4" />
  //         </Tooltip>
  //       )
  //     }
  //   ],
  //   []
  // )

  // function onModeChange(builderMode: any) {
  //   dispatch({
  //     type: 'update',
  //     payload: {
  //       builderMode
  //     }
  //   })
  // }

  useEffect(() => {
    const handleWindowClose = (e: any) => {
      if (!state.isBlocksChanged) {
        return
      }

      e.preventDefault()
      return (e.returnValue = t('builder.leaveBrowserMessage'))
    }

    const handleBrowseAway = () => {
      if (!state.isBlocksChanged) {
        return
      }

      if (window.confirm(t('builder.leaveBrowserMessage'))) {
        return
      }

      router.events.emit('routeChangeError')
      throw 'route change aborted'
    }

    window.addEventListener('beforeunload', handleWindowClose)
    router.events.on('routeChangeStart', handleBrowseAway)

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose)
      router.events.off('routeChangeStart', handleBrowseAway)
    }
  }, [state.isBlocksChanged])

  useEffect(() => {
    if (error) {
      notification.error({
        title: t(error.message)
      })
    }
  }, [error])

  return (
    <div className="flex items-center px-4 py-2 justify-between border-b border-gray-200">
      <Link
        className="group flex items-center text-sm hover:text-green-500"
        href={`/product/${productId}`}
      >
        <IconChevronLeft className="w-5 h-5 text-slate-500 -ml-1 group-hover:text-green-500" />
        <span className="ml-1">{t('sidebar.dashboard')}</span>
      </Link>

      <div className="flex items-center">
        {/*<Switch.Group*/}
        {/*  className="builder-mode"*/}
        {/*  value={state.builderMode}*/}
        {/*  options={options}*/}
        {/*  onChange={onModeChange}*/}
        {/*/>*/}

        {/*<div className="mx-4 w-px h-5 bg-gray-200" />*/}

        <Button
          type="success"
          className="builder-publish !py-1.5"
          disabled={!state.isBlocksChanged || loading}
          loading={loading}
          onClick={request}
        >
          Publish
        </Button>
      </div>
    </div>
  )
}
