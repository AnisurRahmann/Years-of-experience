import { useEffect, useState } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, reset } from "../features/auth/authSlice";

const { REACT_APP_BASE_URL } = process.env;

const Header: React.FunctionComponent = () => {
  const [publicUrl, setPublicUrl] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {
    const domain = REACT_APP_BASE_URL;
    if (user !== null) setPublicUrl(`${domain}/profile/${user.id}`);
  }, [user]);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Years of Experience</Link>
      </div>
      <ul>
        {user ? (
          <>
            <div className="field has-addons mb-0 ">
              <div className="control is-expanded">
                <input
                  className="input"
                  type="text"
                  value={publicUrl}
                  disabled={true}
                />
              </div>
              <div className="control">
                <button
                  className="button is-info"
                  onClick={() => {
                    navigator.clipboard.writeText(publicUrl);
                    toast.success("Copied to clipboard");
                  }}
                >
                  Public Profile URL
                </button>
              </div>
            </div>

            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt />
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="login">
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li>
              <Link to="registration">
                <FaUserAlt />
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
