import { Modal, Stepper } from '@heyforms/ui'
import { FC, useMemo } from 'react'

import { useComposeStore } from '../../store'
import { Connect } from './Connect'
import { Product } from './Product'
import { SelectPrice } from './SelectPrice'

const STEPPER_OPTIONS = [
  {
    value: 'connect',
    label: 'Connect'
  },
  {
    value: 'product',
    label: 'Product'
  },
  {
    value: 'selectPrice',
    label: 'Finish'
  }
]

export const StripeConnectModal: FC = () => {
  const { state, dispatch } = useComposeStore()

  function handleClose() {
    dispatch({
      type: 'update',
      payload: {
        stripeConnectBlock: undefined,
        stripeProduct: undefined,
        stripeConnectStep: undefined
      }
    })
  }

  const Element = useMemo(() => {
    switch (state.stripeConnectStep) {
      case 'product':
        return <Product />

      case 'selectPrice':
        return <SelectPrice />

      default:
        return <Connect />
    }
  }, [state.stripeConnectStep])

  return (
    <Modal
      className="stripe-connect-modal"
      visible={!!state.stripeConnectBlock}
      maskClosable={false}
      onClose={handleClose}
      showCloseIcon
    >
      <Stepper items={STEPPER_OPTIONS} value={state.stripeConnectStep} />
      <div className="stripe-connect-modal-body">{Element}</div>
    </Modal>
  )
}
