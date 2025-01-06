import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCars, upsertCar } from "../store/actions/carsActions";
import CarsList from "../components/CarsList";
import { AddCarModal } from "../components/AddCarModal";

export const CarsPage = (props) => {
  const { cars } = useSelector((state) => state.carsModule);
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleUpsertCar = (car) => {
    dispatch(upsertCar(car));
  };
  const cellStateChange = (p) => {
    handleUpsertCar(p.data);
  };
  useEffect(() => {
    dispatch(loadCars());
  }, []); // empty array to ensure loading of the cars only once and when the component mounts.

  const addNewCar = (carSubmited) => {
    handleUpsertCar(carSubmited);
    toggleModal();
  };

  const toggleModal = () => {
    setIsAddCarModalOpen(!isAddCarModalOpen);
  };

  return (
    <div className="main-layout">
      {cars?.length > 0 ? (
        <>
          <div className="grid-container">
            {isAddCarModalOpen && (
              <AddCarModal onClose={toggleModal} onSubmit={addNewCar} />
            )}
            <CarsList cars={cars} cellStateChange={cellStateChange} />
          </div>
          <button className="add-car-btn" onClick={toggleModal}>
            Add Car
          </button>
        </>
      ) : (
        <div className="loading">Loading Cars...</div>
      )}
    </div>
  );
};
