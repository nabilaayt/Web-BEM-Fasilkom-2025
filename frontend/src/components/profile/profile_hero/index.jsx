import React from "react";

// Import local hero images so the bundler resolves their URLs (prevents 404s)
import rect188 from "../images/Rectangle 188.png";
import rect189 from "../images/Rectangle 189.png";
import rect190 from "../images/Rectangle 190.png";
import rect191 from "../images/Rectangle 191.png";
import rect192 from "../images/Rectangle 195.png";
import rect193 from "../images/Rectangle 196.png";
import rect194 from "../images/Rectangle 194.png";
import rect195 from "../images/Rectangle 193.png";
import rect196 from "../images/Rectangle 192.png";
import rect197 from "../images/Rectangle 197.png";
import rect198 from "../images/Rectangle 198.png";
import rect199 from "../images/Rectangle 199.png";
import rect200 from "../images/Rectangle 200.png";

const ProfileHero = ({
  titleMain = "A warm welcome from the",
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
          it.url ||
          it.src ||
          it.foto ||
          it.image ||
          it.path ||
          it.link ||
          it.filename ||
          ""
        );
      }
      return "";
    })
    .filter(Boolean);
  const displayImages = normalized.length > 0 ? normalized : defaultImages;

  // Debug: log image sources so we can inspect in browser console
  if (typeof window !== "undefined") {
    console.debug(
      "ProfileHero displayImages count:",
      displayImages.length,
      displayImages
    );
    console.log(
      "ProfileHero (ari) loaded — displayImages:",
      displayImages.length
    );
  }

  const fallbackImage =
    "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=600&h=400&fit=crop";

  return (
    <section className="relative pt-10 md:pt-12 pb-8 md:pb-12 px-4 sm:px-8 lg:px-16 bg-white animate-scale">
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* === Mosaic Grid dengan CSS Grid - Responsive === */}
        <div className="relative w-full mb-12">
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 md:gap-3 lg:gap-4 max-w-full mx-auto">
            {/* Column 1 - 2 images stacked */}
            <div className="flex flex-col gap-2 md:gap-3 lg:gap-4 md:mt-16">
              {displayImages[0] && (
                <img
                  src={displayImages[0]}
                  alt="Team 1"
                  className="w-full h-32 md:h-40 lg:h-48 rounded-xl shadow-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
              )}
              {displayImages[1] && (
                <img
                  src={displayImages[1]}
                  alt="Team 2"
                  className="w-full h-32 md:h-40 lg:h-48 rounded-xl shadow-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
              )}
            </div>

            {/* Column 2 - 2 images stacked with offset */}
            <div className="flex flex-col gap-2 md:gap-3 lg:gap-4 md:mt-4">
              {displayImages[2] && (
                <img
                  src={displayImages[2]}
                  alt="Team 3"
                  className="w-full h-32 md:h-40 lg:h-48 rounded-xl shadow-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
              )}
              {displayImages[3] && (
                <img
                  src={displayImages[3]}
                  alt="Team 4"
                  className="w-full h-32 md:h-40 lg:h-48 rounded-xl shadow-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
              )}
            </div>

            {/* Column 3 - 1 image centered (hidden on mobile) */}
            <div className="hidden md:flex flex-col justify-center">
              {displayImages[4] && (
                <img
                  src={displayImages[4]}
                  alt="Team 5"
                  className="w-full h-40 lg:h-52 rounded-xl shadow-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
              )}
            </div>

            {/* Column 4 - 1 image top aligned (hidden on mobile) */}
            <div className="hidden md:flex flex-col md:mt-10">
              {displayImages[5] && (
                <img
                  src={displayImages[5]}
                  alt="Team 6"
                  className="w-full h-40 lg:h-52 rounded-xl shadow-lg object-cover mt-0 lg:mt-2"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
              )}
            </div>

            {/* Column 5 - 1 image middle aligned (hidden on tablet) */}
            <div className="hidden lg:flex flex-col justify-center md:-mt-28">
              {displayImages[6] && (
                <img
                  src={displayImages[6]}
                  alt="Team 7"
                  className="w-full h-48 rounded-xl shadow-lg object-cover mt-8"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
              )}
            </div>

            {/* Column 6 - 1 image top aligned (hidden on tablet) */}
            <div className="hidden lg:flex flex-col md:mt-6">
              {displayImages[7] && (
                <img
                  src={displayImages[7]}
                  alt="Team 8"
                  className="w-full h-48 rounded-xl shadow-lg object-cover mt-4"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
              )}
            </div>

            {/* Column 7 - 1 image bottom aligned (hidden on tablet) */}
            <div className="hidden lg:flex flex-col justify-center">
              {displayImages[8] && (
                <img
                  src={displayImages[8]}
                  alt="Team 9"
                  className="w-full h-48 rounded-xl shadow-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
              )}
            </div>

            {/* Column 8 - 2 images stacked (hidden on tablet) */}
            <div className="flex flex-col gap-2 md:gap-3 lg:gap-4 md:mt-4">
              {displayImages[9] && (
                <img
                  src={displayImages[9]}
                  alt="Team 10"
                  className="w-full h-32 md:h-48 rounded-xl shadow-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
              )}
              {displayImages[10] && (
                <img
                  src={displayImages[10]}
                  alt="Team 11"
                  className="w-full h-32 md:h-48 rounded-xl shadow-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
              )}
            </div>

            {/* Column 9 - 2 images stacked (hidden on tablet) */}
            <div className="hidden lg:flex flex-col gap-4 md:mt-16">
              {displayImages[11] && (
                <img
                  src={displayImages[11]}
                  alt="Team 12"
                  className="w-full h-48 rounded-xl shadow-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
              )}
              {displayImages[12] && (
                <img
                  src={displayImages[12]}
                  alt="Team 13"
                  className="w-full h-48 rounded-xl shadow-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* === Bagian Teks === */}
        <div className="text-center max-w-4xl mx-auto px-4">
          <p className="text-lg md:text-3xl text-[#030303] font-gotham-medium mb-2">
            A warm <span className="text-[#C2421B] font-semibold">welcome</span>{" "}
            from the
          </p>
          <h1
            className="text-3xl md:text-6xl font-cinzel tracking-tight mb-4 bg-[linear-gradient(to_bottom,#BB0001_40%,#810001_80%)] 
  bg-clip-text text-transparent"
          >
            <span className="cinzel-decorative-bold">K</span>
            <span className="cinzel-bold">ABINET</span>{" "}
            <span className="cinzel-decorative-bold">A</span>
            <span className="cinzel-bold">RTHA</span>{" "}
            <span className="cinzel-bold">DARM</span>
            <span className="cinzel-decorative-bold">A</span>
          </h1>
          <p className="text-[#3E3E3E] font-gotham-book text-sm md:text-xl leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <div className="circlePosition w-[260px] h-[200px] bg-[#4A0000] rounded-full absolute z-1 top-[80%] left-[8%] -translate-x-1/2 -translate-y-1/2 blur-[180px]"></div>
      <div className="circlePosition w-[260px] h-[200px] bg-[#FBBF6A] rounded-full absolute z-1 top-[80%] left-[34%] -translate-x-1/2 -translate-y-1/2 blur-[180px]"></div>
      <div className="circlePosition w-[260px] h-[200px] bg-[#4A0000] rounded-full absolute z-1 top-[80%] left-[64%] -translate-x-1/2 -translate-y-1/2 blur-[180px]"></div>
      <div className="circlePosition w-[260px] h-[200px] bg-[#FBBF6A] rounded-full absolute z-1 top-[80%] left-[90%] -translate-x-1/2 -translate-y-1/2 blur-[180px]"></div>
    </section>
  );
};

export default ProfileHero;
