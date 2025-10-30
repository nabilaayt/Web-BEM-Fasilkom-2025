import React from 'react';
import PropTypes from 'prop-types';

const MemberCard = ({ name, position, imageUrl, label = 'DINAS' }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-[200px] group">
      {/* Pure Image Display - no background, no text overlay */}
      <div className="relative h-[280px] w-full overflow-hidden rounded-lg">
        <img
          src={imageUrl}
          alt={`${name} - ${position}`}
          className="w-full h-full object-cover"
        />
        
        {/* Optional: Subtle hover effect overlay */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>
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