import React, { useState } from 'react';
import AccountItem from '../../components/AccountItem';
import './AccountSection.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileRequestAction } from '../../redux/actions';


const AccountSection = () => {
  const accounts = [
    { title: 'Argent Bank Checking (x8349)', amount: '$2,082.79', description: 'Available Balance' },
    { title: 'Argent Bank Savings (x6712)', amount: '$10,928.42', description: 'Available Balance' },
    { title: 'Argent Bank Credit Card (x8349)', amount: '$184.30', description: 'Current Balance' },
  ];

  const user = useSelector(state => state.auth.user);

  // États locaux pour la gestion du formulaire d'édition
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user ? user.firstName : "");
  const [lastName, setLastName] = useState(user ? user.lastName : "");

  const dispatch = useDispatch();

  // Gestionnaire d'événement pour sauvegarder le profil mis à jour
  const handleSaveProfile = () => {
    if (firstName.trim() === "" || lastName.trim() === "") {
      alert("First name and last name cannot be empty!");
      return;
    }

    dispatch(updateProfileRequestAction(firstName, lastName));
    setIsEditing(false);
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back<br />
          {user ? user.firstName + " " + user.lastName : "Guest"}
        </h1>
        {isEditing ? (
          <>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <button onClick={handleSaveProfile} className="edit-button">Save</button>
            <button onClick={() => setIsEditing(false)} className="edit-button">Cancel</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="edit-button">Edit Name</button>
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