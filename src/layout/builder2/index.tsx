import { useStore } from '~/store'

import { BuilderProvider } from './context'
import { Editor } from './editor'
import { LeftSidebar } from './leftSidebar'
import { Navbar } from './navbar'
import { RightSidebar } from './rightSidebar'

export const Builder2 = () => {
  const { siteSettings } = useStore()

  return (
    <BuilderProvider
      initialState={{
        blocks: siteSettings.draft as any
      }}
    >
      <div className="flex flex-col w-full w-screen h-full h-screen overflow-hidden">
        <Navbar />
        <div className="builder-main">
          <LeftSidebar />
          <Editor />
          <RightSidebar />
        </div>
      </div>
    </BuilderProvider>
  )
}
