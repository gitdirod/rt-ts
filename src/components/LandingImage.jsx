import { useEffect, useState } from 'react';
import useStore from '/src/hooks/useStore';
import IsLoading from './IsLoading';
import { DEVICE_TYPES } from '/src/data/deviceTypes';


export default function LandingImage(){
    const { landings } = useStore();

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
          setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const renderImageBySize = () => {
        if (!landings) return '';  // Important! Check if landings exist

        const { mobile, tablet, desktop } = landings;  // Desestructure here, inside the function

        if (windowSize[0] < DEVICE_TYPES.MOBILE.maxWidth) {
            return mobile?.name;
        } else if (windowSize[0] < DEVICE_TYPES.TABLET.maxWidth) {
            return tablet?.name;
        } else {
            return desktop?.name;
        }
    };

    const imageUrl = import.meta.env.VITE_API_URL + "/landings/" + renderImageBySize();

    return (
        <>
            {landings ? (
                <div className="w-full">
                    <img src={imageUrl} alt="Responsive Banner" />
                </div>
            ) : (
                <IsLoading />
            )}
        </>
    );
}