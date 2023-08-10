import { ReactNode } from 'react'

import * as app_01 from './app-01'
import * as bio_noir from './bio-noir'
import * as black_matrix from './black-matrix'
import * as dove from './dove'
import * as ebony from './ebony'
import * as indie_folio from './indie-folio'
import * as landing_page_01 from './landing-page-01'
import * as landing_page_02 from './landing-page-02'
import * as obsidian from './obsidian'
import * as simple_bio from './simple-bio'
import * as tiny_folio from './tiny-folio'
import * as waitlist_01 from './waitlist-01'

interface Template {
  options: any
  render: (props: { options: any }) => ReactNode
}

const templates: AnyMap<Template> = {
  landing_page_01,
  landing_page_02,
  app_01,
  waitlist_01,
  dove,
  indie_folio,
  obsidian,
  simple_bio,
  tiny_folio,
  bio_noir,
  ebony,
  black_matrix
}

export default templates
