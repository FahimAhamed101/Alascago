import { useState } from 'react';
import { CheckCircleIcon, XCircleIcon, ClockIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const CarApprovalSection = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedCar, setSelectedCar] = useState(null);

  // Sample car data
  const carData = {
    pending: [
      {
        id: 1,
        make: 'Toyota',
        model: 'Camry',
        year: 2022,
        mileage: 12500,
        price: 24500,
        submittedBy: 'John Smith',
        submittedDate: '2023-05-15',
        images: [
          'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
        ],
        documents: ['title.pdf', 'inspection.pdf']
      },
      {
        id: 2,
        make: 'Honda',
        model: 'Civic',
        year: 2021,
        mileage: 18700,
        price: 21500,
        submittedBy: 'Sarah Johnson',
        submittedDate: '2023-05-18',
        images: [
          'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
        ],
        documents: ['title.pdf', 'registration.pdf']
      }
    ],
    approved: [
      {
        id: 3,
        make: 'Ford',
        model: 'F-150',
        year: 2020,
        mileage: 32500,
        price: 32500,
        submittedBy: 'Mike Davis',
        submittedDate: '2023-05-10',
        approvedDate: '2023-05-12',
        approvedBy: 'Admin User',
        images: [
          'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80'
        ],
        documents: ['title.pdf', 'inspection.pdf', 'insurance.pdf']
      }
    ],
    rejected: [
      {
        id: 4,
        make: 'Chevrolet',
        model: 'Malibu',
        year: 2019,
        mileage: 45200,
        price: 18500,
        submittedBy: 'Emily Wilson',
        submittedDate: '2023-05-05',
        rejectedDate: '2023-05-08',
        rejectedBy: 'Admin User',
        rejectionReason: 'Incomplete documentation and signs of previous accident damage',
        images: [
          'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80'
        ],
        documents: ['title.pdf']
      }
    ]
  };

  const handleApprove = (carId) => {
    console.log(`Approved car ${carId}`);
  };

  const handleReject = (carId) => {
    console.log(`Rejected car ${carId}`);
  };

  const handleViewDetails = (car) => {
    setSelectedCar(car);
  };

  const closeModal = () => {
    setSelectedCar(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">Car Approval</h1>
          <p className="text-gray-600 mt-2">Review and manage car submissions</p>
        </div>

      
        {/* Car List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {carData[activeTab].map((car) => (
            <div key={car.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
              <div className="relative h-48 overflow-hidden">
                <img src={car.images[0]} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{car.make} {car.model}</div>
                    <div className="text-xs text-gray-500">{car.year} • {car.mileage.toLocaleString()} miles</div>
                    <div className="text-sm font-semibold text-indigo-600">${car.price.toLocaleString()}</div>
                  </div>
                  <button
                    onClick={() => handleViewDetails(car)}
                    className="text-indigo-600 hover:text-indigo-900 text-xs font-medium"
                  >
                    View
                  </button>
                </div>
                <div className="text-sm text-gray-500 mb-2">Submitted by {car.submittedBy}</div>
                <div className="text-xs text-gray-400">{new Date(car.submittedDate).toLocaleDateString()}</div>
               
                 
                  
                
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {carData[activeTab].length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <ExclamationCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No cars found</h3>
            <p className="mt-1 text-gray-500">
              {activeTab === 'pending' 
                ? "There are currently no cars pending approval." 
                : activeTab === 'approved' 
                  ? "No cars have been approved yet." 
                  : "No cars have been rejected."}
            </p>
          </div>
        )}

        {/* Car Details Modal */}
        {selectedCar && (
          <div className="fixed z-100 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeModal}></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          {selectedCar.make} {selectedCar.model} ({selectedCar.year})
                        </h3>
                        <button
                          type="button"
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                          onClick={closeModal}
                        >
                          <span className="sr-only">Close</span>
                          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Car Details</h4>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600"><span className="font-medium">Price:</span> ${selectedCar.price.toLocaleString()}</p>
                            <p className="text-sm text-gray-600"><span className="font-medium">Mileage:</span> {selectedCar.mileage.toLocaleString()} miles</p>
                            <p className="text-sm text-gray-600"><span className="font-medium">Submitted By:</span> {selectedCar.submittedBy}</p>
                            <p className="text-sm text-gray-600"><span className="font-medium">Submitted Date:</span> {new Date(selectedCar.submittedDate).toLocaleDateString()}</p>
                            {selectedCar.approvedDate && (
                              <p className="text-sm text-green-600"><span className="font-medium">Approved Date:</span> {new Date(selectedCar.approvedDate).toLocaleDateString()}</p>
                            )}
                            {selectedCar.rejectedDate && (
                              <p className="text-sm text-red-600"><span className="font-medium">Rejected Date:</span> {new Date(selectedCar.rejectedDate).toLocaleDateString()}</p>
                            )}
                            {selectedCar.rejectionReason && (
                              <div className="mt-2">
                                <p className="text-sm font-medium text-gray-900">Rejection Reason:</p>
                                <p className="text-sm text-gray-600">{selectedCar.rejectionReason}</p>
                              </div>
                            )}
                          </div>
                          
                          <h4 className="font-medium text-gray-900 mt-4 mb-2">Documents</h4>
                          <div className="space-y-1">
                            {selectedCar.documents.map((doc, index) => (
                              <div key={index} className="flex items-center">
                                <svg className="h-5 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer">{doc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Images</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {selectedCar.images.map((img, index) => (
                              <div key={index} className="rounded-md overflow-hidden">
                                <img src={img} alt={`Car image ${index + 1}`} className="w-full h-auto" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  {activeTab === 'pending' && (
                    <>
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => {
                          handleApprove(selectedCar.id);
                          closeModal();
                        }}
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => {
                          handleReject(selectedCar.id);
                          closeModal();
                        }}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarApprovalSection;
