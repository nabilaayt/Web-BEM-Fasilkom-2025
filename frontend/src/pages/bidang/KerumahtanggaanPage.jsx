import React, { useEffect, useState } from 'react';
import MemberCard from '../../components/profile/dinas/MemberCard';
import ProfileHero from '../../components/profile/profile_hero';
import BidangTabs from '../../components/profile/BidangTabs';
import DinasLogo from '../../components/profile/DinasLogo';
import StaffCarousel from '../../components/profile/StaffCarousel';
import dinasService from '../../services/dinasService';
import { orderMembers } from '../../utils/memberOrdering';

const KerumahtanggaanPage = () => {
  const [koorbidMembers, setKoorbidMembers] = useState([]);
  const [dinasList, setDinasList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKerumahtanggaanData = async () => {
      try {
        // Fetch all bidang to find Kerumahtanggaan
        const bidangList = await dinasService.getAllBidang();
        const kerumahtanggaanBidang = bidangList.find(bidang => 
          bidang.nama_bidang.toLowerCase().includes('kerumahtanggaan') ||
          bidang.nama_bidang.toLowerCase().includes('rumah tangga')
        );

        if (kerumahtanggaanBidang) {
          // Fetch all kategori dinas for Kerumahtanggaan bidang
          const kategoriList = await dinasService.getAllKategoriDinas();
          const kerumahtanggaanKategoris = kategoriList.filter(k => k.bidangId === kerumahtanggaanBidang.id);
          
          // Separate KoorBid and Dinas
          const koorbidKategoris = kerumahtanggaanKategoris.filter(k => 
            k.nama_dinas.toLowerCase().includes('koorbid')
          );
          const dinasKategoris = kerumahtanggaanKategoris.filter(k => 
            !k.nama_dinas.toLowerCase().includes('koorbid')
          );

          // Fetch KoorBid members
          const koorbidMembers = [];
          for (const kategori of koorbidKategoris) {
            const members = await dinasService.getDinasMembers(kategori.id);
            koorbidMembers.push(...(members || []));
          }
          setKoorbidMembers(koorbidMembers);

          // Fetch Dinas data with their members
          const dinasData = [];
          for (const kategori of dinasKategoris) {
            const members = await dinasService.getDinasMembers(kategori.id);
            const bphMembers = (members || []).filter(m => m.jabatan?.toLowerCase() === 'bph');
            const staffMembers = (members || []).filter(m => m.jabatan?.toLowerCase() === 'staff');
            
            dinasData.push({
              ...kategori,
              bph: orderMembers(bphMembers),
              staff: orderMembers(staffMembers)
            });
          }
          setDinasList(dinasData);
        }
      } catch (error) {
        console.error('Error fetching Kerumahtanggaan data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKerumahtanggaanData();
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
    <div className="min-h-screen bg-white">
      {/* Default shared Profile Hero */}
      <ProfileHero />

      {/* Bidang Tabs Navigation */}
      <BidangTabs />

      {/* Page-specific header */}
      <div className="py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Bidang Kerumahtanggaan</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Bidang yang bertanggung jawab dalam pengelolaan administrasi, keuangan, dan operasional sehari-hari untuk mendukung kelancaran kegiatan BEM KM Fasilkom UNSRI.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Koordinator Bidang Section */}
        {koorbidMembers.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Koordinator Bidang</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Pimpinan yang mengkoordinasikan seluruh kegiatan di bidang Kerumahtanggaan
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {koorbidMembers.map((member) => (
                <MemberCard
                  key={member.uuid}
                  name={member.nama}
                  position={member.divisi}
                  imageUrl={member.url}
                  label="KORBID"
                />
              ))}
            </div>
          </div>
        )}

        {/* Dinas Sections */}
        {dinasList.map((dinas) => (
          <div key={dinas.id} className="mb-16">
            {/* Dinas Header */}
            <div className="text-center mb-12">
              {/* Dinas Logo */}
              <DinasLogo dinasName={dinas.nama_dinas} />
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Dinas {dinas.nama_dinas}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {dinas.nama_dinas && dinas.nama_dinas.toLowerCase() === 'ppsdm' 
                  ? 'Dinas PPSDM berperan dalam menumbuhkan rasa kekeluargaan, memanajemen sumber daya manusia serta bertanggung jawab atas kaderisasi pada seluruh elemen BEM KM Fasilkom Unsri.'
                  : dinas.nama_dinas && dinas.nama_dinas.toLowerCase() === 'administrasi'
                  ? 'Dinas Administrasi merupakan dinas yang bertanggung jawab dalam mengelola surat menyurat terkait administrasi pada bidang kesekretariatan, serta alur keuangan internal BEM KM Fasilkom Unsri.'
                  : `Deskripsi untuk Dinas ${dinas.nama_dinas}`
                }
              </p>
            </div>

            {/* BPH Section */}
            {dinas.bph.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">
                  Badan Pengurus Harian (BPH)
                </h3>
                <div className="flex flex-wrap justify-center gap-6">
                  {dinas.bph.map((member) => (
                    <MemberCard
                      key={member.uuid}
                      name={member.nama}
                      position={member.divisi}
                      imageUrl={member.url}
                      label={dinas.nama_dinas.toUpperCase().substring(0, 6)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Staff Section */}
            {dinas.staff.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">
                  Staff
                </h3>
                <StaffCarousel staff={dinas.staff} dinasName={dinas.nama_dinas} />
              </div>
            )}
          </div>
        ))}

        {koorbidMembers.length === 0 && dinasList.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Belum ada data untuk bidang Kerumahtanggaan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KerumahtanggaanPage;
