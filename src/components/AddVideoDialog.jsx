import React, {Component} from "react"
import PropTypes from 'prop-types'

import { Modal, Button, Icon, Form, List, Divider } from 'semantic-ui-react'
import VideoList from 'components/VideoList'
import DataLoader from 'components/DataLoader'
import { getStreams } from 'api'

const MEDIA_TYPES = [{
  text: 'RTMP',
  value: 'rtmp/mp4',
}, {
  text: 'HLS',
  value: 'application/x-mpegURL',
}]

export default class AddVideoDialog extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    name: '',
    src: '',
    type: '',
    open: false,
  }

  onChange = (e, {name, value}) => {
    this.setState({[name]: value})
  }

  onSubmit = () => {
    const {name, src, type} = this.state
    this.props.onSubmit({name, type, url: src})
    this.toggleModal()
  }

  toggleModal = () => this.setState({open: !this.state.open})

  render() {
    const { onSubmit, ...rest } = this.props
    const { name, src, type } = this.state
    const disableButton = !name || !src || !type

    return (
      <Modal
        trigger={(
          <Button onClick={this.toggleModal}>Add new</Button>
        )}
        open={this.open}
        onClose={this.toggleModal}
      >
        <Modal.Header>Add new video</Modal.Header>
        <Modal.Content>
          <p>{`Select from existing`}</p>

          <DataLoader
            getLoader={() => getStreams()}
          >
            { knownStreams => (
              <List selection>
                {knownStreams.map((stream, key) => (
                  <List.Item
                    key={key}
                    onClick={() => onSubmit({...stream, type: 'application/x-mpegURL'})}
                    >
                    <List.Header>{stream.name}</List.Header>
                    {stream.url}
                  </List.Item>
                ))}
              </List>
            )}
          </DataLoader>

          <Divider horizontal>Or</Divider>

          <p>{`Add custom stream`}</p>
          <Form>
            <Form.Group width='equal'>
              <Form.Input
                name="name"
                label="Video Name"
                onChange={this.onChange}
                />
              <Form.Select
                label="Media Type"
                placeholder="Media Type"
                options={MEDIA_TYPES}
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
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.onSubmit} positive icon disabled={disableButton}>
            Add
            <Icon name="add"/>
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
