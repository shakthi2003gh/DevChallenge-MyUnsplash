import { useContext } from "react";
import { PopupContext } from "./../App";

const SearchGroup = () => {
  const { filter, setFilter } = useContext(PopupContext);

  const handleChange = (e: any) => {
    setFilter(e.target.value);
  };

  return (
    <div className="search-group">
      <span className="material-symbols-rounded">search</span>

      <input
        type="text"
        placeholder="Search by title"
        value={filter}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchGroup;
