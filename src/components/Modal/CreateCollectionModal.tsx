import BaseModal from "./BaseModal";
import CollectionForm from "../Form/CollectionForm";

type PropsType = {
  open: boolean;
  handleClose: () => void;
};

const CreateCollectionModal = ({ open, handleClose }: PropsType) => {
  return (
    <BaseModal open={open} onClose={handleClose}>
      <CollectionForm handleCreated={handleClose} />
    </BaseModal>
  );
};

export default CreateCollectionModal;
