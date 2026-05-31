import React from "react";

const TableView = ({ columns, data, onEdit, onDelete }) => (
  <table className="admin-table">
    <thead>
      <tr>
        {columns.map((col, i) => (
          <th key={i}>{col}</th>
        ))}
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.length === 0 ? (
        <tr>
          <td colSpan={columns.length + 1} style={{ textAlign: "center" }}>
            No records found
          </td>
        </tr>
      ) : (
        data.map((row, i) => (
          <tr key={i}>
            {Object.values(row).map((val, idx) => (
              <td key={idx}>{String(val)}</td>
            ))}
            <td>
              <button
                onClick={() => onEdit(row)}
                className="edit-btn"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(row._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
);

export default TableView;

const css = `
.admin-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--ad-white);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--ad-shadow-soft);
}

.admin-table th,
.admin-table td {
  padding: 12px 15px;
  border-bottom: 1px solid rgba(75, 32, 97, 0.15);
  font-size: 14px;
  color: var(--ad-text-dark);
}

.admin-table th {
  background: var(--ad-primary);
  color: var(--ad-white);
  text-align: left;
  font-weight: 600;
}

.admin-table tr:hover td {
  background: rgba(75, 32, 97, 0.04);
}

.edit-btn,
.delete-btn {
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  margin-right: 6px;
  cursor: pointer;
  font-family: 'Outfit', sans-serif;
  color: var(--ad-white);
  font-size: 13px;
  transition: background 0.2s ease, transform 0.2s ease;
}

.edit-btn {
  background: var(--ad-accent);
}

.edit-btn:hover {
  background: var(--ad-accent-light);
  transform: translateY(-1px);
}

.delete-btn {
  background: #c62828;
}

.delete-btn:hover {
  background: #9a1f1f;
  transform: translateY(-1px);
}
`;

const style = document.createElement("style");
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);
