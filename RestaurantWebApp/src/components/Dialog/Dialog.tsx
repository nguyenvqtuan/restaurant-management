import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react';

interface IDialogProps {
  type?: string; // confirm, show
  isOpen: boolean;
  title?: string;
  message?: string;
  content: string;
  closeDialog: () => void;
  confirmDialog: () => void;
}

const Dialog = (props: IDialogProps) => {
  if (!props.isOpen) {
    return null;
  }

  return (
    <CModal
      visible={props.isOpen}
      onClose={() => props.closeDialog()}
      aria-labelledby="Modal"
    >
      <CModalHeader>
        <CModalTitle id="Modal">{props.title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>{props.message}</p>
      </CModalBody>
      <CModalFooter className="justify-content-center">
        <CButton color="secondary" onClick={() => props.closeDialog()}>
          Cancel
        </CButton>
        {props.type === 'confirm' && (
          <CButton color="primary" onClick={() => props.confirmDialog()}>
            OK
          </CButton>
        )}
      </CModalFooter>
    </CModal>
  );
};

Dialog.defaultProps = {
  title: 'Modal',
  type: 'show',
  message: 'Are you sure?',
};

export default Dialog;
