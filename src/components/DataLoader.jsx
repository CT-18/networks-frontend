import React, {
  Component,
} from 'react'
import PropTypes from 'prop-types'

import update from 'immutability-helper'
import { Loader } from 'semantic-ui-react'

// Component that can be used for loading data
// It can be in 3 states - loading, loaded, error
// Current state is determined by the state of data loading
export default class DataLoader extends Component {
  static State = {
    LOADING: 0,
    LOADED: 1,
    ERROR: 2,
    UNMOUNTED: -1, // Shows that result of data loading is no more needed
  }

  static propTypes = {
    getLoader: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,

    error: PropTypes.func,
    progress: PropTypes.node,
  }

  static _constructState(oldState, loadingState, data, error) {
    return update(oldState, {
      state: {
        $set: loadingState,
      },
      data: {
        $set: data,
      },
      error: {
        $set: error,
      },
    })
  }

  fetchData() {
    const self = this
    this.props.getLoader()
      .then(data => self.state.state === DataLoader.State.LOADING &&
        self.setState(state => DataLoader._constructState(
          state,
          DataLoader.State.LOADED,
          data,
        ))
      )
      .catch(error => self.state.state === DataLoader.State.LOADING &&
        self.setState(state => DataLoader._constructState(
          state,
          DataLoader.State.ERROR,
          null,
          error
        ))
      )
  }

  reloadData = () => {
    this.setState(() => DataLoader._constructState(
      {},
      DataLoader.State.LOADING,
      null,
      null,
    ))
    this.fetchData()
  }

  componentWillMount() {
    this.reloadData()
  }

  componentWillUnmount() {
    this.setState(state => update(state, {
      state: {
        $set: DataLoader.State.UNMOUNTED,
      },
    }))
  }

  render() {
    const {error, progress} = this.props
    switch (this.state.state) {
      case DataLoader.State.LOADING:
        return progress || <Loader active inline='centered' />
      case DataLoader.State.LOADED:
        return this.props.children(this.state.data, () => this.reloadData())
      case DataLoader.State.ERROR:
        return error && error(this.state.error, () => this.reloadData())
      default:
        return null
    }
  }
}
