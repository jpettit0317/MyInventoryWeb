import { RouteComponentProps } from "react-router-dom";
import MyInventoryItem from "../models/usermodels/MyInventoryItem";
import ItemCount from "../typeDefs/ItemCount";

interface EditItemPageProps extends RouteComponentProps {
    itemToEdit: MyInventoryItem;
    updateItem: (updatedItem: MyInventoryItem) => void;
};

export default EditItemPageProps;