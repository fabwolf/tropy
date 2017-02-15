'use strict'

const React = require('react')
const { PhotoIterator } = require('./iterator')
const { PhotoTile } = require('./tile')
const { bounds, on, off } = require('../../dom')
const cx = require('classnames')


class PhotoGrid extends PhotoIterator {
  constructor(props) {
    super(props)

    this.state = {
      cols: 0
    }

    const superKeyDown = this.handleKeyDown

    this.handleKeyDown = (event) => {
      superKeyDown(event)

      if (!event.isPropagationStopped()) {
        switch (event.key) {
          case (this.isVertical ? 'ArrowLeft' : 'ArrowUp'):
            this.handleSelect(this.getPrevPhoto(this.state.cols))
            break

          case (this.isVertical ? 'ArrowRight' : 'ArrowDown'):
            this.handleSelect(this.getNextPhoto(this.state.cols))
            break

          default:
            return
        }

        event.preventDefault()
        event.stopPropagation()
      }
    }
  }

  componentDidMount() {
    on(window, 'resize', this.resize)
    this.resize()
  }

  componentWillUnmount() {
    off(window, 'resize', this.resize)
  }

  componentDidUpdate(props) {
    if (this.props.zoom !== props.zoom) {
      this.resize()
    }
  }

  resize = () => {
    const { width } = bounds(this.container)

    this.setState({
      cols: Math.floor(width / (this.size * 1.25))
    })
  }

  get classes() {
    return {
      ...super.classes,
      'photo-grid': true,
      'click-catcher': true
    }
  }

  get placeholder() {
    return (
      <li
        className="placeholder tile click-catcher"
        style={{ flexBasis: `${this.size * 1.25}px` }}/>
    )
  }

  get isVertical() {
    return this.state.cols === 1
  }


  render() {
    const tile = this.placeholder

    return this.connect(
      <ul
        className={cx(this.classes)}
        ref={this.setContainer}
        tabIndex={this.tabIndex}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClickOutside}>
        {this.map(({ photo, ...props }) =>
          <PhotoTile {...props} key={photo.id} photo={photo}/>)}

        {tile}{tile}{tile}{tile}{tile}{tile}{tile}
        {tile}{tile}{tile}{tile}{tile}{tile}{tile}
      </ul>
    )
  }


  static propTypes = {
    ...PhotoIterator.propTypes
  }
}

module.exports = {
  PhotoGrid: PhotoGrid.wrap()
}
