import React, { ReactNode, useRef, MouseEvent } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const TripCreateModal: React.FC<ModalProps> = ({ onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달 바깥(overlay) 클릭 시 onClose 호출
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="relative w-3xl rounded-lg bg-white p-8 py-10 shadow-lg"
      >
        {children}
      </div>
    </div>
  );
};

export default TripCreateModal;
