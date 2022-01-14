import React, { useContext } from "react";

import style from './Header.module.css';
import AuthContext from './../../store/authContext';

function Header() {
  const ctx = useContext(AuthContext);

  return (
    <header>
      <div>
        <h1>CleverNote</h1>
      </div>
      {!ctx.isLoggedIn &&
        <div>
          <button onClick={() => {
            window.location = "/"
          }} className={style.btn}>
            Login
          </button>
        </div>
      }
      {ctx.isLoggedIn &&
        <div>
          <button onClick={() => { ctx.handleLogout(); window.location = "/" }} className={style.btnl}>
            Logout
          </button>
        </div>
      }
    </header>
  );
}

export default Header;
