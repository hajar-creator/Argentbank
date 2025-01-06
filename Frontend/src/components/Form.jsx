import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../slices/userSlice";
import PropTypes from "prop-types";

const EditProfileForm = ({ onCancel }) => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.user);

  const [userName, setUserName] = useState(user?.userName || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ token, userName }));
  };

  return (
    <div className="edit-profile-form">
      <h2>Edit user info</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="userName">User name:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper readonly">
          <label htmlFor="firstName">First name:</label>
          <input type="text" id="firstName" value={user?.firstName} readOnly />
        </div>
        <div className="input-wrapper readonly">
          <label htmlFor="lastName">Last name:</label>
          <input type="text" id="lastName" value={user?.lastName} readOnly />
        </div>
        <div className="button-group">
          <button type="submit" className="btn save-button">
            Save
          </button>
          <button
            type="button"
            className="btn cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

EditProfileForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export default EditProfileForm;
