import { useEffect } from "react";
import { toast } from "react-toastify";
import { actions } from "../../../features/showcase";
import { CreateShowcasePayload } from "../../../features/showcase/types";
import { useDispatch, useSelector } from "../../../store/hooks";
import { ShowcaseComponent } from "./page";

export const Showcase = () => {
  const dispatch = useDispatch();
  const { data, loading, message } = useSelector((state) => state.showcase);

  const createShowcase = (data: CreateShowcasePayload) => {
    dispatch(actions.createShowcaseRequest(data));
  };

  const updateShowcase = (data: CreateShowcasePayload) => {
    dispatch(actions.updateShowcaseRequest(data));
  };

  useEffect(() => {
    if (data === null) {
      dispatch(actions.showcaseRequest());
    }
  }, []);

  if (message) {
    toast.success(message);
    dispatch(actions.setMessage(undefined));
  }

  return (
    <ShowcaseComponent
      data={{ showcase: data, loading }}
      actions={{ createShowcase, updateShowcase }}
    />
  );
};
