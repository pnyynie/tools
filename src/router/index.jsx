import { HashRouter, Routes, Route } from 'react-router-dom';
import { ROUTERS } from './constant';

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        {ROUTERS.map(item => (
          <Route path={item.path} element={item.element} key={item.path}></Route>
        ))}
      </Routes>
    </HashRouter>
  );
};

export default Router;
