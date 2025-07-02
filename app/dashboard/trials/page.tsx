import {Button, Dialog, DialogTrigger, Heading, Input, Label, Modal, TextField} from 'react-aria-components';


export default function Page() {
  return <p>
    <DialogTrigger>
      <Button>Open dialog</Button>
      <Modal isKeyboardDismissDisabled>
        <Dialog>
          <Heading slot="title">Notice</Heading>
          <p>You must close this dialog using the button below.</p>
          <Button slot="close">Close</Button>
        </Dialog>
      </Modal>
    </DialogTrigger>
  </p>;
}