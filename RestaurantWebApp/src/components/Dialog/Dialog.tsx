import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react"

interface IDialogProps {
  isOpen: boolean
  title?: string
  content: string
  closeDialog: any
}

const Dialog = (props: IDialogProps) => {
  if (!props.isOpen) {
    return null
  }

  return (
    <CModal
      visible={props.isOpen}
      onClose={() => props.closeDialog()}
      aria-labelledby="LiveDemoExampleLabel"
    >
      <CModalHeader>
        <CModalTitle id="LiveDemoExampleLabel">Modal title</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>Woohoo, you're reading this text in a modal!</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => props.closeDialog()}>
          Close
        </CButton>
        <CButton color="primary">Save changes</CButton>
      </CModalFooter>
    </CModal>
  );
}

export default Dialog