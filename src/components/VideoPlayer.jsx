import React from 'react';
import PropTypes from 'prop-types'

import videojs from 'video.js'
require('videojs-flash');
require('videojs-contrib-hls');

export default class VideoPlayer extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
  }

  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(
      this.videoNode,
      {
        autoplay: true,
        controls: true,
        sources: [{
          src: this.props.src,
          type: this.props.type,
        }]
      },
      () => {
        console.log('onPlayerReady', this)
      }
    );
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>
        <div data-vjs-player>
          <video
            ref={ node => this.videoNode = node }
            className="video-js"
            width={this.props.width}
            height={this.props.height}
          ></video>
        </div>
      </div>
    )
  }
}
