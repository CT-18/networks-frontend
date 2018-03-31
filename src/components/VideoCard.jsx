import React, {Component} from "react"
import PropTypes from 'prop-types'
import VideoJSPlayer from "./VideoJSPlayer"
import VLCPlayer from './VLCPlayer'

import { Card, Header, Button, Icon, Grid } from 'semantic-ui-react'

import MediaTypes from 'constants/MediaTypes'

export default class VideoCard extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  static defaultProps = {
    width: 350,
  }

  renderPlayer(props, key) {
    switch (props.type) {
      case MediaTypes.RTMP:
      case MediaTypes.HLS:
        return (
          <VideoJSPlayer
            src={props.url}
            type={props.type}
            width={props.width}
            key={key}
            />
        )
      case MediaTypes.RTSP:
        return (
          <VLCPlayer
            src={props.url}
            type={props.type}
            width={props.width}
          />
        )
    }
  }

  render() {
    return (
      <Card style={{width: this.props.width}}>
        {this.renderPlayer(this.props, JSON.stringify(this.props))}
        <Card.Content>
          <Button icon negative floated="right" onClick={() => this.props.onDelete()}>
            <Icon name="remove"/>
          </Button>
          <Card.Header>{this.props.name}</Card.Header>
        </Card.Content>
      </Card>
    )
  }
}
