import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  types: [],
  brands: [],
  devices: [],
  selectedType: {},
  selectedBrand: {},
  page: 1,
  totalCount: 0,
  limit: 4
}

export const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setTypes: (state, action) => {
      state.types = action.payload
    },
    setBrands: (state, action) => {
      state.brands = action.payload
    },
    setDevices: (state, action) => {
      // console.log(typeof action.payload.rows)
      // console.log(action.payload.rows.at(-1))
      state.devices = action.payload.rows
      state.totalCount = action.payload.count
    },
    setSelectedType: (state, action) => {
      if (action.payload.id === state.selectedType.id) {
        state.selectedType = {}
      } else {
        state.page = 1
        state.selectedType = action.payload
      }
    },
    setSelectedBrand: (state, action) => {
      if (action.payload.id === state.selectedBrand.id) {
        state.selectedBrand = {}
      } else {
        state.page = 1
        state.selectedBrand = action.payload
      }
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    setLimit: (state, action) => {
      state.limit = action.payload
    }
  }
})

export const {
  setTypes,
  setBrands,
  setDevices,
  setSelectedType,
  setSelectedBrand,
  setLimit,
  setPage,
} = deviceSlice.actions;

export default deviceSlice.reducer;
