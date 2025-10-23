import React from 'react';
import DinasProfile from '../components/profile/dinas/DinasProfile';

const DinasProfilePage = () => {
  // The `DinasProfile` component now fetches bidang/kategori and members itself.
  // This page acts as a thin wrapper to render that component.
  return <DinasProfile />;
};

export default DinasProfilePage;