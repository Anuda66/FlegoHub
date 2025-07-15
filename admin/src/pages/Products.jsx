import React from 'react';

const Products = () => {
  return (
    <div className="ml-64 mt-16 p-6">
      <h1 className="text-2xl font-bold mb-6">Products Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Product Image {item}</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">Product {item}</h3>
              <p className="text-gray-600 mt-1">$ {(item * 19.99).toFixed(2)}</p>
              <div className="flex justify-between items-center mt-4">
                <span className={`px-2 py-1 text-xs rounded-full ${item % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {item % 2 === 0 ? 'In Stock' : 'Low Stock'}
                </span>
                <div>
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;