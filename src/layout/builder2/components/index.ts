import { EmailCapture1 } from './emailCapture/email-capture1'
import { EmailCapture2 } from './emailCapture/email-capture2'
import { Faq1 } from './faq/faq1'
import { Faq2 } from './faq/faq2'
import { Feature1 } from './feature/feature1'
import { Feature2 } from './feature/feature2'
import { Feature3 } from './feature/feature3'
import { Footer1 } from './footer/footer1'
import { Header1 } from './header/header1'
import { Header2 } from './header/header2'
import { Hero1 } from './hero/hero1'
import { Hero2 } from './hero/hero2'
import { Hero3 } from './hero/hero3'
import { Payment1 } from './payment/payment1'
import { Payment2 } from './payment/payment2'
import { Testimonial1 } from './testimonial/testimonial1'

const components: AnyMap<any> = {
  header1: Header1,
  header2: Header2,
  hero1: Hero1,
  hero2: Hero2,
  hero3: Hero3,
  feature1: Feature1,
  feature2: Feature2,
  feature3: Feature3,
  email_capture1: EmailCapture1,
  email_capture2: EmailCapture2,
  faq1: Faq1,
  faq2: Faq2,
  payment1: Payment1,
  payment2: Payment2,
  footer1: Footer1,
  testimonial1: Testimonial1
}

export default components
