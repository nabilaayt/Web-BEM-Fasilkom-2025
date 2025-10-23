import React, { useEffect, useState } from 'react';
import MemberSection from './MemberSection';
import dinasService from '../../../services/dinasService';

const DinasProfile = () => {
  const [bidangList, setBidangList] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);
  const [selectedBidang, setSelectedBidang] = useState(null); // will store bidang.id
  const [selectedDinas, setSelectedDinas] = useState(null); // will store kategori.id
  const [members, setMembers] = useState({ bph: [], staff: [] });

  useEffect(() => {
    // Fetch all bidang and kategori-dinas
    const fetchStructure = async () => {
      try {
        const [bidangRes, kategoriRes] = await Promise.all([
          dinasService.getAllBidang(),
          dinasService.getAllKategoriDinas(),
        ]);

        // Remove duplicates and organize bidangs
        const bidangs = Array.from(new Set(kategoriRes.map(k => k.bidang?.id)))
          .filter(Boolean)
          .map(id => kategoriRes.find(k => k.bidang?.id === id)?.bidang)
          .filter(Boolean);

        const kategoris = kategoriRes || [];
        
        setBidangList(bidangs);
        setKategoriList(kategoris);

        // Default to first bidang and its "Inti" dinas if exists
        if (bidangs.length > 0) {
          setSelectedBidang(bidangs[0].id);
        }
      } catch (err) {
        console.error('Error fetching struktur bidang/kategori:', err);
      }
    };

    fetchStructure();
  }, []);

  // When bidang or kategoriList changes, try select a default dinas (Inti) for the bidang
  useEffect(() => {
    if (!selectedBidang || kategoriList.length === 0) return;

    // kategori model fields: id, nama_dinas, bidangId, slug
    const dinasForBidang = kategoriList.filter(k => k.bidangId === selectedBidang);

    // prefer 'Inti' dinas (case-insensitive match on nama_dinas), fallback to first dinas
    let inti = dinasForBidang.find(d => /inti/i.test(d.nama_dinas || ''));
    if (!inti && dinasForBidang.length > 0) inti = dinasForBidang[0];

    setSelectedDinas(inti ? inti.id : null);
  }, [selectedBidang, kategoriList]);

  // Fetch members when selectedDinas changes
  useEffect(() => {
  if (!selectedDinas) return;

    const fetchMembers = async () => {
      try {
        const members = await dinasService.getDinasMembers(selectedDinas);
        const all = members || [];  // backend returns jabatan enum values 'BPH' or 'Staff'
        const bph = all.filter(m => (m.jabatan || '').toLowerCase() === 'bph');
        const staff = all.filter(m => (m.jabatan || '').toLowerCase() === 'staff');

        setMembers({ bph, staff });
      } catch (err) {
        console.error('Error fetching members for dinas:', err);
        setMembers({ bph: [], staff: [] });
      }
    };

    fetchMembers();
  }, [selectedDinas]);

  // Helpers to resolve display values from objects with unknown key names
  const getBidangLabel = (b) => {
    if (!b) return 'Loading...';
    return b.nama_bidang || b.name || b.nama || String(b);
  };
  const getDinasLabel = (d) => {
    if (!d) return 'Loading...';
    return d.nama_dinas || d.name || d.nama || String(d);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-4 pt-12 pb-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Faces of Artha Darma</h1>
        
        {/* Bidang tabs */}
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          {bidangList.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBidang(b.id)}
              className={`px-4 py-2 rounded transition-colors ${
                b.id === selectedBidang 
                  ? 'bg-red-900 text-white' 
                  : 'bg-white text-gray-700 border hover:bg-gray-50'
              }`}
            >
              {b.nama_bidang}
            </button>
          ))}
        </div>

        {/* Dinas sub-tabs */}
        {selectedBidang && (
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {kategoriList
              .filter(k => k.bidangId === selectedBidang)
              .filter(k => !k.nama_dinas.toLowerCase().startsWith('koorbid'))
              .map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDinas(d.id)}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    d.id === selectedDinas 
                      ? 'bg-red-700 text-white' 
                      : 'bg-white text-gray-700 border hover:bg-gray-50'
                  }`}
                >
                  {d.nama_dinas}
                </button>
              ))}
          </div>
        )}

        {/* Selected dinas header */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold">
            {selectedDinas ? (
              <>
                Dinas {kategoriList.find(k => k.id === selectedDinas)?.nama_dinas}
                <div className="text-lg text-gray-600 mt-2">
                  {bidangList.find(b => b.id === selectedBidang)?.nama_bidang}
                </div>
              </>
            ) : (
              'Pilih Dinas'
            )}
          </h2>
        </div>
      </div>

      {selectedDinas && (
        <>
          <div className="bg-gradient-to-b from-white to-gray-50 py-16">
            <div className="container mx-auto px-4">
              <MemberSection 
                title="Badan Pengurus Harian" 
                members={members.bph} 
                dinasLabel={kategoriList.find(k => k.id === selectedDinas)?.nama_dinas} 
              />
            </div>
          </div>

          <div className="bg-gradient-to-b from-gray-50 to-white py-16">
            <div className="container mx-auto px-4">
              <MemberSection 
                title="Staff" 
                members={members.staff} 
                dinasLabel={kategoriList.find(k => k.id === selectedDinas)?.nama_dinas} 
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DinasProfile;