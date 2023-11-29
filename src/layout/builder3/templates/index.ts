import { ReactNode } from 'react'

import * as app01 from './app-01'
import * as bioNoir from './bio-noir'
import * as blackCanvas from './black-canvas'
import * as blackMatrix from './black-matrix'
import * as dove from './dove'
import * as ebony from './ebony'
import * as indieFolio from './indie-folio'
import * as jingleBio from './jingle-bio'
import * as landingPage01 from './landing-page-01'
import * as landingPage02 from './landing-page-02'
import * as minimalLanding from './minimal-landing'
import * as obsidian from './obsidian'
import * as pandaZen from './panda-zen'
import * as simpleBio from './simple-bio'
import * as tinyFolio from './tiny-folio'
import * as waitlist01 from './waitlist-01'
import * as waitlist02 from './waitlist-02'

interface Template {
  options: any
  render: (props: { options: any }) => ReactNode
}

const templates: AnyMap<Template> = {
  'landing-page-01': landingPage01,
  'landing-page-02': landingPage02,
  'app-01': app01,
  'waitlist-01': waitlist01,
  'waitlist-02': waitlist02,
  dove: dove,
  'indie-folio': indieFolio,
  obsidian: obsidian,
  'simple-bio': simpleBio,
  'tiny-folio': tinyFolio,
  'bio-noir': bioNoir,
  ebony: ebony,
  'black-matrix': blackMatrix,
  'black-canvas': blackCanvas,
  'minimal-landing-01': minimalLanding,
  'panda-zen': pandaZen,
  'jingle-bio': jingleBio
}

export default templates
