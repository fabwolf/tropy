'use strict'

const React = require('react')
const { Provider, connect } = require('react-redux')
const ReactIntl = require('react-intl')
const { element, object } = require('prop-types')
const { DragDropContext } = require('react-dnd')
const { default: ElectronBackend } = require('react-dnd-electron-backend')
const { Flash } = require('./flash')

const IntlProvider = connect(state => {
  return {
    ...state.intl, key: state.intl.locale
  }
})(ReactIntl.IntlProvider)

// Need component for React DnD
// eslint-disable-next-line react/prefer-stateless-function
class Main extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <IntlProvider>
          <div className="main-container">
            {this.props.children}
            <Flash/>
          </div>
        </IntlProvider>
      </Provider>
    )
  }

  static propTypes = {
    children: element.isRequired,
    store: object.isRequired
  }
}

module.exports = {
  Main: DragDropContext(ElectronBackend)(Main)
}
