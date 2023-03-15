import {Person} from "./Person/Person";
import {useSelector} from "react-redux";

const personData = [
  {
    position: {left: 200, top: 200},
    region: 'north-america',
  },
  {
    position: {left: 500, top: 190},
    region: 'europe',
  },
  {
    position: {left: 290, top: 370},
    region: 'south-america',
  },
  {
    position: {left: 720, top: 260},
    region: 'asia',
  },
  {
    position: {left: 800, top: 410},
    region: 'oceania',
  },
]

export const People = () => {

  const isDeviceChecked = useSelector(state => state.main.isDeviceChecked)
  const currentDevices = useSelector(state => state.main.currentDevices)

  const deviceData = isDeviceChecked
    ? personData.filter(item => currentDevices.map(device => device.region).includes(item.region))
    : personData

  return (
    <>
      {
        deviceData.map(person => {
          return (
            <Person key={person.region} position={person.position} region={person.region}/>
          )
        })
      }
    </>
  )
}
