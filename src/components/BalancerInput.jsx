import React, { Component } from 'react'
import { Segment, Header, Grid, Form, Icon } from 'semantic-ui-react'
import { setBalancer, getBalancer, removeBalancer } from 'state'

export default class BalancerInput extends Component {
  state = {
    url: '',
  }

  onChange = (e, {name, value}) => this.setState({[name]: value})

  onRemove = () => {
    removeBalancer()
    this.forceUpdate()
  }

  onSave = () => {
    setBalancer(this.state.url)
    this.forceUpdate()
  }

  render() {
    const balancer = getBalancer()
    return (
      <Segment>
        <Form>
          <Header>{`Specify URL of balancer to get the list of streams`}</Header>
          {balancer && (
            <Grid>
              <Grid.Column width={5}>
                <Header>
                  Current balancer
                  <Header.Subheader>
                    {balancer}
                  </Header.Subheader>
                </Header>
              </Grid.Column>
              <Grid.Column width={3}>
                <Form.Button negative icon onClick={this.onRemove}>
                  <Icon name="remove"/>
                  Remove
                </Form.Button>
              </Grid.Column>
            </Grid>
          )}
          <Grid>
            <Grid.Column width={5}>
              <Form.Input
                placeholder="Balancer URL"
                onChange={this.onChange}
                name="url"
                />
            </Grid.Column>
            <Grid.Column width={5}>
              <Form.Button icon positive onClick={this.onSave}>
                <Icon name="save"/>
                Save
              </Form.Button>
            </Grid.Column>
          </Grid>
        </Form>
      </Segment>
    )
  }
}
