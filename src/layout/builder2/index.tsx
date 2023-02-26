import { BuilderProvider } from './context'
import { Editor } from './editor'
import { LeftSidebar } from './leftSidebar'
import { Navbar } from './navbar'
import { RightSidebar } from './rightSidebar'

export const Builder2 = () => {
  return (
    <BuilderProvider>
      <div className="flex flex-col h-full h-screen overflow-hidden">
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
