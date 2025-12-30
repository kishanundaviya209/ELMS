// import { useEffect, useState } from "react";
// import {
//   applyLeave,
//   getLeaveByUserId,
//   cancelLeave,
// } from "../../../api/leaveRequestAPI";
// import { authHook } from "../../../store/authStore";

// const LeaveRequestForm = () => {
//   const { user } = authHook();

//   const [error, setError] = useState("");
//   const [leaves, setLeaves] = useState([]);

//   const [form, setForm] = useState({
//     reason: "",
//     fromDate: "",
//     toDate: "",
//     departmentId: 0,
//     applicantId: "",
//   });

//   const loadLeaves = async () => {
//     if (!user?.userId) return;
//     const res = await getLeaveByUserId(user.userId);
//     setLeaves(res.data);
//   };

//   useEffect(() => {
//     loadLeaves();
//   }, [user]);

//   /* ================= SUBMIT ================= */

//   const submit = async (e) => {
//     e.preventDefault();

//     // ✅ VALIDATION
//     if (!form.reason) {
//       setError("Reason is required");
//       return;
//     }

//     if (!form.fromDate) {
//       setError("From date is required");
//       return;
//     }

//     if (!form.toDate) {
//       setError("To date is required");
//       return;
//     }

//     // Optional: Date validation
//     if (new Date(form.fromDate) > new Date(form.toDate)) {
//       setError("From date cannot be greater than To date");
//       return;
//     }

//     // ✅ CLEAR ERROR BEFORE API CALL
//     setError("");

//     const payload = {
//       ...form,
//       applicantId: user.userId,
//       departmentId: user.departmentId,
//     };

//     try {
//       await applyLeave(payload);

//       // ✅ SUCCESS ALERT
//       alert("Leave applied successfully");

//       // ✅ RESET FORM
//       setForm({
//         reason: "",
//         fromDate: "",
//         toDate: "",
//         departmentId: 0,
//         applicantId: "",
//       });

//       // ✅ RELOAD LIST
//       loadLeaves();
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   /* ================= STATUS BADGE ================= */

//   const statusBadge = (status) => {
//     switch (status) {
//       case "Approved":
//         return "badge bg-success";
//       case "Rejected":
//         return "badge bg-danger";
//       case "Canceled":
//         return "badge bg-secondary";
//       default:
//         return "badge bg-warning text-dark";
//     }
//   };

//   /* ================= CANCEL LEAVE ================= */

//   const handleCancel = async (leaveId) => {
//     const confirmCancel = window.confirm(
//       "Are you sure you want to cancel this leave?"
//     );
//     if (!confirmCancel) return;

//     await cancelLeave(leaveId);
//     loadLeaves();
//   };

//   return (
//     <div className="container mt-4">
//       <h3 className="mb-4 fw-bold text-primary">Leave Management</h3>

//       {/* APPLY LEAVE */}
//       <div className="card shadow-sm mb-4">
//         <div className="card-header fw-semibold">Apply for Leave</div>
//         <div className="card-body">
//           <form onSubmit={submit}>
//             <div className="row">
//               <div className="col-md-4 mb-3">
//                 <label className="form-label">Reason</label>
//                 <textarea
//                   rows={1}
//                   className="form-control"
//                   value={form.reason}
//                   onChange={(e) => setForm({ ...form, reason: e.target.value })}
//                 />
//               </div>

//               <div className="col-md-3 mb-3">
//                 <label className="form-label">From Date</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   value={form.fromDate}
//                   onChange={(e) =>
//                     setForm({ ...form, fromDate: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="col-md-3 mb-3">
//                 <label className="form-label">To Date</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   value={form.toDate}
//                   onChange={(e) => setForm({ ...form, toDate: e.target.value })}
//                 />
//               </div>

//               <div className="col-md-2 d-flex align-items-end mb-3">
//                 <button className="btn btn-success w-100">Apply</button>
//               </div>

//               {error && (
//                 <div className="col-12">
//                   <div className="alert alert-danger mt-2">{error}</div>
//                 </div>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* LEAVE HISTORY */}
//       <div className="card shadow-sm">
//         <div className="card-header fw-semibold">Leave History</div>
//         <div className="card-body p-0">
//           <table className="table table-hover mb-0">
//             <thead className="table-light">
//               <tr>
//                 <th>#</th>
//                 <th>Reason</th>
//                 <th>From</th>
//                 <th>To</th>
//                 <th>Status</th>
//                 <th>Admin Comments</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {leaves.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="text-center py-3">
//                     No leave requests found
//                   </td>
//                 </tr>
//               ) : (
//                 leaves.map((l, index) => (
//                   <tr key={l.id}>
//                     <td>{index + 1}</td>
//                     <td>{l.reason}</td>
//                     <td>{new Date(l.fromDate).toLocaleDateString()}</td>
//                     <td>{new Date(l.toDate).toLocaleDateString()}</td>
//                     <td>
//                       <span className={statusBadge(l.status)}>{l.status}</span>
//                     </td>
//                     <td>{l.adminComment || "-"}</td>
//                     <td>
//                       {l.status === "Pending" ? (
//                         <button
//                           className="btn btn-sm btn-outline-danger"
//                           onClick={() => handleCancel(l.id)}
//                         >
//                           Cancel
//                         </button>
//                       ) : (
//                         "-"
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeaveRequestForm;

//========================================================New Design Code===========================================================

import { useEffect, useState } from "react";
import {
  applyLeave,
  getLeaveByUserId,
  cancelLeave,
} from "../../../api/leaveRequestAPI";
import { authHook } from "../../../store/authStore";
import "../../../css/leaveRequest/user/leaveReqForm.css";

const LeaveRequestForm = () => {
  const { user } = authHook();

  const [error, setError] = useState("");
  const [leaves, setLeaves] = useState([]);

  const [form, setForm] = useState({
    reason: "",
    fromDate: "",
    toDate: "",
    departmentId: 0,
    applicantId: "",
  });

  const loadLeaves = async () => {
    if (!user?.userId) return;
    const res = await getLeaveByUserId(user.userId);
    setLeaves(res.data);
  };

  useEffect(() => {
    loadLeaves();
  }, [user]);

  /* ================= SUBMIT ================= */

  const submit = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!form.reason) {
      setError("Reason is required");
      return;
    }

    if (!form.fromDate) {
      setError("From date is required");
      return;
    }

    if (!form.toDate) {
      setError("To date is required");
      return;
    }

    // Optional: Date validation
    if (new Date(form.fromDate) > new Date(form.toDate)) {
      setError("From date cannot be greater than To date");
      return;
    }

    // ✅ CLEAR ERROR BEFORE API CALL
    setError("");

    const payload = {
      ...form,
      applicantId: user.userId,
      departmentId: user.departmentId,
    };

    try {
      await applyLeave(payload);

      // ✅ SUCCESS ALERT
      alert("Leave applied successfully");

      // ✅ RESET FORM
      setForm({
        reason: "",
        fromDate: "",
        toDate: "",
        departmentId: 0,
        applicantId: "",
      });

      // ✅ RELOAD LIST
      loadLeaves();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  /* ================= STATUS BADGE ================= */

  const getBadgeClass = (status) =>
    status === "Approved"
      ? "pro-badge pro-approved"
      : status === "Rejected"
      ? "pro-badge pro-rejected"
      : status === "Canceled"
      ? "pro-badge pro-canceled"
      : "pro-badge pro-pending";

  /* ================= CANCEL LEAVE ================= */

  const handleCancel = async (leaveId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this leave?"
    );
    if (!confirmCancel) return;

    await cancelLeave(leaveId);
    loadLeaves();
  };

  return (
    <div className="pro-bg">
      <div className="container py-4">
        {/* ================= HEADER ================= */}
        <div className="pro-header mb-4">
          <h2>My Leave Requests</h2>
          <p>Apply for leave and track approval status</p>
        </div>

        {/* ================= APPLY LEAVE ================= */}
        <div className="pro-card mb-4">
          <div className="pro-card-title">📝 Apply Leave</div>

          <form onSubmit={submit}>
            <div className="row g-3">
              {/* Reason */}
              <div className="col-md-12">
                <label className="form-label fw-semibold">Leave Reason</label>
                <textarea
                  className="form-control pro-input"
                  rows="3"
                  placeholder="Medical / Personal / Vacation"
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                />
              </div>

              {/* From Date */}
              <div className="col-md-5">
                <label className="form-label fw-semibold">From Date</label>
                <input
                  type="date"
                  className="form-control pro-input"
                  value={form.fromDate}
                  onChange={(e) =>
                    setForm({ ...form, fromDate: e.target.value })
                  }
                />
              </div>

              {/* To Date */}
              <div className="col-md-5">
                <label className="form-label fw-semibold">To Date</label>
                <input
                  type="date"
                  className="form-control pro-input"
                  value={form.toDate}
                  onChange={(e) => setForm({ ...form, toDate: e.target.value })}
                />
              </div>

              {/* Button */}
              <div className="col-md-2 d-flex align-items-end">
                <button className="btn pro-btn w-100">Apply</button>
              </div>

              {/* Error */}
              {error && (
                <div className="col-12">
                  <div className="alert alert-danger mt-2 mb-0">{error}</div>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* ================= HISTORY ================= */}
        <div className="pro-card">
          <div className="pro-card-title">📋 Leave History</div>

          <table className="table table-hover align-middle mb-0 pro-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Reason</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Admin Comment</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {leaves.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">
                    No leave requests found
                  </td>
                </tr>
              ) : (
                leaves.map((l, i) => (
                  <tr key={l.id}>
                    <td>{i + 1}</td>
                    <td>{l.reason}</td>
                    <td>{new Date(l.fromDate).toLocaleDateString()}</td>
                    <td>{new Date(l.toDate).toLocaleDateString()}</td>
                    <td>
                      <span className={getBadgeClass(l.status)}>
                        {l.status}
                      </span>
                    </td>
                    <td className="text-muted">{l.adminComment || "—"}</td>
                    <td>
                      {l.status === "Pending" ? (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleCancel(l.id)}
                        >
                          Cancel
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
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestForm;
