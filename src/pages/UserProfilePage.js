import Profile from "features/user/Profile";
import { getUserById } from "features/user/userSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UserProfilePage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { profileUser } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserById(userId));
  }, [userId]);

  return <div>{profileUser && <Profile user={profileUser} />}</div>;
};

export default UserProfilePage;
