import './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsProgress, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { changeTheme, changeSidebarStatus } from '@/store/slices/globalReducer';
import IconButton from '@/components/IconButton';

const Topbar = () => {
  const { theme, sidebarStatus } = useSelector(state => state.global);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(changeSidebarStatus(sidebarStatus === 1 ? 0 : 1));
  };

  const handleClickTheme = () => {
    dispatch(changeTheme(theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="topbar fixed-top border-bottom">
      <div className={`navbar-branding status-${sidebarStatus}`}>
        <div className="logo">
          <b>PNYY</b>TOOLS
        </div>
        <div className="bars-wrap" onClick={handleClick.bind(this)}>
          <FontAwesomeIcon icon={faBarsProgress} />
        </div>
      </div>

      <div className="others">
        <IconButton icon={theme === 'light' ? faMoon : faSun} onClick={handleClickTheme.bind(this)} />
      </div>
    </div>
  );
};

export default Topbar;
