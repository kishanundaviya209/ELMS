import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getDepartmentById, updateDepartment } from "../../api/departmentAPI";
import "../../css/department/editDept.css"; // Separate CSS file

export default function EditDepartment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState({
    departmentName: "",
    description: "",
  });

  useEffect(() => {
    getDepartmentById(id)
      .then((response) => {
        setDepartment(response.data);
      })
      .catch((error) => {
        console.error("Error fetching department:", error);
        setError("Could not load department details.");
      });
  }, [id]);

  const handleChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!department.departmentName.trim() || !department.description.trim()) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    updateDepartment(id, department)
      .then(() => {
        alert("Department updated successfully!");
        navigate("/home/department");
      })
      .catch((error) => {
        console.error("Error updating department:", error);
        setError("Failed to update department. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="elms-page-container">
      <div className="create-page-wrapper">
        <div className="modern-form-card">
          {/* Left Sidebar: Contextual Info */}
          <div className="form-sidebar edit-mode">
            <div className="edit-badge">
              <i className="bi bi-pencil-square"></i>
            </div>
            <h2>Update Department</h2>
            <p className="mt-3 opacity-75">
              Modify the details for{" "}
              <strong>{department.departmentName || "this unit"}</strong> to
              reflect current organizational changes.
            </p>
          </div>

          {/* Right Side: Form */}
          <div className="form-content">
            <form onSubmit={handleSubmit}>
              <h4 className="fw-bold mb-4 text-dark">Modify Details</h4>

              {error && (
                <div className="alert alert-light border-danger text-danger py-2 small d-flex align-items-center">
                  <i className="bi bi-exclamation-circle-fill me-2"></i> {error}
                </div>
              )}

              <div className="input-group-custom">
                <label>Department Name</label>
                <input
                  type="text"
                  name="departmentName"
                  placeholder="e.g. Finance & Accounting"
                  value={department.departmentName}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group-custom">
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="What are the key goals of this department?"
                  rows="5"
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
                    Save Changes <i className="bi bi-check2-circle ms-1"></i>
                  </>
                )}
              </button>

              <Link to="/home/department" className="back-link">
                <i className="bi bi-chevron-left me-1"></i> Cancel changes
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
