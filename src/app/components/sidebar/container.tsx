import { SidebarComponent } from "./component";
import { useDispatch, useSelector } from "../../../store/hooks";
import { customizerActionsCreators } from "../../../features/customizer";
import { Features } from "../../../features/common/featuresEnum";

interface Props {
  data: {
    features: Record<Features, string | boolean | number>;
  };
}

export const Sidebar = ({ data }: Props) => {
  const { features } = data;

  const dispatch = useDispatch();
  const { isCollapse, SidebarWidth } = useSelector((state) => state.customizer);

  const handleToggle = () => {
    dispatch(customizerActionsCreators.toggleSidebar());
  };

  return (
    <SidebarComponent
      isOpen={!isCollapse}
      onToggle={handleToggle}
      sidebarWidth={SidebarWidth || 270}
      features={features}
    />
  );
};
