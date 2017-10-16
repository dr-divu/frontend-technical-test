import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadVehicles, loadVehicleDetail } from '../redux/thunk'
import VehicleList from './VehicleList'

const mapStateToProps = state => ({
  vehicles: state.vehicles,
  error: state.error,
  loading: state.loading,
})

const mapDispatchToProps = {
  loadVehicles,
  loadVehicleDetail,
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleList)
