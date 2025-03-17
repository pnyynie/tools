import './style.scss';
import { useSelector } from 'react-redux';
import Menu from '@/components/Menu';

const Sidebar = () => {
  const sidebarStatus = useSelector(state => state.global.sidebarStatus);

  return (
    <div className={`sidebar border-end sidebar-${sidebarStatus}`}>
      <Menu />
    </div>
  );
};

export default Sidebar;
