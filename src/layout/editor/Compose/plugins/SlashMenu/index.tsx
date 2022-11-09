import { Extension } from '@tiptap/core'
import { ReactRenderer } from '@tiptap/react'
import Suggestion from '@tiptap/suggestion'
import React from 'react'
import tippy, { Instance } from 'tippy.js'

import { CommandItem, CommandsList } from './CommandsList'
import { CommandsListController } from './CommandsListController'

export const SlashMenu = Extension.create({
  name: 'slashMenu',

  addOptions() {
    return {
      commands: [],
      filterCommands: (commands: CommandItem[], query: string) => {
        return commands
          .filter(item => item.title.toLowerCase().startsWith(query.toLowerCase()))
          .slice(0, 10)
      },
      suggestion: {
        char: '/',
        startOfLine: true
      }
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
        items: props => this.options.filterCommands(this.options.commands, props.query),
        command: ({ editor, range, props }) => {
          props.command({ editor, range })
        },
        render: () => {
          let component: ReactRenderer
          let popup: Instance[]

          return {
            onStart: props => {
              component = new ReactRenderer(CommandsListController, {
                editor: props.editor,
                props: {
                  ...props,
                  component: CommandsList
                }
              })

              popup = tippy(document.body, {
                getReferenceClientRect: props.clientRect as () => DOMRect,
                content: component.element,
                appendTo: () => document.body,
                showOnCreate: true,
                interactive: true,
                trigger: 'manual',
                placement: 'bottom-start'
              }) as unknown as Instance[]
            },

            onUpdate: props => {
              component.updateProps({
                ...props,
                component: this.options.component
              })

              popup[0].setProps({
                getReferenceClientRect: props.clientRect as () => DOMRect
              })
            },

            onKeyDown(props) {
              return (component.ref as CommandsListController)?.onKeyDown(props)
            },

            onExit() {
              popup[0]?.destroy()
              component.destroy()
            }
          }
        }
      })
    ]
  }
})
