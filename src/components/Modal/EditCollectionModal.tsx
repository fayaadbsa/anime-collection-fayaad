import BaseModal from "./BaseModal";
import CollectionForm from "../Form/CollectionForm";

type PropsType = {
  open: boolean;
  defaultValue: string;
  handleClose: () => void;
};

const EditCollectionModal = ({
  open,
  handleClose,
  defaultValue,
}: PropsType) => {
  return (
    <BaseModal open={open} onClose={handleClose}>
      <CollectionForm handleCreated={handleClose} defaultValue={defaultValue} />
    </BaseModal>
  );
};

export default EditCollectionModal;
