import React, { useEffect, useState } from 'react';
import faker from 'faker';
import './App.css';
import shopsAPI from './api/shops';


const ShopsManager = () => {
  const [shops, setShops] = useState([]);
  const [editing, setEditing] = useState({});
  const [inputs, onChangeInput] = useState({
    name: '',
    address: '',
    emp_nums: 0,
    image_url: ''
  });


  useEffect(() => {
    shopsAPI.get().then(data => setShops(data))
  }, []);

  const createShop = (data) => {
    const newShop = data ? data : {
      name: faker.company.companyName(),
      address: faker.address.streetAddress(),
      emp_nums: faker.random.number(100)
    };
    shopsAPI.create(newShop).then(() => {
      shopsAPI.get().then(data => {
        setShops(data);
        onChangeInput({
          ...inputs,
          name: '',
          address: '',
          emp_nums: 0,
          image_url: ''
        });
      })
    });
  };

  const editShop = ({ id, ...data }) => {
    shopsAPI.update(id, data).then(() => {
      shopsAPI.get().then(data => {
        setShops(data);
        setEditing({});
      })
    });
  };

  const deleteShop = (id) => shopsAPI.delete(id).then(() => {
    shopsAPI.get().then(data => {
      setShops(data);
    })
  });
  console.log('shops :', shops);
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      {
        !(shops instanceof Array) ?
          <div>
            Disconnected
          </div>
          :
          <div className="shop-list">
            <table className="table" cellSpacing={2}>
              <thead>
              <tr>
                <th colSpan={8}>
                  Shops Manager
                  <button className="btn btn-primary" style={{ float: 'right' }}
                          onClick={() => createShop()}>
                    Create random shop
                  </button>
                </th>
              </tr>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Employees</th>
                <th>Open/Closed</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {
                shops.map((s, i) => {
                  if (s.id === editing.id) {
                    return <EditShopRow
                      key={s.id}
                      editing={editing}
                      setEditing={setEditing}
                      editShop={editShop}
                      index={i}
                      shopId={s.id}
                    />;
                  }

                  return <DataRow
                    key={s.id}
                    setEditing={setEditing}
                    deleteShop={deleteShop}
                    shop={s}
                    index={i}
                  />
                })
              }
              <AddShopRow
                inputs={inputs}
                onChangeInput={onChangeInput}
                createShop={createShop}
              />
              </tbody>
            </table>
          </div>
      }
    </div>
  );
};

export default ShopsManager;

const DataRow = ({ shop, index, setEditing, deleteShop }) =>
  (<tr key={shop.id}>
    <td>{index + 1}</td>
    <td>{shop.id}</td>
    <td>{shop.name}</td>
    <td>{shop.address}</td>
    <td>{shop.emp_nums}</td>
    <td>{shop.isOpen ? 'Open' : 'Closed'}</td>
    <td>
      <img className="shop-image-sm" src={shop.image_url}/>
    </td>
    <td>
      <div className="button-group">
        <button
          className="btn btn-primary"
          onClick={() => setEditing(shop)}>
          Edit Shop
        </button>
        <button
          className="btn btn-danger"
          onClick={() => deleteShop(shop.id)}>
          Delete Shop
        </button>
      </div>
    </td>
  </tr>);

const AddShopRow = ({ inputs, onChangeInput, createShop }) =>
  (<tr>
    <td/>
    <td/>
    <td>
      <input
        className="form-input"
        value={inputs.name}
        onChange={(e) => onChangeInput({ ...inputs, name: e.target.value })}
        type="text" name="name" placeholder="Shop Name"/>
    </td>
    <td>
      <input
        className="form-input"
        value={inputs.address}
        onChange={(e) => onChangeInput({ ...inputs, address: e.target.value })}
        type="text" name="address" placeholder="Address"/>
    </td>
    <td>
      <input
        className="form-input"
        value={inputs.emp_nums}
        onChange={(e) => onChangeInput({ ...inputs, emp_nums: e.target.value })}
        type="number" name="emp_nums" placeholder="No. of employees"/>
    </td>
    <td>
      <label htmlFor="isOpen">
        <input
          className="form-input"
          value={inputs.isOpen}
          onChange={(e) => onChangeInput({ ...inputs, isOpen: e.target.checked })}
          type="checkbox" name="isOpen"/>
        {inputs.isOpen ? 'Open' : 'Closed'}
      </label>
    </td>
    <td>
      <input
        className="form-input"
        value={inputs.image_url}
        onChange={(e) => onChangeInput({ ...inputs, image_url: e.target.value })}
        type="text" name="image_url" placeholder="Image link"/>
    </td>
    <td>
      <button
        className="btn btn-success"
        onClick={() => createShop(inputs)}>
        Add Shop
      </button>
    </td>
  </tr>);

const EditShopRow = ({ editing, setEditing, editShop, index, shopId }) =>
  (<tr>
    <td>{index + 1}</td>
    <td>{shopId}</td>
    <td>
      <input
        className="form-input"
        value={editing.name}
        onChange={(e) => setEditing({ ...editing, name: e.target.value })}
        type="text" name="name" placeholder="Shop Name"/>
    </td>
    <td>
      <input
        className="form-input"
        value={editing.address}
        onChange={(e) => setEditing({ ...editing, address: e.target.value })}
        type="text" name="address" placeholder="Address"/>
    </td>
    <td>
      <input
        className="form-input"
        value={editing.emp_nums}
        onChange={(e) => setEditing({ ...editing, emp_nums: e.target.value })}
        type="number" name="emp_nums" placeholder="No. of employees"/>
    </td>
    <td>
      <label htmlFor="isOpen">
        <input
          className="form-input"
          checked={editing.isOpen}
          onChange={(e) => setEditing({ ...editing, isOpen: e.target.checked })}
          type="checkbox" name="isOpen"/>
        {editing.isOpen ? 'Open' : 'Closed'}
      </label>
    </td>
    <td>
      <input
        className="form-input"
        value={editing.image_url}
        onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
        type="text" name="image_url" placeholder="Image link"/>
    </td>
    <td>
      <button
        className="btn btn-primary"
        onClick={() => editShop(editing)}>
        Save
      </button>
      <button
        className="btn btn-dark"
        onClick={() => setEditing({})}>
        Cancel
      </button>
    </td>
  </tr>);