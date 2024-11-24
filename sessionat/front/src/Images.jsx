import { useState } from "react";

// Import images
import img from "./imgs/img.jpg";
import img2 from "./imgs/img2.jpg";
import img3 from "./imgs/img3.jpg";
import img4 from "./imgs/img4.jpg";
import img5 from "./imgs/img5.jpg";

// Image data
const imageData = [
  { src: img4, alt: "Gallery image 1", caption: "Taken By Alaa" },
  { src: img, alt: "Gallery image 2", caption: "Taken By Rahaf" },
  { src: "https://klinestudios.com/wp-content/uploads/2022/09/Beautiful-newborn-baby-in-basket-photography-for-northampton-and-corby.jpg", alt: "Gallery image 3", caption: "Taken By Alaa" },
  { src: img3, alt: "Gallery image 4", caption: "Taken By Reem" },
  { src: img2, alt: "Gallery image 5", caption: "Taken By Maha" },
  { src: img5, alt: "Gallery image 6", caption: "Taken By Tala" },
];

function ImageCard({ src, alt, caption, isHovered, onMouseEnter, onMouseLeave }) {
  return (
    <div className="image-container relative ml-4 mr-4">
      <img
        className="h-full  rounded-lg transition-transform duration-300 hover:scale-105"
        src={src}
        alt={alt}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      {isHovered && (
        <p className="text-overlay absolute left-0 top-0 p-4 bg-gray-800 bg-opacity-75 text-white font-bold">
          {caption}
        </p>
      )}
    </div>
  );
}

function Images() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 m-8">
      {imageData.map((image, index) => (
        <ImageCard
          key={index}
          src={image.src}
          alt={image.alt}
          caption={image.caption}
          isHovered={hoveredIndex === index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        />
      ))}
    </div>
  );
}

export default Images;
