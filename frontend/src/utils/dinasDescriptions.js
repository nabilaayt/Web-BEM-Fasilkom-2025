// Deskripsi untuk setiap dinas di berbagai bidang
// Gunakan keyword matching yang fleksibel untuk mencocokkan nama dinas

export const dinasDescriptions = {
  // Bidang Kerumahtanggaan
  'administrasi': 'Dinas Administrasi merupakan dinas yang bertanggung jawab dalam mengelola surat menyurat terkait administrasi pada bidang kesekretariatan, serta alur keuangan internal BEM KM Fasilkom Unsri.',
  'ppsdm': 'Dinas PPSDM berperan dalam menumbuhkan rasa kekeluargaan, memanajemen sumber daya manusia serta bertanggung jawab atas kaderisasi pada seluruh elemen BEM KM Fasilkom Unsri.',
  
  // Bidang Media & Teknologi
  'medinfo': 'Dinas Medinfo mengelola masuk keluarnya informasi di BEM KM Fasilkom Unsri dalam bentuk media cetak atau elektronik, serta menjadi dinas yang membantu keperluan dinas-dinas lain dalam editing dan publikasi.',
  'ristek': 'Dinas Ristek bertanggung jawab atas riset dan pengolahan data, serta pengembangan teknologi informasi di lingkungan BEM KM Fasilkom Unsri untuk mendukung segala kebutuhan agar memudahkan problem solving yang dilakukan oleh BEM KM Fasilkom Unsri.',
  
  // Bidang Sosial Politik
  'adper': 'Dinas Adper bertanggung jawab sebagai wadah advokasi dan pemberdayaan mahasiswa dengan fokus pada hak-hak perempuan dan kesetaraan gender, serta menyediakan informasi beasiswa untuk mendukung pengembangan mahasiswa, sekaligus menangani kasus diskriminasi dan kekerasan dengan memberikan konseling, serta dukungan psikologis untuk menciptakan lingkungan kampus yang aman dan inklusif.',
  'kastrat': 'Dinas Kastrat bertanggung jawab sebagai mesin penggerak dalam pergerakan mahasiswa Fasilkom Unsri, sebagai bentuk tindakan nyata atas sikap pada isu sosial politik dan memberikan pelayanan tentang permasalahan yang bersentuhan langsung dengan mahasiswa Fasilkom Unsri guna meningkatkan kesejahteraan mahasiswa Fasilkom Unsri.',
  'sosmasling': 'Dinas Sosmasling bertanggung jawab atas isu sosial masyarakat dan lingkungan, serta menjadi pembekal dalam menumbuhkan kepedulian mahasiswa Fasilkom Unsri atas isu-isu tersebut, baik pada lingkup internal kampus maupun eksternal kampus. Masyarakat dan Lingkungan - Fokus pada program pengabdian masyarakat dan kepedulian lingkungan.',
  
  // Bidang Relasi
  'bismit': 'Dinas Bismit berperan dalam menunjang keuangan internal, serta menjalani kemitraan dengan pihak-pihak luar guna memenuhi kebutuhan internal BEM KM Fasilkom Unsri dan mewadahi potensi mahasiswa di bidang kewirausahaan.',
  'hubeks': 'Dinas Hubeks merupakan dinas yang menghubungkan BEM KM Fasilkom Unsri kepada pihak eksternal Fasilkom Unsri, serta menjadi representatif BEM KM Fasilkom Unsri pada masyarakat luas.',
  'hunter': 'Dinas Hunter merupakan dinas yang menghubungkan BEM KM Fasilkom Unsri dengan internal organisasi, termasuk anggota BEM dan mahasiswa Fasilkom Unsri guna menciptakan komunikasi yang baik dan sinergi yang efektif.',
  
  // Bidang Minat & Bakat
  'olahraga': 'Dinas Olahraga merupakan bertanggung jawab untuk melakukan penjaringan, pengembangan, dan penyaluran minat serta bakat mahasiswa Fasilkom Unsri dengan tujuan mengharumkan nama baik KM Fasilkom Unsri, khususnya di bidang Olahraga.',
  'senbud': 'Seni dan Budaya - Mengembangkan dan melestarikan seni budaya melalui berbagai kegiatan kreatif dan pertunjukan.',
  'seni': 'Dinas Seni Budaya bertanggung jawab untuk melakukan penjaringan, pengembangan, dan penyaluran minat serta bakat mahasiswa Fasilkom Unsri dengan tujuan mengharumkan nama baik KM Fasilkom Unsri, khususnya di bidang Seni Budaya.',
  'budaya': 'Dinas Seni Budaya bertanggung jawab untuk melakukan penjaringan, pengembangan, dan penyaluran minat serta bakat mahasiswa Fasilkom Unsri dengan tujuan mengharumkan nama baik KM Fasilkom Unsri, khususnya di bidang Seni Budaya.',
};

/**
 * Mendapatkan deskripsi dinas berdasarkan nama
 * Menggunakan keyword matching yang fleksibel
 */
export function getDinasDescription(dinasName) {
  if (!dinasName) return 'Dinas ini bertanggung jawab atas berbagai program dan kegiatan di lingkungan BEM.';
  
  const normalizedName = dinasName.toLowerCase().trim();
  
  // Exact match first
  if (dinasDescriptions[normalizedName]) {
    return dinasDescriptions[normalizedName];
  }
  
  // Keyword matching
  for (const [key, description] of Object.entries(dinasDescriptions)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return description;
    }
  }
  
  // Default fallback
  return `Dinas ${dinasName} bertanggung jawab atas berbagai program dan kegiatan di lingkungan BEM.`;
}
