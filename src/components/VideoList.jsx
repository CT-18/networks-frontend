import React, {Component} from "react"

import { Segment, Card, Header, Grid, Button, Modal } from 'semantic-ui-react'
import VideoCard from './VideoCard'
import AddVideoDialog from './AddVideoDialog'

export default class VideoList extends Component {
  state = {
    videos: []
  }

  onSubmit = (video) => this.setState({videos: [...this.state.videos, video]})

  onDelete = (key) => this.setState({
    videos: [...this.state.videos.slice(0, key), ... this.state.videos.slice(key + 1)],
  })

  render() {
    const self = this
    return (
      <Segment>
        <Grid>
          <Grid.Column floated="left" width={5}>
            <Header>Video Streams</Header>
          </Grid.Column>
          <Grid.Column floated="right" width={3}>
            <AddVideoDialog
              onSubmit={this.onSubmit}
              key={this.state.videos.length}
            />
          </Grid.Column>
        </Grid>
        <Card.Group>
          {this.state.videos.map(({name, url, type}, key) => (
            <VideoCard
              name={name}
              url={url}
              type={type}
              onDelete={() => self.onDelete(key)}
              key={key}
            />
          ))}
        </Card.Group>
      </Segment>
    )
  }
}
