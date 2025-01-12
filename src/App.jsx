import { useEffect, useState } from 'react';
import './App.css';
import { collection, addDoc, query, getDocs, updateDoc,doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { deleteApp } from 'firebase/app';
function App() {
  const [Name, setName] = useState('');
  const [Age, setAge] = useState('');
  const [students, setStudents] = useState([]);
  const onSubmit = async (e) => {
    e.preventDefault();
    const student = { Name, Age: parseInt(Age) };
    try {
      await addDoc(collection(db, 'stud'), student);
      setName('');
      setAge('');
      getStudents();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };
 
  const getStudents = async () => {
    const q = query(collection(db, 'stud'));
    const querySnap = await getDocs(q);
    const studentsList = [];
    querySnap.forEach((doc) => {
      studentsList.push({ ...doc.data(), id: doc.id });
    });
    setStudents(studentsList);
  };
  const Editstud=async(id,Name,Age)=>{
    await updateDoc(doc(db,"stud",id),{
      Name,Age:parseInt(Age)
    })
    getStudents();
  }
  const deletestud=async(id)=>{
    await deleteDoc(doc(db,"stud",id));
    getStudents();
  }
 
  useEffect(() => {
    getStudents();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Management System</h1>
          <p className="text-lg text-gray-600">Efficiently manage your student records with Firebase CRUD operations</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Add New Student</h2>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="Name" className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                  <input
                    type="text"
                    id="name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter student name"
                  />
                </div>
                <div>
                  <label htmlFor="Age" className="block text-sm font-medium text-gray-700 mb-2">Student Age</label>
                  <input
                    type="text"
                    id="age"
                    value={Age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter student age"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Student Records</h2>
            <p className="mt-1 text-sm text-gray-600">Manage and track all student information</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{student.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.Name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.Age}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                      <button 
                        onClick={()=>Editstud(student.id,prompt("Enter new name",student.Name),prompt("Enter new age",student.Age))}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={()=>deletestud(student.id)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;