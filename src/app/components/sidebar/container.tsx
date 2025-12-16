import { SidebarComponent } from "./component";
import { useDispatch, useSelector } from "../../../store/hooks";
import { customizerActionsCreators } from "../../../features/customizer";

export const Sidebar = () => {
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
    />
  );
};
