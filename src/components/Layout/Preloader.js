// src/components/Layout/Preloader.js

import React from "react";
import styles from "./Preloader.module.css";

const Preloader = ({ isLoading }) => {
  return (
    <div className={isLoading ? `${styles.preloader} ${styles.active}` : styles.preloader}>
      {/* Preloader content */}
    </div>
  );
};

export default Preloader;
