import { useContext } from "react";
import { Button } from "react-bootstrap";
import { PopupContext } from "./../App";
import SearchGroup from "./../components/search";
import AddPostModal from "./../components/addPostModal";
import { signIn } from "./../services/firebaseAuth";

const Header = () => {
  const { user, setPopup, setUser } = useContext(PopupContext);

  const handleClick = () => {
    setPopup({ modal: AddPostModal });
  };

  const handleLogin = async () => {
    const id = await signIn();
    if (id) setUser({ id });
  };

  return (
    <div className="header">
      <img src="/unsplash_logo.svg" alt="" className="logo" />

      <SearchGroup />

      <div className="buttons">
        {!user ? (
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        ) : (
          <Button variant="green" onClick={handleClick}>
            Add a photo
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
