import React from 'react';

const Loader = () => {
  return (
    <>
      <div className="text-center justify-content-center">
        <div className="spinner-border m-5" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Loader;
