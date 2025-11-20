import React from 'react';
import PropTypes from 'prop-types';

const MemberCard = ({ name, position, imageUrl, label = 'DINAS' }) => {
  return (
    <div className="relative rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 w-[140px] md:w-[200px]">
      {/* Pure Image Display - preserve original aspect ratio */}
      <div className="relative w-full rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={`${name} - ${position}`}
          className="w-full h-auto object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

MemberCard.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default MemberCard;