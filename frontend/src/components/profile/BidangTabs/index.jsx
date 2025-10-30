import React from 'react';

const BidangTabs = ({ activeBidang = 'inti', onBidangChange }) => {
  const bidangTabs = [
    { name: 'Inti', slug: 'inti', shortName: 'Inti' },
    { name: 'Kerumahtanggaan', slug: 'kerumahtanggaan', shortName: 'Kerumahtanggaan' },
    { name: 'Sosial Politik', slug: 'sosial-politik', shortName: 'Sospol' },
    { name: 'Relasi', slug: 'relasi', shortName: 'Relasi' },
    { name: 'Media & Teknologi', slug: 'media-teknologi', shortName: 'Medtek' },
    { name: 'Minbat', slug: 'minbat', shortName: 'Minbat' },
  ];

  const handleTabClick = (slug) => {
    if (onBidangChange) {
      onBidangChange(slug);
    }
  };

  return (
    <div className="bg-white py-6">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Faces of <span className="text-[#4A0000]">Artha Darma</span>
          </h1>
        </div>

        {/* Navbar-style text links */}
        <nav aria-label="Bidang navigation" className="mb-6">
          <ul className="flex justify-center items-center gap-10 flex-wrap">
            {bidangTabs.map((tab) => {
              const isActive = activeBidang === tab.slug;
              return (
                <li key={tab.slug}>
                  <button
                    onClick={() => handleTabClick(tab.slug)}
                    className={`text-base transition-colors duration-150 cursor-pointer ${
                      isActive ? 'font-bold' : 'font-medium text-gray-700 hover:text-gray-900'
                    }`}
                    style={isActive ? { color: '#4A0000' } : undefined}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {tab.shortName}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BidangTabs;