import {useDispatch, useSelector} from "react-redux";
import {setGlobalArcs} from "../store/mainSlice";

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

export const ArcGlobalStorageWrapper = () => {
  const dispatch = useDispatch()

  const currentDevices = useSelector(state => state.main.currentDevices)

  const currentServers = useSelector(state => state.main.currentServers)

  const mainServer = currentServers.find(el => el.status)


  currentDevices.map(item => {
    if (mainServer) {

      return devices.map(el => {
        if (el.id <= item.deviceCount) {
          return `arc_${mainServer.name}_${item.region}_${el.name}.png`
        }
      })
    }
  })

  const generateLink = (count, string, latency, time, realTime, name, title, rating ) => {
    return {
      name,
      realTime,
      latency,
      time,
      title,
      rating,
      links: devices.map(el => {
        if (el.id <= count) {
          return `${string}_${el.name}.png`
        }
      })
    }
  }


  const getLinksForArcs = () => {

    const mainServer = currentServers.find(el => el.status)

    const result = currentDevices.map(device => {
      if (mainServer.name === 'west-usa') {
        if (device.region === 'north-america') {
          return generateLink(device.deviceCount,'arc_west-usa_north-america',23, 9,1000, 'north-america', 'North America',5)
        }
        if (device.region === 'south-america') {
          return generateLink(device.deviceCount,'arc_west-usa_south-america',72, 32,2000, 'south-america', 'South America',4)
        }
        if (device.region === 'asia') {
          return generateLink(device.deviceCount,'arc_west-usa_asia',360, 126,5000, 'asia', 'Asia',2)
        }
        if (device.region === 'oceania') {
          return generateLink(device.deviceCount,'arc_west-usa_oceania',402, 130,5500, 'oceania', 'Oceania',1)
        }
        if (device.region === 'europe') {
          return generateLink(device.deviceCount,'arc_west-usa_europe',202, 63,3500, 'europe', 'Europe',3)
        }

      }
      if (mainServer.name === 'east-usa') {
        if (device.region === 'north-america') {
          return generateLink(device.deviceCount,'arc_east-usa_north-america',23, 9,1000, 'north-america', 'North America',5)
        }
        if (device.region === 'south-america') {
          return generateLink(device.deviceCount,'arc_east-usa_south-america',65, 28,2000, 'south-america', 'South America',4)
        }
        if (device.region === 'asia') {
          return generateLink(device.deviceCount,'arc_east-usa_asia',330, 110,4000, 'asia', 'Asia',3)
        }
        if (device.region === 'oceania') {
          return generateLink(device.deviceCount,'arc_east-usa_oceania',360, 135,4500, 'oceania', 'Oceania',2)
        }
        if (device.region === 'europe') {
          return generateLink(device.deviceCount,'arc_east-usa_europe',186, 54,3000, 'europe', 'Europe',4)
        }
      }


      if (mainServer.name === 'germany') {
        if (device.region === 'north-america') {
          return generateLink(device.deviceCount,'arc_germany_north-america',62, 23,2000, 'north-america', 'North America',4)
        }
        if (device.region === 'south-america') {
          return generateLink(device.deviceCount,'arc_germany_south-america',75, 38,2500, 'south-america', 'South America',4)
        }
        if (device.region === 'asia') {
          return generateLink(device.deviceCount,'arc_germany_asia',80, 42,3000, 'asia', 'Asia',3)
        }
        if (device.region === 'oceania') {
          return generateLink(device.deviceCount,'arc_germany_oceania',120, 50,3000, 'oceania', 'Oceania',3)
        }
        if (device.region === 'europe') {
          return generateLink(device.deviceCount,'arc_germany_europe',10, 16,2500, 'europe', 'Europe',4)
        }

      }
      if (mainServer.name === 'singapore') {
        if (device.region === 'north-america') {
          return generateLink(device.deviceCount,'arc_singapore_north-america',453, 132,6000, 'north-america', 'North America',1)
        }
        if (device.region === 'south-america') {
          return generateLink(device.deviceCount,'arc_singapore_south-america',430, 123,5000, 'south-america', 'South America',1)
        }
        if (device.region === 'asia') {
          return generateLink(device.deviceCount,'arc_singapore_asia',36, 22,3000, 'asia', 'Asia',3)
        }
        if (device.region === 'oceania') {
          return generateLink(device.deviceCount,'arc_singapore_oceania',32, 18,3000, 'oceania', 'Oceania',3)
        }
        if (device.region === 'europe') {
          return generateLink(device.deviceCount,'arc_singapore_europe',100, 49,4000, 'europe', 'Europe',2)
        }
      }
    })


    console.log("Res", result)
    dispatch(setGlobalArcs(result))

    return result
  }




  return (
    <>
      {
        getLinksForArcs().map(el => {
          return el.links.filter(item => item).map(link => {
            return <img key={link} style={{width: '100%', position: 'absolute', left: 0, top: 0}}
                        src={require(`./../assets/arcs/${link}`)} alt={link}/>
          })
        })
      }
    </>
  )
}
