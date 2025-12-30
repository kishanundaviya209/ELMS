import { useEffect, useState } from "react";
import {
  getAllLeaves,
  getLeaveByStatus,
  getLeaveByDepartment,
  updateLeave,
  getLeaveByDateRange,
} from "../../../api/leaveRequestAPI";
import { getAllDepartments } from "../../../api/departmentAPI";
import { authHook } from "../../../store/authStore";
import "../../../css/leaveRequest/admin/UpdateLeaveRequest.css";

const UpdateLeaveRequestForm = () => {
  const { user } = authHook();

  const [leaves, setLeaves] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);

  const [status, setStatus] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLeaves();
    loadDepartments();
  }, []);

  const loadLeaves = async () => {
    setLoading(true);
    const res = await getAllLeaves();
    setLeaves(res.data);
    setLoading(false);
  };

  const loadDepartments = async () => {
    const res = await getAllDepartments();
    setDepartments(res.data);
  };

  /* ================= FILTER HANDLERS ================= */

  const handleStatusChange = async (value) => {
    setStatus(value);
    setDepartmentId("");
    setFromDate("");
    setToDate("");

    if (!value) return loadLeaves();

    setLoading(true);
    const res = await getLeaveByStatus(value);
    setLeaves(res.data);
    setLoading(false);
  };

  const handleDepartmentChange = async (value) => {
    setDepartmentId(value);
    setStatus("");
    setFromDate("");
    setToDate("");

    if (!value) return loadLeaves();

    setLoading(true);
    const res = await getLeaveByDepartment(Number(value));
    setLeaves(res.data);
    setLoading(false);
  };

  const handleDateFilter = async () => {
    if (!fromDate || !toDate) {
      alert("Please select both From and To dates");
      return;
    }

    setStatus("");
    setDepartmentId("");

    setLoading(true);
    const res = await getLeaveByDateRange(fromDate, toDate);
    setLeaves(res.data);
    setLoading(false);
  };

  const resetAllFilters = () => {
    setStatus("");
    setDepartmentId("");
    setFromDate("");
    setToDate("");
    loadLeaves();
  };

  /* ================= EDIT / UPDATE ================= */

  const handleEdit = (leave) => {
    if (leave.status === "Canceled") return;
    setSelectedLeave({ ...leave, adminComment: leave.adminComment || "" });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (selectedLeave.status === "Pending") {
      alert("Select Approved or Rejected");
      return;
    }

    const payload = {
      leaveRequestId: selectedLeave.id,
      adminApproveId: String(user?.userId),
      approve: selectedLeave.status === "Approved",
      adminComment: selectedLeave.adminComment,
    };

    await updateLeave(payload);
    alert("Leave updated successfully");

    setSelectedLeave(null);
    loadLeaves();
  };

  const getBadgeClass = (status) =>
    status === "Approved"
      ? "pro-badge pro-approved"
      : status === "Rejected"
      ? "pro-badge pro-rejected"
      : status === "Canceled"
      ? "pro-badge pro-canceled"
      : "pro-badge pro-pending";

  return (
    <div className="pro-bg">
      <div className="container py-4">

        {/* ================= HEADER ================= */}
        <div className="pro-header mb-4">
          <h2>Leave Request Management</h2>
          <p>Manage employee leave approvals easily</p>
        </div>

        {/* ================= FILTER CARD ================= */}
        <div className="pro-card mb-4">
          <div className="pro-card-title">🔍 Filter Leave Requests</div>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Status</label>
              <select
                className="form-select pro-input"
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Department</label>
              <select
                className="form-select pro-input"
                value={departmentId}
                onChange={(e) => handleDepartmentChange(e.target.value)}
              >
                <option value="">All</option>
                {departments.map((d) => (
                  <option key={d.departmentId} value={d.departmentId}>
                    {d.departmentName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row g-3 mt-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label fw-semibold">From Date</label>
              <input
                type="date"
                className="form-control pro-input"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">To Date</label>
              <input
                type="date"
                className="form-control pro-input"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>

            <div className="col-md-4 d-flex gap-2">
              <button className="btn pro-btn w-100" onClick={handleDateFilter}>
                Apply
              </button>
              <button
                className="btn btn-outline-secondary w-100"
                onClick={resetAllFilters}
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* ================= EDIT CARD ================= */}
        {selectedLeave && (
          <div className="pro-card mb-4">
            <div className="pro-card-title">
              ✏️ Edit Leave – {selectedLeave.userName}
            </div>

            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Status</label>
                <select
                  className="form-select pro-input"
                  value={selectedLeave.status}
                  onChange={(e) =>
                    setSelectedLeave({
                      ...selectedLeave,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="Pending" disabled>
                    Pending
                  </option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Admin Comment</label>
                <textarea
                  className="form-control pro-input"
                  rows="3"
                  value={selectedLeave.adminComment}
                  onChange={(e) =>
                    setSelectedLeave({
                      ...selectedLeave,
                      adminComment: e.target.value,
                    })
                  }
                />
              </div>

              <div className="text-end">
                <button className="btn pro-btn-success me-2">
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setSelectedLeave(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= TABLE ================= */}
        <div className="pro-card">
          <div className="pro-card-title">📋 Leave Requests</div>

          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : (
            <table className="table table-hover align-middle mb-0 pro-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {leaves.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-4">
                      No records found
                    </td>
                  </tr>
                ) : (
                  leaves.map((l, i) => (
                    <tr key={l.id}>
                      <td>{i + 1}</td>
                      <td className="fw-semibold">{l.userName}</td>
                      <td>{l.departmentName}</td>
                      <td>{new Date(l.fromDate).toLocaleDateString()}</td>
                      <td>{new Date(l.toDate).toLocaleDateString()}</td>
                      <td className="text-muted">{l.reason}</td>
                      <td>
                        <span className={getBadgeClass(l.status)}>
                          {l.status}
                        </span>
                      </td>
                      <td>
                        {l.status !== "Canceled" ? (
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEdit(l)}
                          >
                            Edit
                          </button>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
};

export default UpdateLeaveRequestForm;
