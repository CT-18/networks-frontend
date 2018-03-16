import React, {Component} from "react"
import PropTypes from 'prop-types'
import VideoPlayer from "./VideoPlayer"

import { Card, Header, Button, Icon, Grid } from 'semantic-ui-react'

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

  render() {
    return (
      <Card style={{width: this.props.width}}>
        <VideoPlayer
          src={this.props.url}
          type={this.props.type}
          width={this.props.width}
          key={JSON.stringify(this.props)}
          />
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
