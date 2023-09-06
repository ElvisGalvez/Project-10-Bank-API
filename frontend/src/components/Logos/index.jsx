import React from 'react';
import argentBankLogo from '../../assets/images/argentBankLogo.png';

const Logo = ({ className }) => {
  return (
    <div>
      <img className={className} src={argentBankLogo} alt="Argent Bank Logo" />
    </div>
  );
};

export default Logo;