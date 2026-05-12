import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../../store/hooks";
import { HealthCheckComponent } from "./component";
import { actions } from "../../../../features/healthcheck";

export const HealthCheck = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.healthCheck);

  useEffect(() => {
    dispatch(actions.loadHealthCheck());
  }, [dispatch]);

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return <HealthCheckComponent status={data.status} version={data.version} />;
};
