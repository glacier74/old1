import { ReactNode } from 'react'

import * as LandingPage01 from './landing-page-01'
import * as LandingPage02 from './landing-page-02'

interface Template {
  options: any
  render: (props: { options: any }) => ReactNode
}

const templates: AnyMap<Template> = {
  landing_page_01: {
    schemas: LandingPage01.schemas,
    render: LandingPage01.render
  },
  landing_page_02: {
    schemas: LandingPage02.schemas,
    render: LandingPage02.render
  }
}

export default templates
