import React from 'react';
import medinfoLogo from '../../../Assets/Logo/logo medinfo.png';
import ristekLogo from '../../../Assets/Logo/logo ristek.png';
import admLogo from '../../../Assets/Logo/logo adm.png';
import ppsdmLogo from '../../../Assets/Logo/logo ppsdm.png';
import olahragaLogo from '../../../Assets/Logo/logo olahraga.png';
import senbudLogo from '../../../Assets/Logo/logo senbud.png';
import hubeksLogo from '../../../Assets/Logo/logo hubeks.png';
import hunterLogo from '../../../Assets/Logo/logo hunter.png';
import kastratLogo from '../../../Assets/Logo/logo kastrat.png';
import adperLogo from '../../../Assets/Logo/logo adper.png';
import sosmaslingLogo from '../../../Assets/Logo/logo sosmasling.png';
import bismitLogo from '../../../Assets/Logo/logo bismit.png';

const DinasLogo = ({ dinasName, className = "" }) => {
  // Function to get logo based on dinas name
  const getLogo = (name) => {
    if (!name) return null;
    
    const lowerName = name.toLowerCase();
    
    // Map dinas names to their logo imports
    if (lowerName.includes('medinfo')) {
      return medinfoLogo;
    }

    if (lowerName.includes('ristek')) {
      return ristekLogo;
    }

    if (lowerName.includes('adm')) {
      return admLogo;
    }

    if (lowerName.includes('ppsdm')) {
      return ppsdmLogo;
    }

    if (lowerName.includes('hunter')) {
      return hunterLogo;
    }

    if (lowerName.includes('hubeks')) {
      return hubeksLogo;
    }

    if (lowerName.includes('senbud') || lowerName.includes('seni')) {
      return senbudLogo;
    }

    if (lowerName.includes('olahraga')) {
      return olahragaLogo;
    }

    if (lowerName.includes('kastrat')) {
      return kastratLogo;
    }

    if (lowerName.includes('adper')) {
      return adperLogo;
    }

    if (lowerName.includes('sosmasling') || lowerName.includes('sosmas')) {
      return sosmaslingLogo;
    }
    
    if (lowerName.includes('bismit')) {
      return bismitLogo;
    }
    return null;
  };

  const logo = getLogo(dinasName);

  if (!logo) {
    return null;
  }

  return (
    <div className={`flex justify-center mb-4 ${className}`}>
      <div className="w-50 h-50 rounded-full bg-gray-100 flex items-center justify-center shadow-md">
        <img 
          src={logo} 
          alt={`Logo ${dinasName}`}
          className="w-40 h-40 object-contain"
          onError={(e) => {
            // Hide the logo container if image fails to load
            e.target.parentElement.parentElement.style.display = 'none';
          }}
        />
      </div>
    </div>
  );
};

export default DinasLogo;
