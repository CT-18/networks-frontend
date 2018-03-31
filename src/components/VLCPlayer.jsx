import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class VLCPlayer extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
  }

  render() {
    return (
      <embed
        type="application/x-vlc-plugin"
        pluginspage="http://www.videolan.org"
        width={this.props.width}
        height={this.props.height}
        target={this.props.src}
      />
    )
  }
}
