import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../store/hooks";
import { ProfilePage } from "./page";
import { actions } from "../../../features/accountShopkeeper";
import { actions as planActions } from "../../../features/plans";

export const Profile = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.accountShopkeeper);
  const { data: planTypes } = useSelector((state) => state.planType);

  useEffect(() => {
    dispatch(actions.getAccountShopkeeperRequest());
  }, []);

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  if (!planTypes) {
    dispatch(planActions.planTypeRequest());
  }

  return (
    <ProfilePage
      data={{
        account: data,
        planName:
          planTypes?.find(
            (plan) => plan.planId === data.subscription?.planTypeId,
          )?.name || "-",
      }}
    />
  );
};
