import BaseModal from "./BaseModal";
import CreateCollectionForm from "../Form/CreateCollectionForm";

type PropsType = {
  open: boolean;
  handleClose: () => void;
};

const CreateCollectionModal = ({ open, handleClose }: PropsType) => {
  return (
    <BaseModal open={open} onClose={handleClose}>
      <CreateCollectionForm handleCreated={handleClose} />
    </BaseModal>
  );
};

export default CreateCollectionModal;
