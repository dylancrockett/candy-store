import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { getItems } from '../../../redux/slices/inventorySlice';

const ItemPage = () => {
    //component styling

    //use navigate
    const navigate = useNavigate();

    //get item id param
    const { itemId } = useParams();

    //get items
    const items = useSelector(getItems);

    //get filtered items
    const filteredItems = items.filter(x => x.itemId.toString() === itemId);
    
    //if no item was found return home
    if (filteredItems.length === 0) {
        navigate("/home");

        return null;
    }

    //get selected item for this page
    const selectedItem = filteredItems[0];

    return (
        <div>
            
        </div>
    )
};

export default ItemPage;