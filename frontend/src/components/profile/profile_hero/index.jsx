import React from 'react';
import './Style.css';

/**
 * ProfileHero
 * A clean, responsive hero used at the top of each bidang page.
 * Props:
 * - titleMain: small leading text
 * - cabinetName: main large title
 * - description: paragraph
 * - images: optional array of image URLs (currently not used)
 */
const ProfileHero = ({
  titleMain = 'A warm welcome from the',
  cabinetName = 'KABINET ARTHA DARMA',
  description = 'Kami hadir membawa semangat baru untuk berkontribusi, bergerak, dan menginspirasi civitas akademika Fasilkom UNSRI.',
  images = [],
}) => {
  // placeholderBoxes defines sizes to mimic the mosaic in the provided design
  const placeholderBoxes = [
    'h-28 w-20', 'h-20 w-16', 'h-24 w-20', 'h-28 w-24', 'h-20 w-16', 'h-28 w-20', 'h-24 w-20', 'h-28 w-20', 'h-20 w-16'
  ];

  return (
    <section className="profile-hero bg-gradient-to-b from-white to-rose-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* mosaic row */}
        <div className="flex justify-center items-end gap-4 mb-8 md:mb-12 flex-wrap">
          {placeholderBoxes.map((sz, idx) => (
            <div
              key={idx}
              className={`${sz} bg-gray-100 rounded-xl shadow-sm overflow-hidden flex items-center justify-center`}>
              {/* empty placeholder: user will add images later */}
            </div>
          ))}
        </div>

        {/* main text */}
        <div className="text-center max-w-4xl mx-auto py-6 md:py-10">
          <p className="text-lg text-gray-600 mb-4">{titleMain}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-rose-800 mb-3">
            {cabinetName}
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileHero;
