import {FaFacebook, FaInstagram, FaLinkedin} from "react-icons/fa"

import styles from "./Footer.module.css"

export function Footer() {

    return (
    <footer className={styles.footer}>

        <ul className={styles.socialList}>
            <li>
                <FaFacebook />
            </li>
            <li>
                <FaInstagram />
            </li>
            <li>
                <FaLinkedin />
            </li>
        </ul>

        <p className={styles.copyRight}><span>Custos</span> &copy; 2023</p>

    </footer>
    )

}