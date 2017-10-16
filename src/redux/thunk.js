import { getVehicles, getVehicle } from '../api'
import {
  vehicleLoaded,
  vehiclesError,
  vehiclesLoaded,
  vehicleDetailLoaded,
  vehicleDetailError,
} from './actions'

export const loadVehicles = () => {
  return dispatch => {
    return getVehicles()
      .then(data => {
        data.vehicles.forEach(v => {
          const { id, url, media } = v
          const image = media.find(m => m.name === 'vehicle').url
          dispatch(vehicleLoaded(id, url, image))
        })
        dispatch(vehiclesLoaded())
        return data
      })
      .catch(error => {
        dispatch(vehiclesError(error))
      })
  }
}

export const loadVehicleDetail = (id, path) => {
  return dispatch => {
    return getVehicle(path)
      .then(data => {
        const { id, description, price } = data
        dispatch(vehicleDetailLoaded(id, description, price))
        return data
      })
      .catch(error => {
        dispatch(vehicleDetailError(id, error))
      })
  }
}
