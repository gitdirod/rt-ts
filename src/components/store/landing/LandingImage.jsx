import { useEffect, useState } from 'react';
// import useStore from '/src/hooks/useStore';

import { DEVICE_TYPES } from '/src/data/deviceTypes';
import IsLoading from '../common/IsLoading';
import { LandingService } from '/src/services/LandingService';
import BACKEND from '/src/data/backend';


export default function LandingImage(){

    const {data:landings} =LandingService.useAllLandings(true)
    

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
        console.log(desktop)
        if (windowSize[0] < DEVICE_TYPES[0].maxWidth) {
            return mobile?.name;
        } else if (windowSize[0] < DEVICE_TYPES[1].maxWidth) {
            return tablet?.name;
        } else {
            return desktop?.name;
        }
    };

    const imageUrl = BACKEND.LANDINGS_STORAGE.URL + renderImageBySize();

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