import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MemberCard from '../../components/profile/dinas/MemberCard';
import ProfileHero from '../../components/profile/profile_hero';
import BidangTabs from '../../components/profile/BidangTabs';
import dinasService from '../../services/dinasService';

const IntiPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIntiMembers = async () => {
      try {
        // Fetch all bidang first to find Inti bidang
        const bidangList = await dinasService.getAllBidang();
        const intiBidang = bidangList.find(bidang => 
          bidang.nama_bidang.toLowerCase().includes('inti')
        );

        if (intiBidang) {
          // Fetch all kategori dinas for Inti bidang
          const kategoriList = await dinasService.getAllKategoriDinas();
          const intiKategoris = kategoriList.filter(k => k.bidangId === intiBidang.id);
          
          // Fetch members for all Inti dinas
          const allMembers = [];
          for (const kategori of intiKategoris) {
            const members = await dinasService.getDinasMembers(kategori.id);
            allMembers.push(...(members || []));
          }
          
          setMembers(allMembers);
        }
      } catch (error) {
        console.error('Error fetching Inti members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIntiMembers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      {/* Default shared Profile Hero */}
      <ProfileHero />

      {/* Bidang Tabs Navigation */}
      <BidangTabs />

      {/* Page-specific header */}
      <div className="py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Bidang Inti</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Inti bertanggung jawab atas kebijakan, koordinasi antarbidang, serta memastikan program kerja berjalan sesuai visi dan misi BEM KM Fasilkom UNSRI.
          </p>
        </div>
      </div>

      {/* Members Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Struktur Kepengurusan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tim inti yang memimpin dan mengkoordinasikan seluruh kegiatan BEM KM Fasilkom UNSRI
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {members.map((member) => (
            <MemberCard
              key={member.uuid}
              name={member.nama}
              position={member.divisi}
              imageUrl={member.url}
              label="INTI"
            />
          ))}
        </div>

        {members.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Belum ada data anggota untuk bidang Inti</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntiPage;
