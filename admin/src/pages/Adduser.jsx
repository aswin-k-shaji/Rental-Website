// import React, { useState } from 'react';
// import './add.css';
// import axios from 'axios';
// import { backendUrl } from '../App';
// import { toast } from 'react-toastify';

// const AddUser = ({ token }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [userType, setUserType] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [address, setAddress] = useState('');

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const userData = {
//         name,
//         email,
//         password,
//         userType,
//         phoneNumber,
//         address
//       };

//       const res = await axios.post(backendUrl + "/api/user/add", userData, { headers: { token } });

//       if (res.data.success) {
//         toast.success(res.data.message);
//         setName('');
//         setEmail('');
//         setPassword('');
//         setUserType('');
//         setPhoneNumber('');
//         setAddress('');
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <form onSubmit={onSubmitHandler} className="add-form">
//       <div>
//         <p className="add-label">Name</p>
//         <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Type name here" type="text" className="add-input" required />
//       </div>

//       <div>
//         <p className="add-label">Email</p>
//         <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Type email here" type="email" className="add-input" required />
//       </div>

//       <div>
//         <p className="add-label">Password</p>
//         <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Type password here" type="password" className="add-input" required />
//       </div>

//       <div>
//         <p className="add-label">User Type</p>
//         <select onChange={(e) => setUserType(e.target.value)} value={userType} className="add-select">
//           <option value="">Select User Type</option>
//           <option value="customer">Customer</option>
//         </select>
//       </div>

//       <div>
//         <p className="add-label">Phone Number</p>
//         <input onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} placeholder="Type phone number here" type="text" className="add-input" />
//       </div>

//       <div>
//         <p className="add-label">Address</p>
//         <textarea onChange={(e) => setAddress(e.target.value)} value={address} className="add-textarea" placeholder="Type address here"></textarea>
//       </div>

//       <button type="submit" className="add-button">Add User</button>
//     </form>
//   );
// };

// export default AddUser;
