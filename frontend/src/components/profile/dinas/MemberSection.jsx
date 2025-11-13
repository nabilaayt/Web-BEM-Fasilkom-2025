import React from 'react';
import PropTypes from 'prop-types';
import MemberCard from './MemberCard';

const MemberSection = ({ title, members, dinasLabel = 'DINAS' }) => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-8">
        {title}
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {members.map((member) => (
          <MemberCard
            key={member.uuid}
            name={member.nama}
            position={member.divisi}
            imageUrl={member.url}
            label={dinasLabel}
          />
        ))}
      </div>
    </div>
  );
};

MemberSection.propTypes = {
  title: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      nama: PropTypes.string.isRequired,
      divisi: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  dinasLabel: PropTypes.string,
};

export default MemberSection;