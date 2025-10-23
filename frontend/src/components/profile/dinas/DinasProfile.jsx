import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MemberSection from './MemberSection';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';

const DinasProfile = ({ dinasData }) => {
  const [members, setMembers] = useState({ bph: [], staff: [] });
  const { dinasId } = useParams();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await api.get(`/pengurus-bem/dinas/${dinasId}`);
        const allMembers = response.data;

        // Pisahkan BPH dan Staff
        const bphMembers = allMembers.filter(member => member.jabatan === 'BPH');
        const staffMembers = allMembers.filter(member => member.jabatan === 'Staff');

        setMembers({
          bph: bphMembers,
          staff: staffMembers
        });
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, [dinasId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      {/* Header Dinas */}
      <div className="container mx-auto px-4 pt-16 pb-24 text-center">
        <img
          src={dinasData.logo}
          alt={"Logo " + dinasData.name}
          className="mx-auto w-28 h-28 mb-8"
        />
        <h1 className="text-4xl font-bold mb-6">
          Dinas <span className="text-[#4A0000]">{dinasData.name}</span>
        </h1>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
          {dinasData.description}
        </p>
      </div>

      {/* BPH Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="container mx-auto px-4">
          <MemberSection 
            title={`Badan Pengurus Harian ${dinasData.name}`}
            members={members.bph}
          />
        </div>
      </div>

      {/* Staff Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          <MemberSection 
            title={`Staff ${dinasData.name}`}
            members={members.staff}
          />
        </div>
      </div>
    </div>
  );
};

DinasProfile.propTypes = {
  dinasData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default DinasProfile;