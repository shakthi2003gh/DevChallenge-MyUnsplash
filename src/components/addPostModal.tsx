import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { setImage } from "../services/fireStoreDB";
import { PopupContext } from "./../App";

const AddPostModal = () => {
  const { user, setPopup } = useContext(PopupContext);

  const handleCancel = () => setPopup();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form: HTMLElement = e.target;
    const inputs = form.querySelectorAll("input");

    const title = inputs[0].value;
    const imageURL = inputs[1].value;

    if (!title) return;

    setImage({
      id: Date.now(),
      title,
      imageURL: imageURL || "https://source.unsplash.com/random/" + Date.now(),
      userId: user.id,
    });

    setPopup();
  };

  return (
    <Form className="addPostModal" onSubmit={handleSubmit}>
      <div className="title">Add a new photo</div>

      <Form.Group className="mt-2">
        <Form.Label>Label</Form.Label>
        <Form.Control
          type="text"
          size="lg"
          placeholder="My unsplash post title"
        />
      </Form.Group>

      <Form.Group className="mt-2">
        <Form.Label>Photo URL</Form.Label>
        <Form.Control
          type="text"
          size="lg"
          placeholder="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..."
        />
      </Form.Group>

      <div className="buttons">
        <Button variant="link" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="green" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default AddPostModal;
