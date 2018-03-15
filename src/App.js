import React, {Component} from "react"
import VideoPlayer from "./VideoPlayer"

import { Container, Header, Input, Divider } from 'semantic-ui-react'

class App extends Component {
  state = {
    src: '',
  }

  onChange = (e, {name, value}) => {
    this.setState({[name]: value})
  }

  render() {
    return (
      <Container text style={{paddingTop: 20}}>

        <Header>Petrovich Video Engine</Header>
        <p>{`Works on Chrome / Yandex Browser / Any other browser with flash`}</p>
        <Input
          name="src"
          label="Source URL"
          onChange={this.onChange}
          fluid
        />
        <Divider section />
        <VideoPlayer src={this.state.src} key={this.state.src} />
      </Container>
    )
  }
}

export default App
