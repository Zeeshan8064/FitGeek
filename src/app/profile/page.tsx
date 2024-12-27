"use client";
import React from "react";
import AuthPopup from "@/components/AuthPopup/AuthPopup";
import './page.css'

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [showPopup, setShowPopup] = React.useState<boolean>(true); // Show popup initially
  const [userProfile, setUserProfile] = React.useState<any>(null); // Store user profile data
  const [loading, setLoading] = React.useState<boolean>(true); // Loading state

  const checkLogin = async () => {
    try {
      const response = await fetch(
        'https://fitnessgeekbackend-production.up.railway.app/auth/checklogin',
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await response.json();
      setIsLoggedIn(data.ok);
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  const fetchProfileData = async () => {
    try {
      const response = await fetch(
        'https://fitnessgeekbackend-production.up.railway.app/profile/getprofile',
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.ok) {
        setUserProfile(data.data);
      } else {
        console.error("Failed to fetch profile data:", data.message);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setLoading(false);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Update login status
    setShowPopup(false); // Close the popup
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        'https://fitnessgeekbackend-production.up.railway.app/auth/logout',
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.ok) {
        setIsLoggedIn(false);
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  React.useEffect(() => {
    checkLogin();
    if (isLoggedIn) {
      fetchProfileData();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn && showPopup) {
    return <AuthPopup onLogin={handleLogin} setShowPopup={setShowPopup} />;
  }

  return (
    <div className="profile">
      <h1 className="title">
  {userProfile ? `Welcome, ${userProfile[0].value}` : "Welcome to Your Profile"}
</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={"card"}>
          {userProfile &&
            userProfile.map((item: any, index: number) => (
              <div key={index} className={"item"}>
                <span className={"label"}>{item.name}:</span>
                <span className={"value"}>
                  {item.value} {item.unit || ""}
                </span>
              </div>
            ))}
        </div>
      )}

      <button className={"logoutbutton"} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
