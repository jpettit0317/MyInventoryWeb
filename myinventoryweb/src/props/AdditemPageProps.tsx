import ItemCount from "../typeDefs/ItemCount";
interface AddItemPageProps {
    itemTitle: string;
    itemDescription: string;
    itemCount: ItemCount;
    itemType: string;
    itemOwner: string;
    onAdd: () => void;
    onClose: () => void;
};

export default AddItemPageProps;