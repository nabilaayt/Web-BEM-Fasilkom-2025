import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DinasProfile from '../components/profile/dinas/DinasProfile';
import dinasService from '../services/dinasService';

const DinasProfilePage = () => {
  const [dinasInfo, setDinasInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { dinasId } = useParams();

  useEffect(() => {
    const fetchDinasInfo = async () => {
      try {
        setLoading(true);
        const info = await dinasService.getDinasInfo(dinasId);
        
        // Siapkan data untuk komponen DinasProfile
        setDinasInfo({
          name: info.nama_dinas,
          logo: '/assets/logo-dinas.png', // Sesuaikan dengan path logo dinas
          description: `Dinas ${info.nama_dinas} merupakan bagian dari bidang ${info.bidang.nama_bidang} yang bertugas untuk mengelola dan mengembangkan aspek-aspek terkait di BEM KM Fasilkom Unsri.`
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDinasInfo();
  }, [dinasId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!dinasInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600 text-center">
          <h2 className="text-2xl font-bold mb-2">Dinas Tidak Ditemukan</h2>
          <p>Maaf, informasi dinas yang Anda cari tidak tersedia.</p>
        </div>
      </div>
    );
  }

  return <DinasProfile dinasData={dinasInfo} />;
};

export default DinasProfilePage;