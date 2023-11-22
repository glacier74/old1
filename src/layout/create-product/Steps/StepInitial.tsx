import { isFalse } from '@nily/utils'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { FC, useContext } from 'react'

import { IconBioPage, IconLandingPage } from '~/components'
import { PAGE_STEPS } from '~/layout'

import { StepContainer } from './StepContainer'
import { StepsStoreContext } from './context'

interface RadioItemProps {
  value: string
  label: string
  icon: FC<any>
  checked?: boolean
  onClick: (value: string) => void
}

const RADIO_ITEMS = [
  {
    label: 'Landing Page',
    value: 'landingPage',
    icon: IconLandingPage
  },
  {
    label: 'Jingle Bio',
    value: 'bioPage',
    icon: IconBioPage
  }
]

const RadioItem: FC<RadioItemProps> = ({ value, label, icon: Icon, checked, onClick }) => {
  function handleClick() {
    onClick(value)
  }

  return (
    <div
      className={clsx(
        'border rounded-xl p-5 cursor-pointer',
        checked
          ? 'border-emerald-600 ring-[1px] ring-emerald-600'
          : 'border-slate-200 hover:bg-slate-50'
      )}
      role="radio"
      onClick={handleClick}
    >
      <div className="mb-5 font-bold">{label}</div>
      <Icon className="text-slate-200" />
    </div>
  )
}

export const StepInitial = () => {
  const { t } = useTranslation('dashboard')
  const { state, dispatch } = useContext(StepsStoreContext)

  function handleChange(type: string) {
    const steps = PAGE_STEPS.filter(s => s.type === 'step' || s.type === type)

    dispatch({
      type: 'setState',
      payload: {
        type,
        steps: steps.map((s: any) => ({
          value: s.value,
          isAllowToPrev: !isFalse(s.isAllowToPrev),
          isNextButtonShow: !isFalse(s.isNextButtonShow)
        }))
      }
    })
  }

  return (
    <StepContainer className="max-w-2xl">
      <div className="mb-2 text-3xl font-semibold text-slate-950">
        {t('createProduct.siHeading')}
      </div>
      <p className="mb-8 text-slate-500 text-xl">{t('createProduct.siDesc')}</p>
      <p className="mb-4 text-slate-800 text-sm">{t('createProduct.siDesc2')}</p>
      <div className="mb-8 space-y-0 flex items-center gap-10">
        {RADIO_ITEMS.map(row => (
          <RadioItem
            key={row.value}
            value={row.value}
            label={row.label}
            icon={row.icon}
            checked={state.type === row.value}
            onClick={handleChange}
          />
        ))}
      </div>
    </StepContainer>
  )
}
