import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { PaymentComponent } from './PaymentComponent'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    payment: {
      /**
       * Insert payment
       */
      setPayment: (attributes?: { provider?: string; mode?: string }) => ReturnType
    }
  }
}

export const Payment = Node.create({
  name: 'payment',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      provider: {
        default: 'stripe'
      },
      mode: {
        default: 'payment'
      },
      currency: {
        default: 'USD'
      },
      amount: {
        default: 0
      },
      stripeAccount: {
        default: undefined
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'payment'
      }
    ]
  },

  addCommands() {
    return {
      setPayment: () => {
        return ({ commands }) => {
          return commands.insertContent({
            type: this.name
          })
        }
      }
    }
  },

  renderHTML({ HTMLAttributes }) {
    return ['payment', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(PaymentComponent)
  }
})
