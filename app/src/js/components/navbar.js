import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

const Navbar = () => {

  const { store, actions } = useContext(Context);
  const history = useHistory();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container-fluid">
        <Link className="text-decoration-none" to="/">
          <span className="navbar-brand">
            Starwars
          </span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/people">
              People
            </Link>
            <Link className="nav-link" to="/vehicles">
              vehicles
            </Link>
            <Link className="nav-link" to="/planets">
              Planets
            </Link>
          </div>
        </div>
        <span className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
            Access
          </a>

          <ul className="dropdown-menu dropdown-menu-end">
            {store.currentUser === null ?
              (<>
                <li className="dropdown-item"><Link to='/login' className="text-decoration-none">Login</Link></li>
                <li className="dropdown-item"><Link to='/register' className='text-decoration-none'>Register</Link></li>
              </>) :
              (<>
                <li className="dropdown-item"><Link to='/profile' className="text-decoration-none">Profile</Link></li>
                <hr />
                <li className="dropdown-item" onClick={() => {actions.logout(history)}}> Logout </li>
              </> 
              )
              // (store.favorites.map((ele, i) => (
              //   <li className="d-flex dropdown-item justify-content-between" key={i}>
              //     <Link to={ele.url}>
              //       {ele.name}
              //     </Link>
              //     <span className="btn btn-secondary btn-sm ms-2" onClick={() => actions.deleteFavorite(i)}><i className="fas fa-trash-alt"></i></span>
              //   </li>
              // ))
              // )
            }
          </ul>
        </span>
      </div>
    </nav>

  );
};

export default Navbar;