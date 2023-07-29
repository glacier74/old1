import { isValid } from '@nily/utils'

import { HelpFloatButton } from '~/components'
import { Completions } from '~/layout/builder3/completions'
import templates from '~/layout/builder3/templates'
import { schemasToCompletions } from '~/layout/builder3/utils'
import { useStore } from '~/store'

import { BuilderProvider } from './context'
import { Navbar } from './navbar'
import { Preview } from './preview'
import { RightSidebar } from './rightSidebar'

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

  return (
    <BuilderProvider
      initialState={{
        options: siteSettings.draft as any,
        completions: getCompletions(siteSettings.template)
      }}
    >
      <div className="flex flex-col w-full w-screen h-full h-screen overflow-hidden">
        <Navbar />
        <div className="builder-main">
          <Preview />
          <RightSidebar />
          <Completions />
        </div>
      </div>

      <HelpFloatButton />
    </BuilderProvider>
  )
}
