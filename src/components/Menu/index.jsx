import './style.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ROUTERS } from '@/router/constant';
import { change } from '@/store/slices/locationReducer';

const Menu = () => {
  const current = useSelector(state => state.location.value);
  const sidebarStatus = useSelector(state => state.global.sidebarStatus);
  const dispatch = useDispatch();

  const handleClick = row => {
    dispatch(change(row.path));
  };

  useEffect(() => {
    window.location.replace(`#${current}`);
  }, [current]);

  return (
    <div className={`menu menu-${sidebarStatus}`}>
      <ul>
        {ROUTERS.map(item => (
          <li className={current === item.path ? 'active' : ''} key={item.path} onClick={handleClick.bind(this, item)}>
            {item.icon ? <FontAwesomeIcon icon={item.icon} /> : null}
            {sidebarStatus === 1 ? item.name : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
