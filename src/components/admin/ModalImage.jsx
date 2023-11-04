import React from 'react'
import useAdmin from '/src/hooks/useAdmin'
import Modal from 'react-modal'
import customStyles from '/src/data/customStyles'

export default function ModalImage({onClose}) {
    const {
        modalViewImage,
        modalStateImage,
      } = useAdmin()

  return (
    <Modal 
        isOpen={modalStateImage}
        style={customStyles}
        overlayClassName="Overlay"
        onRequestClose={onClose}
    >
        {modalViewImage}
    </Modal>
  )
}
