import {
  LOAD_VEHICLES, VEHICLE_LOADED, VEHICLES_LOADED, VEHICLES_ERROR, 
  LOAD_VEHICLE_DETAIL, VEHICLE_DETAIL_LOADED, VEHICLE_DETAIL_ERROR
} from './actions'

export const initialState = { loading: true, error: '', vehicles: [] }

export default function vehicles(state = initialState, action) {
  switch (action.type) {
    case VEHICLES_LOADED:
      return Object.assign({}, state, { loading: false })

    case VEHICLE_LOADED:
      return Object.assign({}, state, { vehicles: [
        ...state.vehicles,
        { id: action.id, url: action.url, image:  action.image, detailsLoading: true, detailsLoaded: false }
      ]})

    case VEHICLES_ERROR:
      return Object.assign({}, state,
        { error: action.error, loading: false })
      
    case VEHICLE_DETAIL_LOADED:
      return Object.assign({}, state, { vehicles: [
        ...state.vehicles.filter(v => v.id !== action.id),
        Object.assign({},
          state.vehicles.find(v => v.id === action.id),
          {detailsLoading: false, detailsLoaded: true,
            description: action.description, price: action.price })
      ]})
      
    case VEHICLE_DETAIL_ERROR:
      return Object.assign({}, state, { vehicles: [
        ...state.vehicles.filter(v => v.id !== action.id),
        Object.assign({},
          state.vehicles.find(v => v.id === action.id),
          {detailsLoading: false, error: action.error})
      ]})

    default:
      return state
  }
}
