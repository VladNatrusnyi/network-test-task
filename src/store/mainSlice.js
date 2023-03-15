import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentDevices: [],
  currentServers: [],
  isDeviceChecked: false,
  isServersChecked: false,

  byteCloudArcs: [],
  isByteCloudArcsChecked: false,

  globalArcs: [],
  isGlobalArcsChecked: false,

  isScreenLoad: false,

  isAnimationOver: false,

  byteCloudArcsOK: false,
  globalCloudArcsOK: false
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setCurrentServers: (state, action) => {
      const data = !state.currentServers.length ? {...action.payload, status: 'main'} : action.payload
      state.currentServers.push(data)
    },
    setIsServersChecked: (state) => {
      state.isServersChecked = true
      state.isScreenLoad = true
      //нада коли другий етап включать, то обнулить screenload
    },
    setIsScreenLoad: (state) => {
      state.isScreenLoad = true
    },
    setIsDeviceChecked: (state) => {
      state.isDeviceChecked = true
    },
    setCurrentDevices: (state, action) => {
      state.currentDevices.push(action.payload)
    },
    setByteCloudArcs: (state, action) => {
      state.byteCloudArcs = action.payload
      //---------------
      state.byteCloudArcsOK = true
    },
    setGlobalArcs: (state, action) => {
      state.globalArcs = action.payload
      //---------------
      state.globalCloudArcsOK = true
    },
    setIsByteCloudArcsChecked: (state, action) => {
      state.isScreenLoad = false
      state.isByteCloudArcsChecked = true
      state.isServersChecked = false

      state.isScreenLoad2 = false
    },
    setIsGlobalArcsChecked: (state, action) => {
      state.isScreenLoad = false
      state.isAnimationOver = true
    },
    setIsAnimationOver: (state, action) => {
      state.isAnimationOver = true
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setCurrentServers,
  setIsDeviceChecked,
  setCurrentDevices,
  setIsServersChecked,
  setByteCloudArcs,
  setIsByteCloudArcsChecked,
  setGlobalArcs,
  setIsScreenLoad,
  setIsGlobalArcsChecked,
  setIsAnimationOver
} = mainSlice.actions

export default mainSlice.reducer
