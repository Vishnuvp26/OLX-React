import Navbar from "../../../components/Navbar/Navbar";
import LoginModal from "../../../components/Modal/Login";
import SellItemModal from "../../../components/Modal/Sell";
import { useEffect, useState } from "react";
import { fetchFromFirestore } from "../../Firebase/Firebase";
import { contextType, itemsContext } from "../../Context/Items";
import Card from "../../Card/Card";

export interface ItemType {
    id: string;
    title: string;
    category: string;
    description: string;
    price: string;
    userName: string;
    createdAt: string;
    imageUrl: string;
}

function Home() {
    let [openModal, setModal] = useState<boolean>(false);
    let [openModalSell, setModalSell] = useState<boolean>(false);
    let itemsCtx: contextType | null = itemsContext();

    const toggleModal = () => setModal(!openModal);
    const toggleModalSell = () => setModalSell(!openModalSell);

    useEffect(() => {
        const getItems = async () => {
            const datas = await fetchFromFirestore();
            itemsCtx?.setItems(datas);
        };
        getItems();
    }, [itemsCtx?.items]);

    return (
        <div>
            <Navbar toggleModalSell={toggleModalSell} toggleModal={toggleModal} />
            <LoginModal toggleModal={toggleModal} status={openModal} />
            <Card items={(itemsCtx as contextType).items || []} />
            <SellItemModal setItems={(itemsCtx as contextType).setItems} toggleModal={toggleModalSell} status={openModalSell} />
        </div>
    );
}

export default Home;
