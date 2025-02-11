import { IconX } from '@tabler/icons'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'

import { useStore } from '~/store'

import { SidebarAccount } from './SidebarAccount'
import { SidebarNavbar } from './SidebarNavbar'
import { SidebarProducts } from './SidebarProducts'

export const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useStore()
  const router = useRouter()

  useEffect(() => {
    const handleBrowseAway = () => {
      if (isSidebarOpen) {
        closeSidebar()
      }
    }

    router.events.on('routeChangeStart', handleBrowseAway)

    return () => {
      router.events.off('routeChangeStart', handleBrowseAway)
    }
  }, [isSidebarOpen])

  return (
    <>
      <CSSTransition
        in={isSidebarOpen}
        timeout={0}
        mountOnEnter={true}
        classNames="slide-in-left"
        unmountOnExit={false}
        onExited={closeSidebar}
      >
        <div className="sidebar fixed inset-0 flex z-10 md:hidden">
          <div
            className="sidebar-overlay fixed inset-0 bg-slate-600 bg-opacity-75 transition-opacity duration-100 ease-in-out"
            aria-hidden="true"
          />
          <div className="sidebar-wrapper relative flex flex-col flex-1 max-w-xs bg-slate-50 w-full h-full duration-150 ease-in-out">
            <div className="flex flex-1 flex-col h-0 pt-5">
              <SidebarProducts />
              <SidebarNavbar />
            </div>
            <SidebarAccount />

            <div className="absolute top-0 right-0 -mr-10 pt-2 md:hidden">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={closeSidebar}
              >
                <span className="sr-only">Close sidebar</span>
                <IconX className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>

      {/* AccountSidebar for desktop */}
      <div className="sidebar fixed inset-0 hidden md:flex md:flex-shrink-0">
        <div className="relative flex flex-col flex-1 h-full bg-slate-50">
          <div className="flex flex-1 flex-col h-0 pt-5">
            <SidebarProducts />
            <SidebarNavbar />
          </div>
          <SidebarAccount />
        </div>
      </div>
    </>
  )
}
