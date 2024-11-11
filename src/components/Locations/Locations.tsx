import { useRef } from "react";
import location from '../../assets/location.svg';

interface Location {
    setInput:React.Dispatch<React.SetStateAction<string>>;
    text:string
}

const Locations = ({ setInput, text }: Location) => {
    
    const listRef = useRef<HTMLLIElement>(null);

    const handleInput = () => {
        setInput(listRef.current?.innerHTML as string);
    };

    return (
        <div onClick={handleInput} className='flex items-center p-1 pl-3 pr-3 mt-5 mb-5 hover:bg-teal-200'>
            <img className='w-8' src={location} alt="" />
            <li ref={listRef} className='ml-1 text-sm'>{text}</li>
        </div>
    );
};

export default Locations;