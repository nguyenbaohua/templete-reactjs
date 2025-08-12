import { createSlice } from '@reduxjs/toolkit'

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState: {
    items: [],
  },
  reducers: {
    setVehicles: (state, action) => {
      state.items = action.payload
    },
    clearVehicles: (state) => {
      state.items = []
    },
  },
})

export const { setVehicles, clearVehicles } = vehiclesSlice.actions
export const selectVehicles = (state) => state.vehicles.items
export default vehiclesSlice.reducer