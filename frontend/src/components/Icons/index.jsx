import React from 'react';
import chatIcon from '../../assets/images/icon-chat.png';
import moneyIcon from '../../assets/images/icon-money.png';
import securityIcon from '../../assets/images/icon-security.png';

const Icon = ({ iconName, className }) => {
  let iconSrc;

  switch (iconName) {
    case 'chat':
      iconSrc = chatIcon;
      break;
    case 'money':
      iconSrc = moneyIcon;
      break;
    case 'security':
      iconSrc = securityIcon;
      break;
    default:
      iconSrc = null;
  }

  return (
    <div>
      <img className={className} src={iconSrc} alt={`${iconName} icon`} />
    </div>
  );
};

export default Icon;
