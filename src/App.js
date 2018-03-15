import React, {Component} from "react"
import VideoPlayer from "./VideoPlayer"
import "./App.css"

const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [{
    src: 'rtmp://10.8.0.3/live/test',
    type: 'rtmp/flv'
  }]
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Rtmp Stream Petrovich</h1>
        </header>
        <VideoPlayer { ...videoJsOptions } />
      </div>
    )
  }
}

export default App
