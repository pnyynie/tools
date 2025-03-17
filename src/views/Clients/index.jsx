import './style.scss';
import { useState, useEffect, useContext } from 'react';
import { faPencil, faPlus, faTrashCan, faCodeCompare } from '@fortawesome/free-solid-svg-icons';
import { SERVERS_LIST_COLUMNS } from './constant';
import { AlertContext } from '@/components/Alert/AlertContext';
import IconButton from '@/components/IconButton';
import Panel from '@/components/Panel';
import Table from '@/components/Table';
import Modal from '@/components/Modal';
import ClientModal from './components/ClientModal';
import ServerModal from './components/ServerModal';
import apis from '@/apis';

function Clients() {
  const { showAlert } = useContext(AlertContext);
  const [columns, setColumns] = useState([]);
  const [clients, setClients] = useState([]);
  const [current, setCurrent] = useState({});
  const [currentServers, setCurrentServers] = useState([]);
  const [currentFilterServers, setCurrentFilterServers] = useState([]);
  const [selectedServer, setSelectedServer] = useState({});
  const [loading, setLoading] = useState(false);
  const [configLoading, setConfigLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState({ show: false, text: '' });
  const [clientModalInfo, setClientModalInfo] = useState({ show: false });
  const [serverModalInfo, setServerModalInfo] = useState({ show: false });
  const [search, setSearch] = useState('');
  const [versions, setVersions] = useState({});

  useEffect(() => {
    query();
    setColumns(transColumns(SERVERS_LIST_COLUMNS));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setColumns(transColumns(SERVERS_LIST_COLUMNS));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, currentFilterServers]);

  useEffect(() => {
    let newServers = [];
    if (!search) {
      newServers = currentServers.map(item => ({ ...item, version: versions[item.Address] || '-' }));
    } else {
      newServers = currentServers.map(item => ({ ...item, version: versions[item.Address] || '-' }));
      newServers = newServers.filter(item => {
        const searchStr = search.toLocaleLowerCase();
        return (
          item.Name.toLocaleLowerCase().indexOf(searchStr) >= 0 ||
          item.Address.toLocaleLowerCase().indexOf(searchStr) >= 0 ||
          (item.version || '').toLocaleLowerCase().indexOf(searchStr) >= 0 ||
          false
        );
      });
    }

    setSelectedServer({});
    setCurrentFilterServers(newServers);
  }, [search, currentServers, versions]);

  const query = () => {
    setLoading(true);
    return apis.client.query().then(async data => {
      setClients(data);
      if (data.length) {
        if (current && JSON.stringify(current) !== '{}') {
          const target = data.find(item => item.id === current.id);
          await selectedCurrentClient(!!target ? target : data[0]);
        } else {
          await selectedCurrentClient(data[0]);
        }
      } else {
        setCurrent({});
        setCurrentServers([]);
        setSelectedServer({});
      }
      setLoading(false);
    });
  };

  const selectedCurrentClient = async row => {
    setCurrent(row);
    setConfigLoading(true);
    setSelectedServer({});
    return apis.client.queryConfig({ id: row.id }).then(data => {
      const currentServers = data.Servers.map(item => ({ ...item, id: item.Address }));
      setCurrentServers(currentServers);
      if (currentServers.length) {
        if (selectedServer && JSON.stringify(selectedServer) !== '{}') {
          const target = currentServers.find(item => item.id === selectedServer.id);
          setSelectedServer(!!target ? target : currentServers[0]);
        } else {
          setSelectedServer(currentServers[0]);
        }
      } else {
        setSelectedServer({});
      }
      setConfigLoading(false);
    });
  };

  const handleClick = row => {
    if (row.id === current.id) return;
    selectedCurrentClient(row);
  };

  const handleEdit = () => {
    setClientModalInfo({ show: true, data: current });
  };

  const handleOk = (type, params) => {
    const apiName = type === 'add' ? 'add' : 'modify';
    return apis.client[apiName](params).then(() => {
      setClientModalInfo({ show: false });
      query();
    });
  };

  const handleServerEdit = () => {
    const { Name, Address, IsDefault } = selectedServer;
    const data = {
      name: Name,
      ip: Address.split(':')[0],
      port: Address.split(':')[1],
      IsDefault,
    };
    setServerModalInfo({ show: true, data });
  };

  const handleServerOk = (type, data) => {
    let params = {};
    if (type === 'add') {
      const { name, ip, port } = data;
      let value = { Name: name, Address: `${ip}:${port}`, IsDefault: false };
      params = { id: current.id, type: 'servers', data: [value, ...currentServers] };
    } else {
      let servers = currentServers.map(i => {
        if (i.Name === selectedServer.Name && i.Address === selectedServer.Address) {
          const { name, ip, port } = data;
          return { Name: name, Address: `${ip}:${port}`, IsDefault: selectedServer.IsDefault };
        } else {
          return { ...i };
        }
      });
      params = { id: current.id, type: 'servers', data: servers };
    }
    return apis.client
      .modifyConfig(params)
      .then(() => {
        setServerModalInfo({ show: false });
        query();
      })
      .catch(err => {
        showAlert('danger', err);
      });
  };

  // 删除客户端
  const handleClientDelete = () => {
    setModalInfo({ show: true, type: 'client', text: `确认删除客户端 ${current.name} 吗？` });
  };
  // 删除服务器
  const handleServerDelete = () => {
    setModalInfo({ show: true, type: 'server', text: `确认删除服务器 ${selectedServer.Name} 吗？` });
  };
  // 删除确认
  const handleOkDelete = () => {
    if (modalInfo.type === 'client') {
      return apis.client
        .remove(current)
        .then(() => {
          setModalInfo({ show: false });
          query();
        })
        .catch(err => {
          showAlert('danger', err);
        });
    } else if (modalInfo.type === 'server') {
      let params = {
        id: current.id,
        type: 'servers',
        data: currentServers.filter(i => !(i.Address === selectedServer.Address && i.Name === selectedServer.Name)),
      };
      return apis.client
        .modifyConfig(params)
        .then(() => {
          setModalInfo({ show: false });
          query();
        })
        .catch(err => {
          showAlert('danger', err);
        });
    }
  };
  // 启动客户端
  const handleRun = (e, row) => {
    e.stopPropagation();
    let params = { ...row, id: current.id };
    apis.client
      .run(params)
      .then(() => {
        current && selectedCurrentClient(current);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleServerChange = e => {
    setSearch(e.target.value);
  };

  const handleVersionsDetection = () => {
    const addressList = currentServers.map(i => i.Address);
    setLoading(true);
    apis.client
      .versionsDetection({ address: addressList.join() })
      .then(data => {
        setVersions(data);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const transColumns = list => {
    return list.map(item => {
      const obj = { ...item };
      if (obj.key === 'IsDefault') {
        obj.render = ({ row }) => (row['IsDefault'] ? <span className="badge text-bg-primary">最近启动</span> : null);
      }
      if (obj.key === 'action') {
        obj.render = ({ row }) => (
          <>
            <span className="btn-text" onClick={e => handleRun(e, row)}>
              启动
            </span>
            {/* <span className="btn-text" onClick={e => handleClearCache(e, row)}>
              清除缓存
            </span> */}
          </>
        );
      }
      return obj;
    });
  };

  const controls = (
    <>
      {current && current.id ? (
        <>
          <IconButton icon={faPencil} onClick={handleEdit} />
          <IconButton icon={faTrashCan} onClick={handleClientDelete} />
        </>
      ) : null}
      <IconButton icon={faPlus} onClick={setClientModalInfo.bind(this, { show: true })} />
    </>
  );

  const ConfigControls = (
    <>
      <input className="search-input form-control" type="text" value={search} placeholder="请输入" onChange={handleServerChange} />
      <IconButton icon={faCodeCompare} onClick={handleVersionsDetection} />
      {selectedServer && selectedServer.id ? (
        <>
          <IconButton icon={faPencil} onClick={handleServerEdit} />
          <IconButton icon={faTrashCan} onClick={handleServerDelete} />
        </>
      ) : null}
      <IconButton icon={faPlus} onClick={setServerModalInfo.bind(this, { show: true })} />
    </>
  );

  return (
    <div className="page-wrapper clients">
      <Panel title="Clients" width="280" loading={loading} controls={controls}>
        {clients.length ? (
          <ul className="list-group">
            {clients.map(item => (
              <li
                className={`list-group-item${current.id === item.id ? ' active' : ''}`}
                key={item.id}
                onClick={handleClick.bind(this, item)}
              >
                {item.name}
                {item.desc ? `（${item.desc}）` : ''}
              </li>
            ))}
          </ul>
        ) : null}
      </Panel>

      <Panel title="Servers" width="760" minHeight="200" loading={loading || configLoading} controls={ConfigControls}>
        {currentFilterServers.length ? (
          <Table columns={columns} data={currentFilterServers} dataHeight="300" selected={selectedServer} onSelect={setSelectedServer} />
        ) : null}
      </Panel>

      <ClientModal
        open={clientModalInfo.show}
        data={clientModalInfo.data}
        onOk={handleOk}
        onCancel={setClientModalInfo.bind(this, { show: false })}
      />
      <ServerModal
        open={serverModalInfo.show}
        data={serverModalInfo.data}
        onOk={handleServerOk}
        onCancel={setServerModalInfo.bind(this, { show: false })}
      />
      <Modal open={modalInfo.show} title="删除客户端" onOk={handleOkDelete} onCancel={setModalInfo.bind(this, { show: false })}>
        {modalInfo.text}
      </Modal>
    </div>
  );
}

export default Clients;
