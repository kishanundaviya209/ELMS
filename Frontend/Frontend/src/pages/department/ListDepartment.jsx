// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { deleteDepartment, getAllDepartments } from "../../api/departmentAPI";
// import { authHook } from "../../store/authStore";
// import "../../css/department/deptList.css";

// export default function ListDepartment() {
//   const { user } = authHook();

//   const [departments, setDepartments] = useState([]);

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       getAllDepartments()
//         .then((response) => {
//           setDepartments(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching departments:", error);
//         });
//     };

//     fetchDepartments();
//   }, []);

//   const handleDelete = (departmentId) => {
//     if (window.confirm("Are you sure you want to delete this department?")) {
//       deleteDepartment(departmentId).then(() => {
//         setDepartments(
//           departments.filter((d) => d.departmentId !== departmentId)
//         );
//       });
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card shadow-lg p-4" style={{ borderRadius: "15px" }}>
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h3 className="fw-bold text-primary">Department List</h3>

//           {user?.role === "Admin" && (
//             <Link to="/home/department/create" className="btn btn-success">
//               Add Department
//             </Link>
//           )}
//         </div>

//         <table className="table table-bordered table-hover text-center">
//           <thead className="table-dark">
//             <tr>
//               <th style={{ width: "80px" }}>Index</th>
//               <th>Department Name</th>
//               <th>Description</th>
//               {user?.role === "Admin" && (
//                 <th style={{ width: "210px" }}>Action</th>
//               )}
//             </tr>
//           </thead>

//           <tbody>
//             {departments.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="text-muted">
//                   No departments found
//                 </td>
//               </tr>
//             ) : (
//               departments.map((d, index) => (
//                 <tr key={d.departmentId}>
//                   <td>{index + 1}</td>
//                   <td>{d.departmentName}</td>
//                   <td>{d.description}</td>

//                   {user?.role === "Admin" && (
//                     <td>
//                       <Link
//                         to={`/home/department/edit/${d.departmentId}`}
//                         className="btn btn-primary btn-sm me-2"
//                       >
//                         {" "}
//                         Edit{"  "}
//                       </Link>

//                       <button
//                         className="btn btn-danger btn-sm"
//                         onClick={() => handleDelete(d.departmentId)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   )}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// =====================================================New Design================================================================

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDepartment, getAllDepartments } from "../../api/departmentAPI";
import { authHook } from "../../store/authStore";
import "../../css/department/deptList.css";

export default function ListDepartment() {
  const { user } = authHook();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getAllDepartments()
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      deleteDepartment(id).then(() => {
        setDepartments(departments.filter((d) => d.departmentId !== id));
      });
    }
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="dept-header mb-4 py-4">
        <h2 className="fw-bold text-gradient">Departments</h2>

        {user?.role === "Admin" && (
          <Link to="/home/department/create" className="btn btn-add">
            + Add Department
          </Link>
        )}
      </div>

      {/* Cards */}
      <div className="row">
        {departments.length === 0 ? (
          <p className="text-center text-muted">No departments found</p>
        ) : (
          departments.map((d) => (
            <div
              className="col-xl-4 col-lg-6 col-md-6 mb-4"
              key={d.departmentId}
            >
              <div className="dept-card">
                <div className="dept-card-body">
                  <h5 className="dept-title">{d.departmentName}</h5>
                  <p className="dept-desc">{d.description}</p>
                </div>

                {user?.role === "Admin" && (
                  <div className="dept-card-footer">
                    <Link
                      to={`/home/department/edit/${d.departmentId}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(d.departmentId)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
