import { useEffect, useRef, useState } from "react";

export const AddCarModal = ({onClose, onSubmit}) =>{

    const [isVisible, setIsVisible] = useState(false);
    const makeRef = useRef()

    useEffect(() => {
      setIsVisible(true); // This will trigger the opacity transition when the component mounts
      makeRef.current.focus() // making the first input focused when modal pops
    }, []);
    const [newCar, setNewCar] = useState({
        Make:'',
        Model:'',
        Year:0,
        Price:0
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCar({ ...newCar, [name]: value });
      };
      
      const handleFormClick = ((e) => {
        e.stopPropagation()
      })

      const handleSubmit = ((e)=>{
        e.preventDefault()
        onSubmit(newCar)
      })

    return (
        <div onClick={onClose} className={`form-container ${isVisible ? 'visible' : ''}`}>
            <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} className={`form ${isVisible ? 'visible' : ''}`}> 
                <h3>Add a new car</h3>
                    <input ref={makeRef} required placeholder="Make" type="text" name="Make" value={newCar.Make} onChange={handleChange}/>
                    <input required placeholder="Model" type="text" name="Model" value={newCar.Model} onChange={handleChange}/>
                    <input required placeholder="Year" type="number" name="Year" value={newCar.Year || ""} onChange={handleChange}/> 
                    <input required placeholder="Price" type="number" name="Price" value={newCar.Price || ""} onChange={handleChange}/>
                    {/* adding || null to the value so it will go back to the placeholder after every render and not the number 0.*/}
                <button type="submit" className="form-submit-btn">Submit</button>
            </form>
            <button className="modal-close-btn" onClick={onClose}>Close</button>
        </div>

    )
}