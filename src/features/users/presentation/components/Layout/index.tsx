import React from 'react';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>My Application</h1>
        {/* Aquí podrías añadir un menú de navegación */}
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <p>© 2023 My Company</p>
      </footer>
    </div>
  );
};