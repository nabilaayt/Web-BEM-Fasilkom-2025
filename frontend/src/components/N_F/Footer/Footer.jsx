import React from "react";
import logo from "../../../Assets/Logo/Logo-BEM.png";
import styles from "./Style.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerInfo}>
          <div className={styles.footerLogo}>
            <img src={logo} alt="Logo" className={styles.footerLogoImage} />
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
          <div className="flex-col flex">
            <a href="https://www.linkedin.com/company/bemkmfasilkomunsri/posts/?feedView=all">Linkedin: @bemkmilkomunsri</a>
            <a href="">Email: bemfasilkomunsri@gmail.com</a>
            <a href="https://www.instagram.com/bemilkomunsri">
              Instagram: @bemilkomunsri
            </a>
            <a href="https://x.com/bemilkomunsri">X: @bemilkomunsri</a>
            <a href="https://www.facebook.com/bemilkomunsri?_rdc=2&_rdr#">Facebook: bemilkomunsri</a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; BEM KM FASILKOM UNSRI 2025 | Kabinet Artha Darma</p>
      </div>
    </footer>
  );
};

export default Footer;
