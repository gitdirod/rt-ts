import React from 'react'
import useAdmin from '/src/hooks/useAdmin'
import Modal from 'react-modal'
import customStyles from '/src/data/customStyles'

export default function ModalRequest({onClose}) {
const {
    modalViewRequest,
    modalStateRequest,
  } = useAdmin()
  return (
    <Modal 
        isOpen={modalStateRequest}
        style={customStyles}
        overlayClassName="Overlay"
        onRequestClose={onClose}
    >
        {modalViewRequest}
    </Modal>
  )
}