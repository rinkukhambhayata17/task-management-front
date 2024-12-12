import React from 'react';

const AddSectionButton = ({ onAddSection }) => (
  <button
    onClick={onAddSection}
    style={{
      marginBottom: '20px',
      padding: '10px 15px',
      fontSize: '16px',
      color: 'white',
      backgroundColor: '#6c63ff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    }}
  >
    ➕ Add Section
  </button>
);

export default AddSectionButton;