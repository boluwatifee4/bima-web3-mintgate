import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/layout.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.socialLinks}>
        <Link
          href="https://github.com/boluwatifee4/bima-web3-mintgate"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/github.svg" alt="GitHub" width={20} height={24} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/ola-boluwatife/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/linkedin.svg" alt="LinkedIn" width={20} height={24} />
        </Link>
        <Link
          href="https://x.com/OlaBima_"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/x.svg" alt="X (Twitter)" width={20} height={24} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
