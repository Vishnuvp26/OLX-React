import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { contextType, itemsContext } from '../Context/Items';
import Navbar from '../Navbar/Navbar';
import LoginModal from '../Modal/Login';
import SellItemModal from '../Modal/Sell';

const Details = () => {
    const location = useLocation(); // Get the location object
    const { item } = location.state || {}; // Access the passed item from the Link component

    let [openModal, setModal] = useState<boolean>(false);
    let [openModalSell, setModalSell] = useState<boolean>(false);
    let itemsCtx: contextType | null = itemsContext();

    const toggleModal = () => setModal(!openModal);
    const toggleModalSell = () => setModalSell(!openModalSell);

    return (
        <div>
            <Navbar toggleModalSell={toggleModalSell} toggleModal={toggleModal} />
            <LoginModal toggleModal={toggleModal} status={openModal} />

            <div className="grid gap-0 sm:gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 p-10 px-5 sm:px-15 md:px-30 lg:px-40">
                <div className="border-2 w-full rounded-lg flex justify-center overflow-hidden h-96">
                    {/* Display the product image */}
                    <img className="object-cover" src={item?.imageUrl} alt={item?.title} />
                </div>
                <div className="flex flex-col relative w-full">
                    {/* Display product details */}
                    <p className="p-1 pl-0 text-2xl font-bold">₹ {item?.price}</p>
                    <p className="p-1 pl-0 text-base">{item?.category}</p>
                    <p className="p-1 pl-0 text-xl font-bold">{item?.title}</p>
                    <p className="p-1 pl-0 sm:pb-0 break-words text-ellipsis overflow-hidden w-full">
                        {item?.description}
                    </p>
                    <div className="w-full relative sm:relative md:absolute bottom-0 flex justify-between">
                        <p className="p-1 pl-0 font-bold">Seller: {item?.userName}</p>
                        <p className="p-1 pl-0 text-sm">{item?.createdAt}</p>
                    </div>
                </div>
            </div>

            <SellItemModal setItems={(itemsCtx as contextType).setItems} toggleModal={toggleModalSell} status={openModalSell} />
        </div>
    );
};

export default Details;
