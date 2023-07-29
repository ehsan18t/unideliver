import { motion } from 'framer-motion'
import { IoMdClose } from 'react-icons/io'
import './modal.css'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const modalVariants = {
    hidden: { opacity: 0, y: '-50%' },
    visible: { opacity: 1, y: '0%' },
    exit: { opacity: 0, y: '-50%' },
  }

  const transition = {
    duration: 0.3,
    ease: 'easeInOut',
  }

  return (
    <motion.div
      className="modal"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={backdropVariants}
      transition={transition}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        variants={modalVariants}
        transition={transition}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>
          <IoMdClose />
        </button>
        {children}
      </motion.div>
    </motion.div>
  )
}

export default Modal
