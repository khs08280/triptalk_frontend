import TripCreateModal from "@components/TripCreateModal";
import { useState } from "react";
import TripDetail from "./TripDetail";
import { useNavigate } from "react-router-dom";

const TripCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    navigate("/trip");
  };

  return (
    <TripCreateModal onClose={closeModal}>
      <h2 className="mb-4 text-xl font-bold">모달 제목</h2>
      <p className="mb-4">여기에 모달 내용을 넣을 수 있어요.</p>
      <button
        onClick={closeModal}
        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        닫기
      </button>
    </TripCreateModal>
  );
};

export default TripCreate;
