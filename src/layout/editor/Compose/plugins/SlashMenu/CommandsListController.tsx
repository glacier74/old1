import { SuggestionKeyDownProps } from '@tiptap/suggestion'
import React, { FC } from 'react'

import { CommandItem, CommandsListProps } from './CommandsList'

interface CommandsListControllerProps {
  component: FC<CommandsListProps>
  items: CommandItem[]
  command: (item: CommandItem) => void
}

interface CommandsListControllerState {
  selectedIndex: number
}

export class CommandsListController extends React.Component<
  CommandsListControllerProps,
  CommandsListControllerState
> {
  constructor(props: CommandsListControllerProps) {
    super(props)
    this.state = { selectedIndex: 0 }
    this.selectItem = this.selectItem.bind(this)
  }

  onKeyDown({ event }: SuggestionKeyDownProps) {
    if (event.key === 'ArrowUp') {
      this.upHandler()
      return true
    }

    if (event.key === 'ArrowDown') {
      this.downHandler()
      return true
    }

    if (event.key === 'Enter') {
      this.enterHandler()
      return true
    }

    return false
  }

  upHandler() {
    this.setState({
      selectedIndex:
        (this.state.selectedIndex + this.props.items.length - 1) % this.props.items.length
    })
  }

  downHandler() {
    this.setState({
      selectedIndex: (this.state.selectedIndex + 1) % this.props.items.length
    })
  }

  enterHandler() {
    this.selectItem(this.state.selectedIndex)
  }

  selectItem(index: number) {
    const item = this.props.items[index]

    if (item) {
      this.props.command(item)
    }
  }

  componentDidUpdate(
    prevProps: CommandsListControllerProps,
    prevState: CommandsListControllerState
  ) {
    if (prevProps.items.length !== this.props.items.length) {
      this.setState({ selectedIndex: 0 })
    }
  }

  render() {
    const { items, component: Component } = this.props
    const { selectedIndex } = this.state

    return <Component items={items} selectedIndex={selectedIndex} selectItem={this.selectItem} />
  }
}
