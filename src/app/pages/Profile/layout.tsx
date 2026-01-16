import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../store/hooks";
import { ProfilePage } from "./page";
import { actions } from "../../../features/accountShopkeeper";

export const Profile = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.accountShopkeeper);

  useEffect(() => {
    dispatch(actions.getAccountShopkeeperRequest());
  }, []);

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return <ProfilePage data={{ account: data }} />;
};
