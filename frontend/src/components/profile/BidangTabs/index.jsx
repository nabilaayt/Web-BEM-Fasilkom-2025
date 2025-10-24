import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BidangTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const bidangTabs = [
    { name: 'Inti', path: '/profile', shortName: 'Inti' },
    { name: 'Kerumahtanggaan', path: '/profile/kerumahtanggaan', shortName: 'Kerumahtanggaan' },
    { name: 'Sosial Politik', path: '/profile/sosial-politik', shortName: 'Sospol' },
    { name: 'Relasi', path: '/profile/relasi', shortName: 'Relasi' },
    { name: 'Media & Teknologi', path: '/profile/media-teknologi', shortName: 'Medtek' },
    { name: 'Minbat', path: '/profile/minbat', shortName: 'Minbat' },
  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Faces of Artha Darma</h1>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {bidangTabs.map((tab) => (
            <button
              key={tab.path}
              onClick={() => handleTabClick(tab.path)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                isActive(tab.path)
                  ? 'bg-red-900 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              {tab.shortName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BidangTabs;
