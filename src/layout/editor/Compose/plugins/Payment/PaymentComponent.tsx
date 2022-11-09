import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { FC } from 'react'

export const PaymentComponent: FC<NodeViewProps> = props => {
  return (
    <NodeViewWrapper>
      <div
        tabIndex={0}
        className="mt-4 max-w-full overflow-x-auto rounded hover:ring-1 focus:ring-1 ring-blue-700"
      >
        PaymentComponent
      </div>
    </NodeViewWrapper>
  )
}
