'use strict'

const React = require('react')
const { SelectionIterator } = require('./iterator')
const { SelectionListItem } = require('./list-item')
const cx = require('classnames')


class SelectionList extends SelectionIterator {
  get classes() {
    return {
      ...super.classes,
      list: true
    }
  }

  render() {
    return (
      <ul className={cx(this.classes)}>
        {this.map(({ selection, ...props }) =>
          <SelectionListItem {...props}
            key={selection.id}
            isSelected={false}
            selection={selection}/>)}
      </ul>
    )
  }

  static propTypes = {
    ...SelectionIterator.propTypes
  }
}

module.exports = {
  SelectionList
}