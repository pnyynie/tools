import { useState, useEffect, useRef } from 'react';
import Modal from '@/components/Modal';

const initiaValues = {
  name: '',
  ip: '',
  port: '8088',
};

const ServerModal = ({ open, data, onOk, onCancel }) => {
  const formRef = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(initiaValues);

  useEffect(() => {
    if (!open) {
      setFormData(data || initiaValues);
      return;
    }
    setIsEdit(!!data);
    !!data && setFormData(data);
  }, [open, data]);

  const handleOk = () => {
    if (!formRef.current.checkValidity()) {
      formRef.current.classList.add('was-validated');
      return;
    }
    onOk && onOk(isEdit ? 'edit' : 'add', formData);
  };

  const changeFormData = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <Modal open={open} title={`${isEdit ? '修改' : '新增'}服务器`} onOk={handleOk} onCancel={onCancel}>
      <form className="needs-validation" ref={formRef}>
        <div className="mb-3">
          <input
            type="text"
            value={formData.name}
            className="form-control"
            placeholder="请输入名称"
            required
            onChange={e => changeFormData('name', e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            value={formData.ip}
            className="form-control"
            placeholder="请输入 IP"
            required
            onChange={e => changeFormData('ip', e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            value={formData.port}
            className="form-control"
            placeholder="请输入端口"
            required
            onChange={e => changeFormData('port', e.target.value)}
          />
        </div>
      </form>
    </Modal>
  );
};

export default ServerModal;
