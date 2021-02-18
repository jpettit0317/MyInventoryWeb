import { RouteComponentProps } from "react-router-dom";
import MyInventoryItem from "../models/usermodels/MyInventoryItem";

interface EditItemPageProps extends RouteComponentProps {
    itemToEdit: MyInventoryItem;
};

export default EditItemPageProps;