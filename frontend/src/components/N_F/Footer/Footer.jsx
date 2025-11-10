import React from "react";
import logo from "../../../Assets/Logo/Logo BEM Putih.svg";
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
          <div className="flex-col flex">
            <a href="https://www.linkedin.com/company/bemkmfasilkomunsri/posts/?feedView=all">
              Linkedin: @bemkmilkomunsri
            </a>
            <a href="">Email: bemfasilkomunsri@gmail.com</a>
            <a href="https://www.instagram.com/bemilkomunsri">
              Instagram: @bemilkomunsri
            </a>
            <a href="https://x.com/bemilkomunsri">X: @bemilkomunsri</a>
            <a href="https://www.facebook.com/bemilkomunsri?_rdc=2&_rdr#">
              Facebook: bemilkomunsri
            </a>
          </div>
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