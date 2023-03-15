import styles from './Person.module.css'
import {useState} from "react";
import {Devices} from "../Devices/Devices";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentDevices} from "../../store/mainSlice";


const numbers = [1, 2, 3];

export const Person = ({position, region}) => {
  const dispatch = useDispatch()

  const isDeviceChecked = useSelector(state => state.main.isDeviceChecked)

  const [coupleOfUsers, setCoupleOfUsers] = useState(0)
  const [isChecked, setIsChecked] = useState(false)


  const setCountOfDevices = () => {
    setIsChecked(true)
    dispatch(setCurrentDevices({region: region, deviceCount: coupleOfUsers}))
  }


  return (
    <div style={{ position: 'absolute', left: position.left, top: position.top}}>
      {
        !isChecked && !isDeviceChecked ?
          <div>
            {
              numbers.map((number, idx) => (
                <img
                  key={number}
                  onMouseOver={() => setCoupleOfUsers(number)}
                  onMouseOut={() => setCoupleOfUsers(0)}
                  className={styles.man} style={{ width: number * 8}}
                  src={ coupleOfUsers > 0 && idx + 1 <= coupleOfUsers ? require('./../../assets/img/man_filled.png') : require('./../../assets/img/man_empty.png')} alt={`img${number}`}
                  onClick={setCountOfDevices}
                />
              ))
            }
          </div>
          :
          <Devices region={region} coupleOfDevices={coupleOfUsers}/>
      }
    </div>
  )
}
