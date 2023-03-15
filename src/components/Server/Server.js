import styles from './Server.module.css'
import {useState} from "react";
import {setCurrentDevices, setCurrentServers} from "../../store/mainSlice";
import {useDispatch, useSelector} from "react-redux";
export const Server = ({position, name}) => {
  const dispatch = useDispatch()
  const [circle, setCircle] = useState('circle_empty')

  const [isChecked, setIsChecked] = useState(false)

  const currentServers = useSelector(state => state.main.currentServers)

  const obj = currentServers.find(el => el.name === name)
  const serverImg = obj && obj.status ? 'server' : 'server_ByteCloud'

  const setCountOfServers = () => {
    setIsChecked(true)
    dispatch(setCurrentServers({name: name }))
  }

  return (
    <div style={{ position: 'absolute', left: position.left, top: position.top}}>
      {
        !isChecked
          ? <img
            onMouseOver={() => setCircle('circle_filled')}
            onMouseOut={() => setCircle('circle_empty')}
            className={styles.circle}
            src={require(`./../../assets/img/servers/${circle}.png`)}
            alt=""
            onClick={setCountOfServers}
          />
          : <img className={styles.serverImg} src={require(`./../../assets/img/servers/${serverImg}.png`)} alt=""/>
      }
    </div>
  )
}
