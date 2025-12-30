// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { createDepartment } from "../../api/departmentAPI";

// export default function CreateDepartment() {
//   const navigate = useNavigate();

//   const [error, setError] = useState("");

//   const [department, setDepartment] = useState({
//     departmentName: "",
//     description: "",
//   });

//   const handleChange = (e) => {
//     setDepartment({ ...department, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!department.departmentName) {
//       setError("Department Name is required");
//       return;
//     }
//     if (!department.description) {
//       setError("Department Description is required");
//       return;
//     }

//     createDepartment(department)
//       .then(() => {
//         alert("Department created successfully!");
//         navigate("/home/department");
//       })
//       .catch((error) => {
//         console.error("Error creating department:", error);
//         setError("Failed to create department. Please try again.");
//       });
//   };

//   return (
//     <div className="d-flex justify-content-center mt-5">
//       <div
//         className="card shadow-lg p-4"
//         style={{ width: "500px", borderRadius: "15px" }}
//       >
//         <h3 className="text-center mb-3 fw-bold text-primary">
//           Add New Department
//         </h3>

//         {error && <div className="alert alert-danger">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Department Name</label>
//             <input
//               type="text"
//               className="form-control"
//               name="departmentName"
//               placeholder="Enter Department Name"
//               value={department.departmentName}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label fw-semibold">
//               Department Description
//             </label>
//             <textarea
//               className="form-control"
//               placeholder="Enter Department Description"
//               name="description"
//               value={department.description}
//               onChange={handleChange}
//             />
//           </div>

//           <button
//             className="btn btn-primary w-100 mt-3 py-2"
//             type="submit"
//             style={{ borderRadius: "10px", fontSize: "16px" }}
//           >
//             Add Department
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

//=========================================================New Design Code============================================================

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createDepartment } from "../../api/departmentAPI";
import "../../css/department/createDept.css";

export default function CreateDepartment() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState({
    departmentName: "",
    description: "",
  });

  const handleChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!department.departmentName || !department.description) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await createDepartment(department);
      navigate("/home/department");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="elms-page-container">
      <div className="create-page-wrapper">
        <div className="modern-form-card">
          {/* Left Sidebar */}
          <div className="form-sidebar">
            <div className="edit-badge">
              <i className="bi bi-building-add"></i>
            </div>
            <h2>Create Department</h2>
            <p className="mt-3 opacity-75">
              Add a new department to organize teams and improve workflow.
            </p>
          </div>

          {/* Right Form */}
          <div className="form-content">
            <form onSubmit={handleSubmit}>
              <h4 className="fw-bold mb-4 text-dark">Department Details</h4>

              {error && (
                <div className="alert alert-light border-danger text-danger py-2 small d-flex align-items-center">
                  <i className="bi bi-exclamation-circle-fill me-2"></i>
                  {error}
                </div>
              )}

              <div className="input-group-custom">
                <label>Department Name</label>
                <input
                  type="text"
                  name="departmentName"
                  placeholder="e.g. Engineering"
                  value={department.departmentName}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group-custom">
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Describe the department goals..."
                  rows="2"
                  value={department.description}
                  onChange={handleChange}
                />
              </div>

              <button
                className="btn-modern-submit"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  <>
                    Create Department{" "}
                    <i className="bi bi-check-circle ms-1"></i>
                  </>
                )}
              </button>

              <Link to="/home/department" className="back-link">
                <i className="bi bi-chevron-left me-1"></i> Cancel and go back
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
