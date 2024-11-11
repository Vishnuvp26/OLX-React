import { Modal, ModalBody } from "flowbite-react";
import { ChangeEvent, useState } from "react";
import close from '../../assets/close.svg';
import fileUpload from '../../assets/fileUpload.svg';
import loading from '../../assets/loading.gif';
import Input from "../Input/Input";
import { AuthContextType, userAuth } from "../Context/Auth";
import { fetchFromFirestore, firestore } from "../Firebase/Firebase";
import { addDoc, collection } from "firebase/firestore";
import { ItemType } from "../Pages/Home/Home";
import toast, { Toaster } from 'react-hot-toast';

interface SellProps {
    toggleModal: () => void;
    status: boolean;
    setItems: React.Dispatch<React.SetStateAction<ItemType[] | null>>
}

const Sell = (props: SellProps) => {
    const { toggleModal, status, setItems } = props;

    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);

    let [submiting, setSubmiting] = useState<boolean>(false);

    let handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) setImage(event.target.files[0]);
    };

    let auth: AuthContextType | null = userAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        if (!auth?.user) {
            alert('Please login to continue');
            return;
        }
    
        setSubmiting(true);
    
        const readImageAsDataURL = (file: File): Promise<string> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const imageUrl = reader.result as string;
                    localStorage.setItem(`image_${file.name}`, imageUrl);
                    resolve(imageUrl);
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        };
    
        let imageUrl = '';
        if (image) {
            try {
                imageUrl = await readImageAsDataURL(image);
            } catch (error) {
                alert("Failed to read image.");
                setSubmiting(false);
                return;
            }
        }

        const trimmedTitle = title.trim();
        const trimmedCategory = category.trim();
        const trimmedPrice = price.trim();
        const trimmedDescription = description.trim();

        if (!trimmedTitle || !trimmedCategory || !trimmedPrice || !trimmedDescription) {
            toast.error('All fields are required!');
            setSubmiting(false);
            return;
        }

    
        try {
            await addDoc(collection(firestore, 'products'), {
                title,
                category,
                price,
                description,
                imageUrl,
                userId: auth.user.uid,
                userName: auth.user.displayName || 'Anonymous',
                createdAt: new Date().toDateString(),
            });
    
            setImage(null);
            const datas: ItemType[] = await fetchFromFirestore();
            setItems(datas);
            toggleModal();
        } catch (error) {
            alert("Failed to add item to Firestore.");
        } finally {
            setSubmiting(false);
        }
    };
    

    return (
        <Modal theme={{
            "content": {
                "base": "relative w-full p-4 md:h-auto",
                "inner": "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700"
            },
        }
        } onClick={toggleModal} className="bg-black" position={'center'} show={status} size="md" popup={true}>
            <ModalBody className="bg-white h-96 p-0 rounded-md" onClick={(event) => event.stopPropagation()}>
                <img onClick={() => {
                    toggleModal();
                    setImage(null);
                }} className="w-6 absolute z-10 top-6 right-8 cursor-pointer" src={close} alt="" />
                <div className="p-6 pl-8 pr-8 pb-8">
                    <p className="font-bold text-lg mb-3">Sell Item</p>
                    <form onSubmit={handleSubmit}>

                        <Input setInput={setTitle} placeholder="Title" />
                        <Input setInput={setCategory} placeholder="Category" />
                        <Input setInput={setPrice} placeholder="Price" />
                        <Input setInput={setDescription} placeholder="Description" />

                        <div className="pt-2 w-full relative">
                            {
                                image ?
                                    <div className="relative h-40 sm:h-60 w-full flex justify-center border-2 border-black border-solid rounded-md overflow-hidden">
                                        <img className="object-contain" src={URL.createObjectURL(image)} alt="" />
                                    </div>
                                    :
                                    <div className="relative h-40 sm:h-60 w-full border-2 border-black border-solid rounded-md">
                                        <input onChange={handleImageUpload} type="file" className="abolute inset-10 h-full w-full opacity-0 cursor-pointer z-30" required />
                                        <div className="absolute in top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
                                            <img className="w-12" src={fileUpload} alt="" />
                                            <p className="text-center text-sm pt-2">Click to upload images</p>
                                            <p className="text-center text-sm pt-2">SVG, PNG, JPG</p>
                                        </div>
                                    </div>
                            }
                        </div>

                        {
                            submiting ?
                                <div className="w-full flex h-14 justify-center pt-4 pb-2">
                                    <img className="w-32 object-cover" src={loading} alt="" />
                                </div>
                                :
                                <div className="w-full pt-2">
                                    <button style={{ backgroundColor: '#002f34' }} className="w-full p-3 rounded-lg text-white">Sell Item</button>
                                </div>
                        }
                    </form>
                    <Toaster position="top-right" reverseOrder={false}/>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default Sell;