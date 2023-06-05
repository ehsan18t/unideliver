import React from 'react'
import { IoMdClose } from 'react-icons/io'
import './modal.css'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <IoMdClose />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
