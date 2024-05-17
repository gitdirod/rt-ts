import React from 'react'
import useAdmin from '/src/hooks/useAdmin'
import Modal from 'react-modal'
import customStyles from '/src/data/customStyles'

export default function ModalComponent({onClose}) {
    const {
        modalViewComponent,
        modalStateComponent,
      } = useAdmin()

  return (
    <Modal 
        isOpen={modalStateComponent}
        style={customStyles}
        overlayClassName="Overlay"
        onRequestClose={onClose}
    >
        {modalViewComponent}
    </Modal>
  )
}
