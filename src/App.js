import React, {Component} from "react"
import VideoPlayer from "./VideoPlayer"

import { Container, Header, Divider, Form } from 'semantic-ui-react'

class App extends Component {
  state = {
    src: '',
    type: '',
  }

  onChange = (e, {name, value}) => {
    this.setState({[name]: value})
  }

  render() {
    return (
      <Container text style={{paddingTop: 20}}>

        <Header>Petrovich Video Engine</Header>
        <p>{`Works on Chrome / Yandex Browser / Any other browser with flash`}</p>
        <Form>
          <Form.Group width='equal'>
            <Form.Select
              label="Media Type"
              placeholder="Media Type"
              options={[{
                text: 'RTMP',
                value: 'rtmp/mp4',
              }, {
                text: 'HLS',
                value: 'application/x-mpegURL',
              }]}
              name='type'
              onChange={this.onChange}
              />
            <Form.Input
              name="src"
              label="Source URL"
              onChange={this.onChange}
              />
          </Form.Group>
        </Form>
        <Divider section />
        <VideoPlayer src={this.state.src} type={this.state.type}
          key={JSON.stringify(this.state)} />
      </Container>
    )
  }
}

export default App
