import './style.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ROUTERS } from '@/router/constant';
import { change } from '@/store/slices/locationReducer';

const Navbar = () => {
  const current = useSelector(state => state.location.value);
  const dispatch = useDispatch();

  const handleClick = row => {
    dispatch(change(row.path));
    window.location.reload();
  };

  useEffect(() => {
    window.location.replace(`#${current}`);
  }, [current]);

  let routerItem = ROUTERS.find(i => i.path === current);

  return (
    <div className="navbar border-bottom">
      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="breadcrumb-item current" onClick={handleClick.bind(this, routerItem)}>
              {routerItem.name}
            </li>

            {routerItem.icon ? (
              <li className="breadcrumb-item icon">
                <FontAwesomeIcon icon={routerItem.icon} />
              </li>
            ) : null}

            {current.pathList ? current.pathList.map(item => <li className="breadcrumb-item">{item.name}</li>) : null}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
