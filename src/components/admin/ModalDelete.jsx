import React from 'react'
import useAdmin from '/src/hooks/useAdmin'
import Modal from 'react-modal'
import customStyles from '/src/data/customStyles'

export default function ModalDelete({onClose}) {
const {
    modalViewDelete,
    modalStateDelete,
    handleCloseDeleteModal
  } = useAdmin()
  return (
    <Modal 
        isOpen={modalStateDelete}
        style={customStyles}
        overlayClassName="Overlay"
        onRequestClose={handleCloseDeleteModal}
    >
        {modalViewDelete}
    </Modal>
  )
}