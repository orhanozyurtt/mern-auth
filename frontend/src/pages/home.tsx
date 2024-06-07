import React from 'react';

const Home: React.FC = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-purple-500 text-white">
        <div className="max-w-md mx-auto bg-blue-300 shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
              Welcome to My MERN App
            </h1>
            <p className="text-gray-600 text-lg text-center">
              This application is built using the MERN stack (MongoDB, Express,
              React, Node.js). It provides a robust and scalable platform for
              building full-stack applications.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
