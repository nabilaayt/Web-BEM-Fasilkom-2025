import { Link } from 'react-router-dom';
import { MdEmail, MdPhone, MdLocationOn, MdCopyright } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & Deskripsi */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">BEM</span>
            </div>
            <span className="text-lg font-bold text-white">
              Fasilkom UNSRI
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Badan Eksekutif Mahasiswa Fakultas Ilmu Komputer Universitas Sriwijaya.
            Bersama, kita wujudkan BEM yang progresif dan kolaboratif.
          </p>
        </div>

        {/* Link Navigasi */}
        <div>
          <h4 className="font-semibold text-white mb-4">Navigasi</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-400 transition-colors">
                Beranda
              </Link>
            </li>
            <li>
              <Link to="/berita" className="hover:text-blue-400 transition-colors">
                Berita
              </Link>
            </li>
            <li>
              <Link to="/dinas" className="hover:text-blue-400 transition-colors">
                Dinas & Bidang
              </Link>
            </li>
            <li>
              <Link to="/tentang" className="hover:text-blue-400 transition-colors">
                Tentang Kami
              </Link>
            </li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h4 className="font-semibold text-white mb-4">Kontak</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <MdLocationOn className="text-blue-500" />
              <span>Fakultas Ilmu Komputer, UNSRI Indralaya</span>
            </li>
            <li className="flex items-center gap-2">
              <MdEmail className="text-blue-500" />
              <span>bemfasilkomunsri@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MdPhone className="text-blue-500" />
              <span>+62 812-3456-7890</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 mt-10 pt-4 text-center text-gray-500 text-sm">
        <div className="flex items-center justify-center gap-1">
          <MdCopyright />
          <span>
            {new Date().getFullYear()} BEM Fasilkom UNSRI. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
