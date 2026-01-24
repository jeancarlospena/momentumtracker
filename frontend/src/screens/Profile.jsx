import { useAuthContext } from "../hooks/useAuthContext.jsx";
import AccountsManager from "../components/AccountsManager.jsx";
import { useState } from "react";
import ProfileManager from "../components/ProfileManager.jsx";

const Profile = () => {
  const [selected, setSelected] = useState("profile");
  const { user } = useAuthContext();
  const navClickHandler = (link) => {
    setSelected(link);
  };
  return (
    <div className="global-padding top-spacer">
      <div className="profile-sections">
        <div className="profile-nav">
          {/* <h2 className="basic-title">Profile: </h2> */}
          <img className="profile-img" src="../images/userimg.png" alt="" />
          <h2 className="">{user.firstName}</h2>
          <span
            onClick={() => navClickHandler("profile")}
            className={`profile-nav-button ${
              selected === "profile" && "selected-profile-nav"
            }`}
          >
            My Profile
          </span>
          {/* <span
            className={`profile-nav-button ${
              selected === "accounts" && "selected-profile-nav"
            }`}
            onClick={() => navClickHandler("accounts")}
          >
            Trading Accounts
          </span> */}
        </div>

        {selected === "accounts" && <AccountsManager />}
        {selected === "profile" && <ProfileManager />}
      </div>
    </div>
  );
};

export default Profile;
