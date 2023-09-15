import { isValid } from '@nily/utils'

import { HelpFloatButton } from '~/components'
import { useStore } from '~/store'

import { AIModal } from './ai'
import { BuilderProvider } from './context'
import { Navbar } from './navbar'
import { Preview } from './preview'
import { RightSidebar } from './rightSidebar'
import templates from './templates'
import { schemasToCompletions } from './utils'

function getCompletions(id: string) {
  const template = templates[id]

  if (template) {
    const schemas = template.schemas

    if (isValid(schemas)) {
      return schemasToCompletions(schemas)
    }
  }

  return []
}

export const Builder3 = () => {
  const { siteSettings } = useStore()
  const completions = getCompletions(siteSettings.template)

  return (
    <BuilderProvider
      initialState={{
        options: siteSettings.draft as any,
        completions
      }}
    >
      <div className="flex flex-col w-full w-screen h-full h-screen overflow-hidden">
        <Navbar />
        <div className="builder-main">
          <Preview />
          <RightSidebar />
        </div>
      </div>

      {isValid(completions) && <AIModal />}

      <HelpFloatButton />
    </BuilderProvider>
  )
}
