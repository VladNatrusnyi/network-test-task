import {useDispatch, useSelector} from "react-redux";
import {setByteCloudArcs} from "../store/mainSlice";

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

export const ArcByteStorageWrapper = () => {
  const dispatch = useDispatch()

  const currentDevices = useSelector(state => state.main.currentDevices)

  const currentServers = useSelector(state => state.main.currentServers)

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
    const item = currentServers.map(el => el.name)

    const result = currentDevices.map(device => {
      if (device.region === 'north-america') {
        if (item.includes('west-usa')) {
          return generateLink(device.deviceCount,'arc_west-usa_north-america',23, 9,1000, 'north-america', 'North America', 5)
        }
        if (item.includes('east-usa')) {
          return generateLink(device.deviceCount,'arc_east-usa_north-america',25, 11,1100, 'north-america', 'North America', 5)
        }
        if (item.includes('germany')) {
          return generateLink(device.deviceCount,'arc_germany_north-america',100, 70,2500, 'north-america', 'North America', 4)
        }
        if (item.includes('singapore')) {
          return generateLink(device.deviceCount,'arc_singapore_north-america',324, 210,4500, 'north-america', 'North America', 2)
        }
      }


      if (device.region === 'south-america') {
        if (item.includes('west-usa')) {
          return generateLink(device.deviceCount,'arc_west-usa_south-america',95, 73,1100, 'south-america', 'South America',5)
        }
        if (item.includes('east-usa')) {
          return generateLink(device.deviceCount,'arc_east-usa_south-america',105, 79,1100, 'south-america', 'South America',5)
        }
        if (item.includes('germany')) {
          return generateLink(device.deviceCount,'arc_germany_south-america',164, 200,3000, 'south-america', 'South America',3)
        }
        if (item.includes('singapore')) {
          return generateLink(device.deviceCount, 'arc_singapore_south-america', 266, 193,4500, 'south-america', 'South America',2)
        }
      }

      if (device.region === 'asia') {
        if (item.includes('singapore')) {
          return generateLink(device.deviceCount, 'arc_singapore_asia',65, 73,1100, 'asia', 'Asia',5)
        }
        if (item.includes('germany')) {
          return generateLink(device.deviceCount, 'arc_germany_asia', 76, 41,2000, 'asia', 'Asia',4)
        }
        if (item.includes('east-usa')) {
          return generateLink(device.deviceCount, 'arc_east-usa_asia',430, 62,5000, 'asia', 'Asia',2)
        }
        if (item.includes('west-usa')) {
          return generateLink(device.deviceCount, 'arc_west-usa_asia',445, 54,4800, 'asia', 'Asia',3)
        }
      }


      if (device.region === 'oceania') {
        if (item.includes('singapore')) {
          return generateLink(device.deviceCount, 'arc_singapore_oceania',65, 73,1100, 'oceania', 'Oceania',5)
        }
        if (item.includes('germany')) {
          return generateLink(device.deviceCount, 'arc_germany_oceania',140, 82,1200, 'oceania', 'Oceania',5)
        }
        if (item.includes('east-usa')) {
          return generateLink(device.deviceCount, 'arc_east-usa_oceania',382, 126,3500, 'oceania', 'Oceania',3)
        }
        if (item.includes('west-usa')) {
          return generateLink(device.deviceCount, 'arc_west-usa_oceania',412, 141,5000, 'oceania', 'Oceania',1)
        }
      }


      if (device.region === 'europe') {
        if (item.includes('germany')) {
          return generateLink(device.deviceCount, 'arc_germany_europe',30, 9,2000, 'europe', 'Europe',4)
        }
        if (item.includes('east-usa')) {
          return generateLink(device.deviceCount, 'arc_east-usa_europe',100, 70,3000, 'europe', 'Europe',3)
        }
        if (item.includes('west-usa')) {
          return generateLink(device.deviceCount, 'arc_west-usa_europe',110, 78,3500, 'europe', 'Europe',3)
        }
        if (item.includes('singapore')) {
          return generateLink(device.deviceCount, 'arc_singapore_europe',201, 112,4500, 'europe', 'Europe',2)
        }
      }
    })

    console.log("Res", result)
    dispatch(setByteCloudArcs(result))

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
