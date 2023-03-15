import styles from './TableItem.module.css'

const streaming = [
  '360p',
  '480p',
  '720p',
  '1080p Full HD',
  '4K/2160p Ultra HD',
]
export const TableItem = ({itemData}) => {

  const rating = Array.from({ length: 5 }, (_, index) => index + 1)
    .map((number, idx) => {
      return number <= itemData.rating
        ? <i key={idx} style={{color: 'gold'}} className="bi bi-star-fill"></i>
        : <i key={idx} className="bi bi-star"></i>
    }).reverse()

  const streamingText = streaming[itemData.rating - 1]


  return (
    <div className={styles.wrapper}>
      <div className={styles.titleBlock}>
        <div className={styles.title}>
          {itemData.title}
        </div>
        <div className={styles.rating}>
          {rating}
        </div>
      </div>
      <div className={styles.infoBlock}>
        <div className={styles.latency}>
          <div>latency</div>
          <div>{itemData.latency}</div>
        </div>
        <div className={styles.time}>
          <div>Download time</div>
          <div>{itemData.time} sec</div>
        </div>
        <div className={styles.streaming}>
          <div>Video streaming</div>
          <div>{streamingText}</div>
        </div>
      </div>
    </div>
  )
}
