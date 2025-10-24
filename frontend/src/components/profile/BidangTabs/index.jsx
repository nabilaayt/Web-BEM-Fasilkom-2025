import React from 'react';
import { NavLink } from 'react-router-dom';

const BidangTabs = () => {
  // navigation handled by NavLink; no hooks needed here

  const bidangTabs = [
    { name: 'Inti', path: '/profile', shortName: 'Inti' },
    { name: 'Kerumahtanggaan', path: '/profile/kerumahtanggaan', shortName: 'Kerumahtanggaan' },
    { name: 'Sosial Politik', path: '/profile/sosial-politik', shortName: 'Sospol' },
    { name: 'Relasi', path: '/profile/relasi', shortName: 'Relasi' },
    { name: 'Media & Teknologi', path: '/profile/media-teknologi', shortName: 'Medtek' },
    { name: 'Minbat', path: '/profile/minbat', shortName: 'Minbat' },
  ];

  return (
    <div className="bg-white py-6">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Faces of <span className="text-[#4A0000]">Artha Darma</span></h1>
        </div>

        {/* Navbar-style text links */}
        <nav aria-label="Bidang navigation" className="mb-6">
          <ul className="flex justify-center items-center gap-10 flex-wrap">
            {bidangTabs.map((tab) => (
              <li key={tab.path}>
                <NavLink
                  to={tab.path}
                  end={tab.path === '/profile'} 
                  className={({ isActive }) =>
                    `text-base transition-colors duration-150 ${isActive ? 'font-bold' : 'font-medium text-gray-700 hover:text-gray-900'}`
                  }
                  style={({ isActive }) => (isActive ? { color: '#4A0000' } : undefined)}
                >
                  {tab.shortName}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BidangTabs;