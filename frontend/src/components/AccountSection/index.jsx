import React from 'react';
import AccountItem from '../../components/AccountItem';
import './AccountSection.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileRequestAction } from '../../redux/actions';
import { 
  toggleEditing,
  updateEditingFirstName,
  updateEditingLastName 
} from '../../redux/reducers';

const AccountSection = () => {
  const accounts = [
    { title: 'Argent Bank Checking (x8349)', amount: '$2,082.79', description: 'Available Balance' },
    { title: 'Argent Bank Savings (x6712)', amount: '$10,928.42', description: 'Available Balance' },
    { title: 'Argent Bank Credit Card (x8349)', amount: '$184.30', description: 'Current Balance' },
  ];

  const user = useSelector(state => state.auth.user);
  const isEditing = useSelector(state => state.auth.isEditing);
  const editingFirstName = useSelector(state => state.auth.editingFirstName);
  const editingLastName = useSelector(state => state.auth.editingLastName);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleEditing());
  };

  const handleSaveProfile = () => {
    if (editingFirstName.trim() === "" || editingLastName.trim() === "") {
      alert("First name and last name cannot be empty!");
      return;
    }
    dispatch(updateProfileRequestAction(editingFirstName, editingLastName));
    dispatch(toggleEditing()); 
  };

  const handleCancel = () => {
    if (user) {
      dispatch(updateEditingFirstName(user.firstName));
      dispatch(updateEditingLastName(user.lastName));
    }
    dispatch(toggleEditing()); 
  };

  const renderUserName = () => {
    if (user) {
      return `${user.firstName} ${user.lastName}`;
    }
    return null;
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back<br />
          {renderUserName()}
        </h1>
        {isEditing ? (
          <>
            <input
              value={editingFirstName}
              onChange={(e) => dispatch(updateEditingFirstName(e.target.value))}
            />
            <input
              value={editingLastName}
              onChange={(e) => dispatch(updateEditingLastName(e.target.value))}
            />
            <button onClick={handleSaveProfile} className="edit-button">Save</button>
            <button onClick={handleCancel} className="edit-button">Cancel</button>
          </>
        ) : (
          <button onClick={handleClick} className="edit-button">Edit Name</button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      {accounts.map((account, index) => (
        <AccountItem
          key={index}
          title={account.title}
          amount={account.amount}
          description={account.description}
          ctaText="View transactions"
        />
      ))}
    </main>
  );
};

export default AccountSection;
