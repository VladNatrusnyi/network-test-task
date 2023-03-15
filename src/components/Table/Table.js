import styles from './Table.module.css'
import {TableItem} from "./TableItem/TableItem";
import {useSelector} from "react-redux";

export const Table = ({width, title}) => {
  const byteCloudArcs = useSelector(state => state.main.byteCloudArcs)
  const globalArcs = useSelector(state => state.main.globalArcs)

  const data = title === 'ByteCloud' ? byteCloudArcs : globalArcs

  return (
    <div style={{width: width}}>
      <div className={styles.title}>{title}</div>
      {
        data.map(el => {
          return  <TableItem key={el.name} itemData={el}/>
        })
      }
    </div>
  )
}
