import React from 'react';
import PropTypes from 'prop-types';

const MemberCard = ({ name, position, imageUrl, label = 'DINAS' }) => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-red-900 to-red-950 shadow-xl hover:shadow-2xl transition-all duration-300 w-[200px] group">
      <div className="relative h-[280px] w-full overflow-hidden">
        <div className="absolute inset-2 bg-gradient-to-br from-red-800 to-red-900 rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={`${name} - ${position}`}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </div>
        {/* Label dinamyc di pojok */}
        <div className="absolute top-4 right-4 bg-red-700 px-2 py-1 rounded text-xs font-bold text-white">
          {label}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-red-950 via-red-900/90 to-transparent pt-8">
        <h3 className="text-lg font-bold tracking-wide">{name}</h3>
        <p className="text-sm font-medium text-red-200">{position}</p>
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