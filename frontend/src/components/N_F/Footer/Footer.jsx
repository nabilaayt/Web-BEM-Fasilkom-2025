import React from "react";
import logo from "../../../Assets/Logo/Logo BEM Putih.svg";
import LogoInstagram from "../../../Assets/Logo/Logo Instagram.svg";
import LogoX from "../../../Assets/Logo/Logo X.svg";
import LogoYoutube from "../../../Assets/Logo/Logo Youtube.svg";
import styles from "./Style.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerInfo}>
          <div className={styles.footerLogo}>
            <img src={logo} alt="Logo" className={styles.footerLogoImage} />
            <div className={styles.footerLogoText}>
              <h1>BEM KM FASILKOM UNSRI</h1>
              <span className={styles.decorativeBold}>K</span>
              <span className={styles.regular}>ABINET</span>{" "}
              <span className={styles.decorativeBold}>A</span>
              <span className={styles.regular}>RTHA</span>{" "}
              <span className={styles.regular}>DARM</span>
              <span className={styles.decorativeBold}>A</span>


            </div>
          </div><br />


          <p>
            Gedung Fakultas Ilmu Komputer
            <br />
            Kampus Universitas Sriwijaya
            <br />
            Indralaya KM 33
          </p>
        </div>
        <div className={styles.footerContact}>
          <h3>CONTACT US</h3><br />
          <div className="flex flex-col">
            <a href="https://www.linkedin.com/company/bemkmfasilkomunsri/posts/?feedView=all">
              Line: @bemilkomunsri
            </a>
            <a href="mailto:bemfasilkomunsri@gmail.com">
              Email: bemfasilkomunsri@gmail.com
            </a>

            {/* Social icons row: Instagram, X, YouTube (replacing Facebook) */}
            <div className={styles.sosmedRow} aria-label="Social media links">
              <a
                href="https://x.com/bemilkomunsri"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sosmedLink}
                title="X"
              >
                <img src={LogoX} alt="X" className={styles.sosmedIcon} />
              </a>

              <a
                href="https://www.instagram.com/bemilkomunsri"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sosmedLink}
                title="Instagram"
              >
                <img src={LogoInstagram} alt="Instagram" className={styles.sosmedIcon} />
              </a>

              <a
                href="https://www.youtube.com/@bemilkomunsri"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sosmedLink}
                title="YouTube"
              >
                <img src={LogoYoutube} alt="YouTube" className={styles.sosmedIcon} />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.footerNav}>
          <h3>NAVIGATION</h3>
          <ul><br />
            <li>
              <a href="/">Home</a>
            </li><br />
            <li>
              <a href="/about">About Us</a>
            </li><br />
            <li>
              <a href="/profile">Profile</a>
            </li><br />
            <li>
              <a href="#">BEM Apps</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; BEM KM FASILKOM UNSRI 2025 | Kabinet Artha Darma</p>
      </div>
    </footer>
  );
};

export default Footer;