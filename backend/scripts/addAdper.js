import db from '../config/Database.js';
import Bidang from '../models/BidangModel.js';
import KategoriDinas from '../models/KategoriDinasModel.js';

async function run() {
  try {
    await db.authenticate();
    console.log('DB connected');

    // Look up the 'sosial-politik' bidang by slug first
    const bidang = await Bidang.findOne({ where: { slug: 'sosial-politik' } });
    if (!bidang) {
      console.error("Bidang with slug 'sosial-politik' not found. Aborting.");
      process.exit(1);
    }

    // Check if kategori with slug 'adper' already exists
    const exists = await KategoriDinas.findOne({ where: { slug: 'adper' } });
    if (exists) {
      console.log("Kategori 'adper' already exists. No changes made.");
      process.exit(0);
    }

    // Create the new kategori
    await KategoriDinas.create({
      slug: 'adper',
      nama_dinas: 'Adper',
      bidangId: bidang.id,
    });

    console.log("Kategori 'adper' created successfully under bidang 'sosial-politik'.");
    process.exit(0);
  } catch (err) {
    console.error('Error creating kategori:', err);
    process.exit(1);
  }
}

run();
