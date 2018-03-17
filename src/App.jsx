import React, {Component} from "react"

import { Container, Header, Divider, Form } from 'semantic-ui-react'
import VideoList from 'components/VideoList'
import BalancerInput from 'components/BalancerInput'

export default class App extends Component {
  render() {
    return (
      <Container style={{paddingTop: 40}}>
        <Header size="huge">{`CDN Stream Viewer`}</Header>
        <p>{`Works on Chrome / Yandex Browser / Any other browser with flash`}</p>
        <BalancerInput/>
        <VideoList />
      </Container>
    )
  }
}
