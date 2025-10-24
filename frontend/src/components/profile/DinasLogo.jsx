import React from 'react';
import medinfoLogo from '../../Assets/Logo/logo medinfo.png';
import ristekLogo from '../../Assets/Logo/logo ristek.png';
import admLogo from '../../Assets/Logo/logo adm.png';
import ppsdmLogo from '../../Assets/Logo/logo ppsdm.png';

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
    // Add more mappings as needed for other dinas
    // if (lowerName.includes('ristek')) {
    //   return ristekLogo;
    // }
    
    return null;
  };

  const logo = getLogo(dinasName);

  if (!logo) {
    return null;
  }

  return (
    <div className={`flex justify-center mb-4 ${className}`}>
      <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center shadow-md">
        <img 
          src={logo} 
          alt={`Logo ${dinasName}`}
          className="w-30 h-30 object-contain"
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
