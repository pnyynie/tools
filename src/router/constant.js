import Clients from '@/views/Clients';
// import Classify from '@/views/Classify';
import Test from '@/views/Test';
import { faMugHot, faVials } from '@fortawesome/free-solid-svg-icons';

export const ROUTERS = [
  {
    path: '/',
    name: 'Clients',
    icon: faMugHot,
    element: <Clients />,
  },
  // {
  //   path: '/classify',
  //   name: '子页',
  //   element: <Classify />,
  // },
  {
    path: '/test',
    name: 'Test',
    icon: faVials,
    element: <Test />,
  },
];
