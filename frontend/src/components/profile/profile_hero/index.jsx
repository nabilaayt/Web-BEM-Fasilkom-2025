import React from "react";
import "./Style.css";

// Import local hero images so the bundler resolves their URLs (prevents 404s)
import rect188 from "../images/Rectangle 188.png";
import rect189 from "../images/Rectangle 189.png";
import rect190 from "../images/Rectangle 190.png";
import rect191 from "../images/Rectangle 191.png";
import rect192 from "../images/Rectangle 192.png";
import rect193 from "../images/Rectangle 193.png";
import rect194 from "../images/Rectangle 194.png";
import rect195 from "../images/Rectangle 195.png";
import rect196 from "../images/Rectangle 196.png";
import rect197 from "../images/Rectangle 197.png";
import rect198 from "../images/Rectangle 198.png";
import rect199 from "../images/Rectangle 199.png";
import rect200 from "../images/Rectangle 200.png";

const ProfileHero = ({
  titleMain = "A warm welcome from the",
  cabinetName = "KABINET ARTHA DARMA",
  description = "Kami hadir membawa semangat baru untuk berkontribusi, bergerak, dan menginspirasi civitas akademika Fasilkom UNSRI.",
  images = [],
}) => {
  const defaultImages = [
    rect188,
    rect189,
    rect190,
    rect191,
    rect192,
    rect193,
    rect194,
    rect195,
    rect196,
    rect197,
    rect198,
    rect199,
    rect200,
  ];

  // Normalize incoming `images` prop: allow array of strings or array of objects
  const rawImages = images.length > 0 ? images : defaultImages;
  const normalized = rawImages
    .map((it) => {
      if (!it) return "";
      if (typeof it === "string") return it;
      if (typeof it === "object") {
        return (
          it.url || it.src || it.foto || it.image || it.path || it.link || it.filename || ""
        );
      }
      return "";
    })
    .filter(Boolean);
  const displayImages = normalized.length > 0 ? normalized : defaultImages;

  // Debug: log image sources so we can inspect in browser console
  if (typeof window !== 'undefined') {
    // Use console.debug so it only appears when devtools open
    console.debug('ProfileHero displayImages count:', displayImages.length, displayImages);
    console.log('ProfileHero (ari) loaded — displayImages:', displayImages.length);
  }
  const fallbackImage = 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=600&h=400&fit=crop';

  return (
    <section className="relative bg-gradient-to-b from-rose-50 via-white to-rose-50/30 py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* === Mosaik Gambar Absolute === */}
        <div className="relative w-full max-w-[1600px] h-[380px] mx-auto mb-12">
          {/* Dynamic 9-column mosaic: columns 1,2,8,9 have 2 images (stacked); others have 1 image */}
          {(() => {
            // Increase horizontal gaps and make images larger so the mosaic breathes more
            const cols = [
              { left: 0, w: 160, h: 200, top1: 20, top2: 240, slots: 2 },
              { left: 170, w: 160, h: 200, top1: 0, top2: 210, slots: 2 },
              { left: 340, w: 170, h: 210, top1: 95, slots: 1 },
              { left: 520, w: 180, h: 220, top1: 10, slots: 1 },
              { left: 710, w: 160, h: 200, top1: 60, slots: 1 },
              { left: 880, w: 160, h: 200, top1: 20, slots: 1 },
              { left: 1050, w: 160, h: 200, top1: 115, slots: 1 },
              { left: 1220, w: 160, h: 200, top1: 0, top2: 210, slots: 2 },
              { left: 1392, w: 160, h: 200, top1: 25, top2: 250, slots: 2 },
            ];

            const items = [];
            let idx = 0;
            for (let c = 0; c < cols.length; c++) {
              const col = cols[c];
              if (idx >= displayImages.length) break;
              // first slot
              const src1 = displayImages[idx];
              items.push(
                <img
                  key={`img-${idx}`}
                  src={src1}
                  alt={`img${idx + 1}`}
                  className={`absolute rounded-2xl shadow-lg object-cover`}
                  style={{ top: col.top1, left: col.left, width: col.w, height: col.h }}
                  onError={(e) => { e.currentTarget.src = fallbackImage; }}
                />
              );
              idx++;

              // second slot if defined and image remains
              if (col.slots === 2 && idx < displayImages.length) {
                const src2 = displayImages[idx];
                const top2 = col.top2 ?? (col.top1 + col.h + 20);
                items.push(
                  <img
                    key={`img-${idx}`}
                    src={src2}
                    alt={`img${idx + 1}`}
                    className={`absolute rounded-2xl shadow-lg object-cover`}
                    style={{ top: top2, left: col.left, width: col.w, height: col.h }}
                    onError={(e) => { e.currentTarget.src = fallbackImage; }}
                  />
                );
                idx++;
              }
            }

            return items;
          })()}
        </div>

        {/* === Bagian Teks === */}
        <div className="text-center max-w-3xl mx-auto px-4">
          <p className="text-lg md:text-xl text-gray-700 font-medium mb-2">
            A warm <span className="text-[#C2421B] font-semibold">welcome</span> from the
          </p>
          <h1 
            className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-4"
            style={{
              background: 'linear-gradient(135deg, #810001 4%, #E70001 45%, #BB0001 97%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {cabinetName}
          </h1>
          <p className="text-gray-700 text-sm md:text-lg leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileHero;