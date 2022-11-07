import {
  combineTransactionSteps,
  Extension,
  findChildren,
  findChildrenInRange,
  getChangedRanges
} from '@tiptap/core'
import { Plugin, PluginKey, Transaction } from 'prosemirror-state'
import { Fragment, Slice } from 'prosemirror-model'
import { v4 as uuidv4 } from 'uuid'

const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * Removes duplicated values within an array.
 * Supports numbers, strings and objects.
 */
function removeDuplicates<T>(array: T[], by = JSON.stringify) {
  const seen: AnyMap<T> = {}

  return array.filter(item => {
    const key = by(item)

    return hasOwnProperty.call(seen, key) ? false : (seen[key] = true)
  })
}

/**
 * Returns a list of duplicated items within an array.
 */
function findDuplicates<T>(items: T[]) {
  const filtered = items.filter((el, index) => items.indexOf(el) !== index)

  return removeDuplicates(filtered)
}

export const UniqueID = Extension.create({
  name: 'uniqueID',
  // we’ll set a very high priority to make sure this runs first
  // and is compatible with `appendTransaction` hooks of other extensions
  priority: 10000,

  addOptions() {
    return {
      attributeName: 'id',
      types: [],
      generateID: () => uuidv4(),
      filterTransaction: null
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          [this.options.attributeName]: {
            default: null,
            parseHTML: (element: HTMLElement) => {
              return element.getAttribute(`data-${this.options.attributeName}`)
            },
            renderHTML: attributes => {
              if (!attributes[this.options.attributeName]) {
                return {}
              }
              return {
                [`data-${this.options.attributeName}`]: attributes[this.options.attributeName]
              }
            }
          }
        }
      }
    ]
  },

  // check initial content for missing ids
  onCreate() {
    const { view, state } = this.editor
    const { tr, doc } = state
    const { types, attributeName, generateID } = this.options
    const nodesWithoutId = findChildren(doc, node => {
      return types.includes(node.type.name) && node.attrs[attributeName] === null
    })
    nodesWithoutId.forEach(({ node, pos }) => {
      tr.setNodeMarkup(pos, undefined, {
        ...node.attrs,
        [attributeName]: generateID()
      })
    })
    view.dispatch(tr)
  },
  addProseMirrorPlugins() {
    let dragSourceElement: HTMLElement | null = null
    let transformPasted = false

    return [
      new Plugin({
        key: new PluginKey('uniqueID'),
        appendTransaction: (transactions, oldState, newState) => {
          const docChanges =
            transactions.some(transaction => transaction.docChanged) &&
            !oldState.doc.eq(newState.doc)
          const filterTransactions =
            this.options.filterTransaction &&
            transactions.some(tr => {
              let _a, _b
              return !((_b = (_a = this.options).filterTransaction) === null || _b === void 0
                ? void 0
                : _b.call(_a, tr))
            })

          if (!docChanges || filterTransactions) {
            return
          }

          const { tr } = newState
          const { types, attributeName, generateID } = this.options
          const transform = combineTransactionSteps(oldState.doc, transactions as Transaction[])
          const { mapping } = transform

          // get changed ranges based on the old state
          const changes = getChangedRanges(transform)

          changes.forEach(({ newRange }) => {
            const newNodes = findChildrenInRange(newState.doc, newRange, node => {
              return types.includes(node.type.name)
            })
            const newIds = newNodes
              .map(({ node }) => node.attrs[attributeName])
              .filter(id => id !== null)
            const duplicatedNewIds = findDuplicates(newIds)
            newNodes.forEach(({ node, pos }) => {
              let _a
              // instead of checking `node.attrs[attributeName]` directly
              // we look at the current state of the node within `tr.doc`.
              // this helps to prevent adding new ids to the same node
              // if the node changed multiple times within one transaction
              const id =
                (_a = tr.doc.nodeAt(pos)) === null || _a === void 0
                  ? void 0
                  : _a.attrs[attributeName]
              if (id === null) {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  [attributeName]: generateID()
                })
                return
              }
              // check if the node doesn’t exist in the old state
              const { deleted } = mapping.invert().mapResult(pos)
              const newNode = deleted && duplicatedNewIds.includes(id)
              if (newNode) {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  [attributeName]: generateID()
                })
              }
            })
          })
          if (!tr.steps.length) {
            return
          }
          return tr
        },
        // we register a global drag handler to track the current drag source element
        view(view) {
          const handleDragstart = (event: any) => {
            let _a
            dragSourceElement = (
              (_a = view.dom.parentElement) === null || _a === void 0
                ? void 0
                : _a.contains(event.target)
            )
              ? view.dom.parentElement
              : null
          }

          window.addEventListener('dragstart', handleDragstart)

          return {
            destroy() {
              window.removeEventListener('dragstart', handleDragstart)
            }
          }
        },
        props: {
          // `handleDOMEvents` is called before `transformPasted`
          // so we can do some checks before
          handleDOMEvents: {
            // only create new ids for dropped content while holding `alt`
            // or content is dragged from another editor
            drop: (view, event) => {
              let _a
              if (
                dragSourceElement !== view.dom.parentElement ||
                ((_a = event.dataTransfer) === null || _a === void 0
                  ? void 0
                  : _a.effectAllowed) === 'copy'
              ) {
                dragSourceElement = null
                transformPasted = true
              }
              return false
            },
            // always create new ids on pasted content
            paste: () => {
              transformPasted = true
              return false
            }
          },
          // we’ll remove ids for every pasted node
          // so we can create a new one within `appendTransaction`
          transformPasted: slice => {
            if (!transformPasted) {
              return slice
            }
            const { types, attributeName } = this.options
            const removeId = (fragment: Fragment) => {
              const list: any[] = []

              fragment.forEach(node => {
                // don’t touch text nodes
                if (node.isText) {
                  list.push(node)
                  return
                }
                // check for any other child nodes
                if (!types.includes(node.type.name)) {
                  list.push(node.copy(removeId(node.content)))
                  return
                }
                // remove id
                const nodeWithoutId = node.type.create(
                  {
                    ...node.attrs,
                    [attributeName]: null
                  },
                  removeId(node.content),
                  node.marks
                )
                list.push(nodeWithoutId)
              })
              return Fragment.from(list)
            }

            // reset check
            transformPasted = false
            return new Slice(removeId(slice.content), slice.openStart, slice.openEnd)
          }
        }
      })
    ]
  }
})
