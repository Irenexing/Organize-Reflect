import "./TaskModal.scss";
import axios from "axios";

const TaskModal = () => {
  if (!openModal) return null;

  const handleAdd = (itemToAdd) => {
    axios
      .post(`http://localhost:8080/tasks/${itemToAdd.id}`)
      .then((response) => {
        closeModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = (itemToDelete) => {
    console.log(itemToDelete.id);
    axios
      .delete(`http://localhost:8080/tasks/${itemToDelete.id}`)
      .then((response) => {
        closeModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="modal__overlay-style"> </div>
      <section className="modal">
      <img className="modal__close" src={closeIcon} alt="close" onClick={closeModal}/>
        <div className="modal__top">
          <div className="modal__title">
            Delete {itemToDelete.itemName} inventory item?
          </div>
          <p className="modal__description">
            Please confirm that you'd like to delete {itemToDelete.itemName} from
            the inventory list. You won't be able to undo this action.
          </p>
        </div>
        <div className="modal__buttons">
          <button type="button" class="btn btn-outline-secondary" onClick={closeModal}>
            Cancel
          </button>
          <button type="button" class="btn btn-outline-success" onClick={() => handleAdd(itemToAdd)}>
            Post
          </button>
          <button type="button" class="btn btn-outline-danger" onClick={() => handleDelete(itemToDelete)}>
            Delete
          </button>
        </div>
      </section>
    </>
  );
}

export default TaskModal;
