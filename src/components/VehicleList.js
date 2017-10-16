import React, { PureComponent, PropTypes } from 'react'
import { getVehicles } from '../api'
import Vehicle from './vehicle'
import Error from './Error'
import Loading from './Loading'

export default class VehicleList extends PureComponent {

  componentDidMount() {
    this.props.loadVehicles()
  }

  renderVehicles() {
    return this.props.vehicles.map(v => <Vehicle key={v.id} {...v} loadVehicleDetail={this.props.loadVehicleDetail} />)
  }

  render() {
    if (this.props.error) return <Error message={this.props.error} />
    if (this.props.loading) return <Loading />
    
    return <div className="vehicle-list">{this.renderVehicles.call(this)}</div>
  }
}

VehicleList.propTypes = {
  vehicles: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  loadVehicles: PropTypes.func
}