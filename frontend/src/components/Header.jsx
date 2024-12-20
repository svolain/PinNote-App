import React from "react";
import PushPinIcon from '@mui/icons-material/PushPin';

function Header({ user, handleLogout, handleDeleteAccount }) {
  return (
    <header>
      <h1><PushPinIcon />PinNote</h1>
      {user && (
        <div className="header-buttons">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
          <button className="delete-account-button" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;