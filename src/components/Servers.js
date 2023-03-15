import {Server} from "./Server/Server";
import {useSelector} from "react-redux";

const serversArr = [
  {
    position: {left: 130, top: 250},
    name: 'west-usa'
  },
  {
    position: {left: 283, top: 240},
    name: 'east-usa'
  },
  {
    position: {left: 477, top: 215},
    name: 'germany'
  },
  {
    position: {left: 750, top: 377},
    name: 'singapore'
  },
]

export const Servers = () => {
  const isServersChecked = useSelector(state => state.main.isServersChecked)
  const currentServers = useSelector(state => state.main.currentServers)
  const isByteCloudArcsChecked = useSelector(state => state.main.isByteCloudArcsChecked)

  const serversData = isServersChecked || isByteCloudArcsChecked
    ? serversArr.filter(item => currentServers.map(server => server.name).includes(item.name))
    : serversArr


  return (
    <>
      {
        serversData.map(server => {
          return (
            <Server key={server.name} position={server.position} name={server.name}/>
          )
        })
      }
    </>
  )
}
