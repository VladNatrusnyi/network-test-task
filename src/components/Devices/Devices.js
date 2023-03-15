import styles from './Devices.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setIsByteCloudArcsChecked, setIsGlobalArcsChecked} from "../../store/mainSlice";

const devices = [
  {
    id: 1,
    name: 'small'
  },
  {
    id: 2,
    name: 'medium'
  },
  {
    id: 3,
    name: 'large'
  }
]

export const Devices = ({region, coupleOfDevices}) => {
  const dispatch = useDispatch()

  const byteCloudArcs = useSelector(state => state.main.byteCloudArcs)
  const isByteCloudArcsChecked = useSelector(state => state.main.isByteCloudArcsChecked)
  const isGlobalArcsChecked = useSelector(state => state.main.isGlobalArcsChecked)
  const globalArcs = useSelector(state => state.main.globalArcs)

  const networkData = !isByteCloudArcsChecked
    ? byteCloudArcs.find(el => el.name === region)
    : globalArcs.find(el => el.name === region)

  const [isLoaded, setIsLoaded] = useState(false)

  const [isLoading1, setIsLoading1] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false)


  const byteCloudArcsOK = useSelector(state => state.main.byteCloudArcsOK)


  useEffect(() => {
    if (byteCloudArcsOK) {
      setIsLoading1(true)
    }
  }, [byteCloudArcsOK])


  useEffect(() => {
    if (isByteCloudArcsChecked || isGlobalArcsChecked) {
      setIsLoaded(false);
      setIsLoading1(false);
      // dispatch(setIsScreenLoad())
    }
  }, [isByteCloudArcsChecked, isGlobalArcsChecked])

  useEffect(() => {
    if (networkData) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, networkData.realTime);

      return () => clearTimeout(timer);
    }
  }, [networkData]);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        // dispatch(setIsByteCloudArcsChecked())
        setIsLoading1(false)
        setIsLoading2(true)
        !isByteCloudArcsChecked
          ? dispatch(setIsByteCloudArcsChecked())
          : dispatch(setIsGlobalArcsChecked())
        // setIsLoading1(true)
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <div className={styles[region]}>
      {
        networkData && <span className={styles[`${region}-text`]}>
        {
          isLoaded ? `Time: ${networkData.time}` : `Latency: ${networkData.latency}`
        }
        </span>
      }
      {
        devices.map(device => {
          if (device.id && device.id <= coupleOfDevices) {
            return (
              <div key={device.id}>
                <img  className={styles[`${region}-${device.name}`]} key={device.id} width={25} src={require(`./../../assets/img/devices/${device.name}.png`)} alt=""/>
                {

                  <img
                    style={networkData && {transition: isLoading1 ? `width ${networkData.realTime}ms` : 'width 10ms'}}
                    className={`${styles[`${region}-${device.name}`]}`}
                    width={isLoading1 ? 25 : 0}
                    height={25}
                    src={require(`./../../assets/img/mask/${device.name}_mask.png`)}
                    alt=""
                  />
                }
                {
                  <img
                    style={networkData && {transition: `width ${networkData.realTime}ms`}}
                    className={styles[`${region}-${device.name}`]}
                    width={isLoading2 ? 25 : 0}
                    height={25}
                    src={require(`./../../assets/img/mask/${device.name}_mask.png`)}
                    alt=""
                  />
                }
              </div>
            )
          }
        } )
      }
    </div>
  )
}
