// src/components/Footer.js
import React from "react";
import styles from "./Style.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerInfo}>
          <div className={styles.footerLogo}>
            <img
              src="/Logo-BEM.png"
              alt="Logo"
              className={styles.footerLogoImage}
            />
            <div className={styles.footerLogoText}>
              <span className={styles.decorativeBold}>A</span>
              <span className={styles.regular}>RTHA</span>{" "}
              <span className={styles.regular}>DARM</span>
              <span className={styles.decorativeBold}>A</span>
              <br />
              BEM KM FASILKOM UNSRI
            </div>
          </div>

          <p>
            Gedung Fakultas Ilmu Komputer
            <br />
            Kampus Universitas Sriwijaya
            <br />
            Indralaya KM 33
          </p>
        </div>
        <div className={styles.footerContact}>
          <h3>Contact Us</h3>
          <p>Line: @bemilkomunsri</p>
          <p>Email: bemfasilkomunsri@gmail.com</p>
          <p>Instagram: @bemilkomunsri</p>
        </div>
        <div className={styles.footerNav}>
          <h3>Navigation</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
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