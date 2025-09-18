import React from 'react';
import { DotLoader } from 'react-spinners';

const DotLoaderComponent = ({ loading, size = 60, color = '#36d7b7' }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center',
     alignItems: 'center', 
     minHeight: '50vh' }}>
           <DotLoader loading={loading} size={size} color={color} />

    </div>
  );
};

export default DotLoaderComponent;
