import BaseModal from "./BaseModal";
import CollectionForm from "../Form/CollectionForm";

type PropsType = {
  open: boolean;
  handleClose: () => void;
  defaultValue: string;
  handleEdited?: (name: string) => void;
};

const EditCollectionModal = ({
  open,
  handleClose,
  handleEdited,
  defaultValue,
}: PropsType) => {
  return (
    <BaseModal open={open} onClose={handleClose}>
      <CollectionForm defaultValue={defaultValue} handleEdited={handleEdited} />
    </BaseModal>
  );
};

export default EditCollectionModal;
