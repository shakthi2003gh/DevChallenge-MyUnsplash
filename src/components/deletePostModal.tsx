import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { PopupContext } from "../App";
import { deleteImage } from "./../services/fireStoreDB";

const DeletePostModal = ({ id }: { id: number }) => {
  const { setPopup } = useContext(PopupContext);

  const handleCancel = () => setPopup();

  const handleDelete = () => {
    const input = document.querySelector("form input") as HTMLInputElement;

    if (!input?.value?.match(RegExp("Delete", "gi"))) return;

    setPopup();
    deleteImage(id);
  };

  return (
    <Form className="deletePostModal">
      <div className="title">Are you sure?</div>

      <Form.Group className="mt-4">
        <Form.Label>Confirm by typing "Delete".</Form.Label>
        <Form.Control size="lg" type="password" />
      </Form.Group>

      <div className="buttons">
        <Button variant="link" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </Form>
  );
};

export default DeletePostModal;
