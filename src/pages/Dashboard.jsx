import { useState, useEffect, useRef } from 'react';
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import firebaseApp from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Dashboard() {

   // const [addEmployeeVisible, setAddEmployeeVisible] = useState(false);

   // const handleAddEmployeeClick = () => {
   //    setAddEmployeeVisible(true);
   // }

   const [employeeList, setEmployeList] = useState([]);

   useEffect(() => {
      const db = getFirestore(firebaseApp);

      try {
         onSnapshot(collection(db, 'employees'), snapshot => {
            const newEmployeeList = [];

            snapshot.forEach(employee => {
               const tempEmployee = employee.data();
               tempEmployee["employee_id"] = employee.id;
               newEmployeeList.push(tempEmployee);
            });
            setEmployeList(newEmployeeList);
         });
      } catch (e) {
         alert ("Could not fetch data!");
      }
   }, [])

   const deleteEmployee = (employeeID, firstname, lastname,) => {

      // Initialize Cloud Firestore and get a reference to the service
      const db = getFirestore(firebaseApp);

      let userConfirmed = window.confirm(`Are you sure you want to delete ${firstname} ${lastname}?`);

      if(userConfirmed) {
         //If confirmed, delete document
         deleteDoc(doc(db, 'employees', employeeID))
         .then(() => {
            //Additional logic after deletion if needed
         })
         .catch((error) => {
            console.error('Error deleting document: ', error);
         });
      } else {
         console.log('Deletion canceled by user');
      }
   };

   return (
      <section className="container-fluid">
         <h1 className="fw-bold">Employee Records</h1>
         <p>This is a list of employee records</p>

         <table className="table table-striped">
            <thead>
               <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Job Title</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody>
               {employeeList.map((employeeRecord) => (
                  <tr className='border' key={employeeRecord.id}>
                     <td>{employeeRecord.employee_id}</td>
                     <td>{employeeRecord.firstname}</td>
                     <td>{employeeRecord.lastname}</td>
                     <td>{employeeRecord.email}</td>
                     <td>{employeeRecord.jobtitle}</td>
                     
                     <td>
                        <small>
                           <button className="btn btn-secondary btn-sm">📝</button>
                           <button onClick={() => 
                              deleteEmployee(employeeRecord.employee_id, employeeRecord.firstname, employeeRecord.lastname, employeeRecord.email,
                              employeeRecord.address, employeeRecord.gender, employeeRecord.contact, employeeRecord.jobtitle, employeeRecord.hiredate)
                           } className="btn btn-danger btn-sm">🗑️</button>
                        </small>
                     </td>
                  </tr>
               ))}
               
            </tbody>
         </table>
   
      </section>
   )
}

export default Dashboard;