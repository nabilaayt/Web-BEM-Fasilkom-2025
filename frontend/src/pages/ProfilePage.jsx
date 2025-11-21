import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileHero from '../components/profile/profile_hero';
import BidangTabs from '../components/profile/BidangTabs';
import BidangContent from '../components/profile/BidangContent';

const ProfilePage = () => {
  const { bidangSlug } = useParams();
  const navigate = useNavigate();
  const [currentBidang, setCurrentBidang] = useState(bidangSlug || 'inti');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const contentRef = useRef(null);

  // Valid bidang slugs mapping
  const validBidangs = {
    'inti': 'inti',
    'kerumahtanggaan': 'kerumahtanggaan',
    'sosial-politik': 'sosial-politik',
    'relasi': 'relasi',
    'media-teknologi': 'media-teknologi',
    'minbat': 'minbat'
  };

  useEffect(() => {
    // Handle URL param changes
    const slug = bidangSlug || 'inti';
    
    // Validate bidang slug
    if (!validBidangs[slug]) {
      // Invalid slug, redirect to inti
      navigate('/profile', { replace: true });
      return;
    }

    // Smooth transition when URL changes
    if (slug !== currentBidang) {
      setIsTransitioning(true);

      // Only scroll to content section if NOT initial page load
      if (!isInitialLoad && contentRef.current) {
        // Wait a tiny bit for transition to start
        setTimeout(() => {
          const yOffset = -100; // Offset dari top (adjust sesuai navbar height)
          const element = contentRef.current;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }, 100);
      }

      // Small delay for transition effect
      setTimeout(() => {
        setCurrentBidang(slug);
        setIsTransitioning(false);
      }, 300);
    }

    // Mark that initial load is complete
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [bidangSlug, navigate, currentBidang, validBidangs, isInitialLoad]);

  const handleBidangChange = (newBidangSlug) => {
    if (newBidangSlug === currentBidang) return;
    
    // Update URL which will trigger useEffect
    if (newBidangSlug === 'inti') {
      navigate('/profile');
    } else {
      navigate(`/profile/${newBidangSlug}`);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {/* Shared Profile Hero */}
      <ProfileHero />

      {/* Bidang Tabs Navigation */}
      <BidangTabs 
        activeBidang={currentBidang} 
        onBidangChange={handleBidangChange} 
      />

      {/* Dynamic Bidang Content with transition */}
      <div 
        ref={contentRef}
        className={`transition-all duration-300 ${
          isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <BidangContent bidangSlug={currentBidang} />
      </div>
    </div>
  );
};

export default ProfilePage;
