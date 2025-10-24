import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BidangTabs from '../components/profile/BidangTabs';
import dinasService from '../services/dinasService';

const ProfileOverviewPage = () => {
  const [bidangList, setBidangList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBidangData = async () => {
      try {
        const bidangList = await dinasService.getAllBidang();
        setBidangList(bidangList || []);
      } catch (error) {
        console.error('Error fetching bidang data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBidangData();
  }, []);

  const bidangInfo = {
    'inti': {
      title: 'Bidang Inti',
      description: 'Bertanggung jawab atas kebijakan, koordinasi antarbidang, serta memastikan program kerja berjalan sesuai visi dan misi BEM KM Fasilkom UNSRI.',
      path: '/profile/inti',
      color: 'from-red-900 to-red-800'
    },
    'media': {
      title: 'Media & Teknologi',
      description: 'Mengelola media, teknologi informasi, dan komunikasi digital untuk mendukung seluruh kegiatan BEM KM Fasilkom UNSRI.',
      path: '/profile/media-teknologi',
      color: 'from-blue-900 to-blue-800'
    },
    'kerumahtanggaan': {
      title: 'Kerumahtanggaan',
      description: 'Mengelola administrasi, keuangan, dan operasional sehari-hari untuk mendukung kelancaran kegiatan BEM KM Fasilkom UNSRI.',
      path: '/profile/kerumahtanggaan',
      color: 'from-green-900 to-green-800'
    },
    'sosial': {
      title: 'Sosial Politik',
      description: 'Mengembangkan aspek sosial dan politik mahasiswa, advokasi, serta membangun relasi dengan berbagai pihak.',
      path: '/profile/sosial-politik',
      color: 'from-purple-900 to-purple-800'
    },
    'relasi': {
      title: 'Relasi',
      description: 'Membangun dan memelihara hubungan baik dengan berbagai pihak eksternal, organisasi kemahasiswaan, dan stakeholder lainnya.',
      path: '/profile/relasi',
      color: 'from-orange-900 to-orange-800'
    },
    'minbat': {
      title: 'Minbat',
      description: 'Mengembangkan minat dan bakat mahasiswa, serta mengorganisir berbagai kegiatan ekstrakurikuler dan kompetisi.',
      path: '/profile/minbat',
      color: 'from-teal-900 to-teal-800'
    }
  };

  const getBidangInfo = (bidangName) => {
    const name = bidangName.toLowerCase();
    if (name.includes('inti')) return bidangInfo.inti;
    if (name.includes('media') || name.includes('teknologi')) return bidangInfo.media;
    if (name.includes('kerumahtanggaan') || name.includes('rumah tangga')) return bidangInfo.kerumahtanggaan;
    if (name.includes('sosial') || name.includes('politik')) return bidangInfo.sosial;
    if (name.includes('relasi')) return bidangInfo.relasi;
    if (name.includes('minbat')) return bidangInfo.minbat;
    return {
      title: bidangName,
      description: `Deskripsi untuk ${bidangName}`,
      path: '/profile',
      color: 'from-gray-900 to-gray-800'
    };
  };

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
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Faces of Artha Darma</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Kami hadir membawa semangat baru untuk berkontribusi, bergerak, dan menginspirasi civitas akademika Fasilkom UNSRI.
          </p>
        </div>
      </div>

      {/* Bidang Tabs Navigation */}
      <BidangTabs />

      {/* Welcome Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            A warm welcome from the KABINET ARTHA DARMA
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Pilih bidang kepengurusan yang ingin Anda eksplorasi untuk melihat struktur organisasi dan anggota tim kami.
          </p>
        </div>

        {/* Bidang Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bidangList.map((bidang) => {
            const info = getBidangInfo(bidang.nama_bidang);
            return (
              <Link
                key={bidang.id}
                to={info.path}
                className="group block"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`h-32 bg-gradient-to-r ${info.color} flex items-center justify-center`}>
                    <h3 className="text-white text-xl font-bold text-center px-4">
                      {info.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {info.description}
                    </p>
                    <div className="mt-4 flex items-center text-red-900 font-semibold group-hover:text-red-700">
                      <span>Lihat Detail</span>
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {bidangList.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Belum ada data bidang kepengurusan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileOverviewPage;
