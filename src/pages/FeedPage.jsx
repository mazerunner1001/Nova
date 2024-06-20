import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import UnderDevelopmentCard from "../components/UnderDevelopmentCard";

const HomePage = () => {
  const [showUnderDevelopment, setShowUnderDevelopment] = useState(true);

  const handleClose = () => {
    setShowUnderDevelopment(false);
  };

  return (
    <div>
      <Navbar />
      {showUnderDevelopment && <UnderDevelopmentCard onClose={handleClose} />}
    </div>
  );
}

export default HomePage;
