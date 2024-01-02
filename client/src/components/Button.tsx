// Button.tsx
import React, { useState } from 'react';
import Modal from './Modal';

const Button: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      
    </div>
  );
};

export default Button;
