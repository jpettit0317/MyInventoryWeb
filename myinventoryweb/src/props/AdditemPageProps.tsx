import ItemCount from "../typeDefs/ItemCount";
import { RouteComponentProps } from 'react-router-dom';

interface AddItemPageProps extends RouteComponentProps {
    itemTitle: string;
    itemDescription: string;
    itemCount: ItemCount;
    itemType: string;
    itemOwner: string;
};

export default AddItemPageProps;