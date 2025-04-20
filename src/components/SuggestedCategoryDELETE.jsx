import Product from "./store/product/Product"
import TittleName from "./TittleName";
import useStore from "/src/hooks/useStore"

import React, { useState, useEffect } from 'react';


export default function SuggestedCategory() {
  const {categories }= useStore()
  
  return (
    <div className="flex flex-col w-full gap-x-4">
      <div className="center-r text-xl  md:text-4xl pt-8 font-poppins-extrabold ">
        <span className=" text-white bg-slate-700 px-4 py-2 rounded-lg">Categorías sugeridas</span> 
      </div>
        {categories?.map(cat => cat?.suggested == true && (
          <ShowCategory
            category={cat}
            key={cat.id}
          />
        ))}
    </div>
  )
}




const ShowCategory=({category})=>{


  const{
    products
  }= useStore()
  
  const[ productsCategory, setProductsCategory] = useState([])


  useEffect(()=>{
    const productsToShow = products?.filter(pro=> pro?.category?.id == category.id && category?.suggested == true)
    setProductsCategory(productsToShow)
  },[category, products])

  return(
  <div className="flex flex-col gap-4 ">
    <TittleName
      font="text-2xl"
    >
      {category?.name}
    </TittleName>
    <Carousel 
      items={
        productsCategory?.map(pro=>
          <Product
              product={pro}
          />
        )
      }    
    />
  </div>
)
}



const Carousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleItems = 5;
    const itemWidth = 250;  // Asume un ancho fijo en píxeles para cada elemento. Ajusta según sea necesario.

    useEffect(() => {
      const autoScroll = setInterval(() => {
        handleNext();
      }, 4000);

      return () => clearInterval(autoScroll);
    }, [currentIndex]);
  
    const handlePrev = () => {
      if (currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    };
  
    const handleNext = () => {
      if (currentIndex + visibleItems < items.length) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setCurrentIndex(0);  // Regresa al inicio cuando llega al final
      }
    };
  
    return (
      <div className="relative overflow-hidden   " >
        <button onClick={handlePrev} className="absolute top-1/2 left-0 z-10 transform -translate-y-1/2 bg-opacity-80 bg-cyanDark text-white p-3 rounded-r-lg focus:outline-none">←</button>
        <div className="flex gap-x-4 transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * itemWidth}px)` }}>
          {items.map((item, index) => (
            <div key={index} className="flex justify-center items-center">
              {item}
            </div>
          ))}
        </div>
        <button onClick={handleNext} className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 bg-opacity-80 bg-cyanDark text-white p-3 rounded-l-lg focus:outline-none">→</button>
      </div>
    );
  };


  

















// const Carousel = ({ items }) => {
//   const [displayItems, setDisplayItems] = useState([...items]);
//   const carouselRef = useRef(null);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       handleNext();
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [displayItems]);

//   const handleNext = () => {
//     setDisplayItems(prev => [...prev.slice(1), prev[0]]);
//   };

//   const handlePrev = () => {
//     setDisplayItems(prev => [prev[prev.length - 1], ...prev.slice(0, -1)]);
//   };

//   const getStyle = () => ({
//     transform: 'translateX(0)',
//     transition: 'transform 0.5s',
//   });

//   return (
//     <div className="flex items-center relative overflow-hidden">
//       <button onClick={handlePrev} className="absolute top-1/2 left-0 z-10 transform -translate-y-1/2 bg-opacity-30 bg-gray-600 text-white p-3 rounded-r-lg focus:outline-none">
//         ←
//       </button>
//       <div className="flex w-full" style={getStyle()} ref={carouselRef}>
//         {displayItems.map((item, index) => (
//           <div key={index} className="w-1/4">
//             {item}
//           </div>
//         ))}
//       </div>
//       <button onClick={handleNext} className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 bg-opacity-30 bg-gray-600 text-white p-3 rounded-l-lg focus:outline-none">
//         →
//       </button>
//     </div>
//   );
// };









  









