import { useState, useEffect, useRef } from 'react';
import Modal from '@/components/Modal';
import SelectPath from '@/components/SelectPath';

const initiaValues = {
  name: '',
  desc: '',
  path: '',
};

const ClientModal = ({ open, data, onOk, onCancel }) => {
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
    <Modal open={open} title={`${isEdit ? '修改' : '新增'}客户端`} onOk={handleOk} onCancel={onCancel}>
      <form className="needs-validation" ref={formRef}>
        <div className="mb-3">
          {/* <label className="form-label">名称</label> */}
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
            value={formData.desc}
            className="form-control"
            placeholder="请输入描述"
            onChange={e => changeFormData('desc', e.target.value)}
          />
        </div>

        <div>
          <SelectPath
            value={formData.path}
            className="form-control"
            placeholder="请选择项目地址"
            required={true}
            onChange={value => changeFormData('path', value)}
          />
          <div id="emailHelp" className="form-text">
            * 估值6客户端根目录地址
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ClientModal;
