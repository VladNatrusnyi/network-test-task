import {useState} from "react";
import {Modal} from "react-responsive-modal";
import {useSelector} from "react-redux";

import 'react-responsive-modal/styles.css';
import {Table} from "../Table/Table";
import styles from './MyModal.module.css'

export const MyModal = ({ show, handleClose, children }) => {

  const isAnimationOver = useSelector(state => state.main.isAnimationOver)

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div>
      <Modal
        showCloseIcon={false}
        classNames={{
        overlay: 'customOverlay',
        modal: 'customModal',
      }} open={isAnimationOver}>
        <>
          <div style={{marginBottom: 20}}>Do you want to <span className={'modal-start-again-btn'} onClick={handleReload}>start again?</span></div>
          <div className={styles.tableWrapper}>
            <Table title={'ByteCloud'} style={{border: '1px solid blue'}} width={'50%'}/>
            <Table title={'Object Storage'} style={{border: '1px solid blue'}} width={'50%'}/>
          </div>
        </>
      </Modal>
    </div>
  )
};

