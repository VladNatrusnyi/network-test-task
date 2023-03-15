import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {People} from "./components/People";
import {setIsDeviceChecked, setIsServersChecked} from "./store/mainSlice";
import {useEffect} from "react";
import {Servers} from "./components/Servers";
import {ArcByteStorageWrapper} from "./components/ArcByteStorageWrapper";
import {ArcGlobalStorageWrapper} from "./components/ArcGlobalStorageWrapper";


import {MyModal} from "./components/Modal/MyModal";

function App() {
  const dispatch = useDispatch()

  const currentDevices = useSelector(state => state.main.currentDevices)
  const isDeviceChecked = useSelector(state => state.main.isDeviceChecked)
  const currentServers = useSelector(state => state.main.currentServers)
  const isServersChecked = useSelector(state => state.main.isServersChecked)
  const isByteCloudArcsChecked = useSelector(state => state.main.isByteCloudArcsChecked)

  const finishSelectingDevice = () => {
    dispatch(setIsDeviceChecked())
  }

  const startDemonstration = () => {
    if (currentServers.length >= 3) {
      dispatch(setIsServersChecked())
    }
  }

  useEffect(() => {
    if (currentDevices.length === 5) {
      finishSelectingDevice()
    }
  }, [currentDevices])

  useEffect(() => {
    if (currentServers.length === 4) {
      dispatch(setIsServersChecked())
    }
  }, [currentServers])


  let topText = (
    <p className="topText">
    Where are your user? Choose the number for every region.
    {
      !!currentDevices.length && !isDeviceChecked && <span onClick={finishSelectingDevice} className={'nextBtn'}>Next</span>
    }
  </p>)

  if (isDeviceChecked) {
    topText = (<p className="topText"> Where is your data? Choose one spot for Object Storage system </p>)
  }

  if (currentServers.find(el => el.status)) {
    topText = (
      <p className="topText">
        Choose minimum two additional spots for ByteCloud and press
        <span style={{color: currentServers.length >= 3 ? 'blue' : 'lightgray' }} onClick={startDemonstration} className={'startBtn'}>Start</span>
      </p>)
  }

  if (isServersChecked || isByteCloudArcsChecked) {
    topText = null
  }

  return (
    <div className="App">
      <img className="map" src={require('./assets/img/map.png')} alt="" />
      {topText}

      <People />

      {
        isDeviceChecked && <Servers />
      }

      {
        isServersChecked && <ArcByteStorageWrapper />
      }

      {
        isByteCloudArcsChecked && <ArcGlobalStorageWrapper />
      }

      <MyModal />

    </div>
  );
}

export default App;
