export const VEHICLES_LOADED = 'VEHICLES_LOADED'
export const vehiclesLoaded = () => ({ type: VEHICLES_LOADED })
export const VEHICLE_LOADED = 'VEHICLE_LOADED'
export const vehicleLoaded = (id, url, image) => ({ type: VEHICLE_LOADED, id, url, image })
export const VEHICLES_ERROR = 'VEHICLES_ERROR'
export const vehiclesError = error => ({ type: VEHICLES_ERROR, error })

export const VEHICLE_DETAIL_LOADED = 'VEHICLE_DETAIL_LOADED'
export const vehicleDetailLoaded = (id, description, price) => ({ type: VEHICLE_DETAIL_LOADED, id, description, price })
export const VEHICLE_DETAIL_ERROR = 'VEHICLE_DETAIL_ERROR'
export const vehicleDetailError = (id, error) => ({ type: VEHICLE_DETAIL_ERROR, id, error })
