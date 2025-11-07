import React from "react";
import PhotoHome from "../images/Photo Home.png";
import Kekeluargaan from "../images/Kekeluargaan.png";
import Kebersamaan from "../images/Kebersamaan.png";

const AboutUsHero = () => {
	return (
			<section
				className="relative w-full min-h-[72vh] flex items-center justify-center text-center overflow-hidden"
				id="aboutus-hero"
			>
				{/* render background image as an actual <img> so the browser loads the asset URL directly */}
				<img
					src={PhotoHome}
					alt="About us background"
					className="absolute inset-0 w-full h-full object-cover z-0"
				/>
			{/* dark maroon overlay for better text contrast (keeps text visible over image) */}
			<div className="absolute inset-0 bg-gradient-to-b from-[#4a0000]/70 via-[#4a0000]/40 to-[#4a0000]/70 z-10"></div>

			{/* floating badges */}
							<img
								src={Kekeluargaan}
								alt="Kekeluargaan"
								className="absolute right-8 top-8 w-32 sm:w-40 md:w-48 drop-shadow-lg z-30"
								style={{ transform: "translateZ(0)" }}
							/>

							<img
								src={Kebersamaan}
								alt="Kebersamaan"
								className="absolute left-6 bottom-12 w-28 sm:w-36 md:w-44 drop-shadow-lg z-30"
								style={{ transform: "translateZ(0)" }}
							/>

			{/* main content */}
					<div className="relative z-40 px-4 max-w-4xl">
				<h2 className="text-2xl md:text-3xl font-medium text-white/90 mb-2">
					A Closer Look at
				</h2>

						<h1
							className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white drop-shadow-md leading-tight"
							style={{ textShadow: "0 8px 18px rgba(0,0,0,0.55)" }}
						>
					BEM FASILKOM UNSRI
				</h1>

				<p className="mt-6 text-sm sm:text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
					Menyelami perjalanan, visi, dan dedikasi organisasi kemahasiswaan yang
					menggerakkan inovasi dan kepemimpinan di Fakultas Ilmu Komputer
				</p>
			</div>
		</section>
	);
};

export default AboutUsHero;
