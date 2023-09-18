import React from 'react';
import PropTypes from 'prop-types';
import './FeatureItem.css';
import Icon from '../Icons'; 

const FeatureItem = ({ iconName, imgAlt, title, text }) => {
  return (
    <div className="feature-item">
      <Icon iconName={iconName} className="feature-icon" /> 
      <h3 className="feature-item-title">{title}</h3>
      <p>{text}</p>
    </div>
  );
};

FeatureItem.propTypes = {
  iconName: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default FeatureItem;