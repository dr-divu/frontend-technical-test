import React, { PureComponent, PropTypes } from 'react'
import { getVehicle } from '../api'
import Error from './Error'
import Loading from './Loading'

export default class Vehicle extends PureComponent {
  
  componentDidMount() {
    this.props.loadVehicleDetail(this.props.id, this.props.url)
  }

  render() {
    if (this.props.error) return <Error message={this.state.error} />
    if (this.props.loading) return <Loading />

    const { id, description, price, image } = this.props
    return (
      <div className="vehicle">
        <div
          className="vehicle__image"
          style={{ backgroundImage: `url(${image})` }}
        />

        <div className="vehicle__information">
          <div className="vehicle__information__name">{id}</div>
          <div className="vehicle__information__price">From {price}</div>
          <div className="vehicle__information__description">
            {description}
          </div>
        </div>
      </div>
    )
  }
}

Vehicle.propTypes = {
  id: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string,
  image: PropTypes.string,
  loadVehicleDetail: PropTypes.func,
  id: PropTypes.string,
  url: PropTypes.string
}
