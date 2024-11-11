import logo from '../../assets/symbol.png';
import search from '../../assets/search.svg';
import arrow from '../../assets/arrow-down.svg';
import search1 from '../../assets/search1.svg';
import sellButton from '../../assets/addButton.png';
import './Navbar.css';
import { useEffect, useState } from 'react';
import Locations from '../Locations/Locations';
import { userAuth, AuthContextType } from '../Context/Auth';
 

interface LoginProps {
    toggleModal: () => void;
    toggleModalSell: () => void;
}

const Navbar = (props: LoginProps) => {
    const { toggleModal, toggleModalSell } = props;

    const [rotate, setRotate] = useState<Boolean>(false);

    const [style, setStyle] = useState<React.CSSProperties>({
        transform: 'rotate(0deg)',
        transition: '1s'
    });

    const handleRotate = () => {
        setRotate(!rotate);
    };

    useEffect(() => {
        if (rotate) {
            setStyle({
                transform: 'rotate(180deg)',
                transition: '.3s'
            });
        } else {
            setStyle({
                transform: 'rotate(0deg)',
                transition: '.3s'
            });
        }
    }, [rotate]);

    const [input, setInput] = useState<string>('');

    let auth: AuthContextType | null = userAuth();
    console.log(auth?.user);

    return (
        <>
            <nav className="fixed z-50 w-full overflow-auto p-2 pl-3 pr-3 shadow-md bg-slate-100 border-b-4 border-solid border-b-white">
                <img src={logo} alt="" className='w-12 ' />
                <div className='relative location-search  ml-5'>
                    <img src={search} alt="" className='absolute top-4 left-2 w-5' />
                    <input value={input} onChange={(event) => { setInput(event.target.value); }} placeholder='Search city, area, or locality...' className='w-[50px] sm:w-[150px] md:w-[250] lg:w-[270px] p-3 pl-8 pr-8 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300' type="text" />
                    <img onClick={handleRotate} style={style} src={arrow} alt="" className='absolute top-4 right-3 w-5 cursor-pointer' />
                </div>

                <div className="ml-5 mr-2 relative w-full main-search">
                    <input placeholder='Find Cars, Mobile Phones, and More...' className='w-full p-3 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300' type="text" />
                    <div style={{ backgroundColor: '#002f34' }} className="flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12">
                        <img className="w-5 filter invert" src={search1} alt="Search Icon" />
                    </div>
                </div>

                <div className="mx-1 sm:ml-5 sm:mr-5 relative lang">
                    <p style={{ color: '#002f34' }} className="font-bold mr-3" >English</p>
                    <img src={arrow} alt="" className='w-5 cursor-pointer' />
                </div>
                {!auth?.user && <p onClick={auth?.user ? toggleModalSell : toggleModal} style={{ color: '#002f34' }} className="font-bold underline ml-5 cursor-pointer">Login</p>}

                {auth?.user && <p onClick={auth.logout} style={{ color: '#002f34' }} className="font-bold ml-5 cursor-pointer">{auth.user.displayName?.split(' ')[0]}</p>}
                <img src={sellButton} onClick={auth?.user ? toggleModalSell : toggleModal} alt="" className="w-24 mx-1 sm:ml-5 sm:mr-5 shadow-xl rounded-full cursor-pointer" />
            </nav>

            {rotate && <div className='locations fixed z-50 top-16 left-20 pt-4 pb-4 rounded-md bg-white shadow-xl h-[315px] w-[270px] overflow-x-hidden overflow-auto'>
                <p className='text-xs text-gray-500 uppercase p-4 pb-0 pt-2'>Popular locations</p>
                <div className='list-none p-0 pb-0'>
                    <Locations setInput={setInput} text='Kerala' />
                    <Locations setInput={setInput} text='Delhi' />
                    <Locations setInput={setInput} text='Mumbai' />
                    <Locations setInput={setInput} text='Bangalore' />
                    <Locations setInput={setInput} text='Rajasthan' />
                </div>
            </div>}

            <div className="w-full relative z-0 flex shadow-md p-2 pt-20 pl-10 pr-10 sm:pl-44 md:pr-44 sub-lists">
                <ul className="list-none flex items-center justify-between w-full">
                    <div className="flex flex-shrink-0">
                        <p className="font-semibold uppercase all-cats">All categories</p>
                        <img src={arrow} alt="" className="w-4 ml-2" />
                    </div>
                    <li>Cars</li>
                    <li>Motorcycles</li>
                    <li>Mobile Phones</li>
                    <li>For sale : Houses & Apartments</li>
                    <li>Scooter</li>
                    <li>Commercial & Other Vehicles</li>
                    <li>For rent : Houses & Apartments</li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;