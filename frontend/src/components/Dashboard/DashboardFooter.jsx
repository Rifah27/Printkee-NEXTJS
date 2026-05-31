import React from "react";


const DashboardFooter = () => {
  return (
    <footer className="dashboard-footer">
      © {new Date().getFullYear()} Printkee | All Rights Reserved .
    </footer>
  );
};

export default DashboardFooter;

const css = `
.dashboard-footer {
  width: 100%;
  max-width: 100%;

  margin-top: auto;
  padding: 14px 20px;

  text-align: center;
  font-size: 0.85rem;
  font-weight: 400;

  color: #fff;
  background:  #5b2d8b;

  border-top: 1px solid rgba(91, 45, 139, 0.15);
  backdrop-filter: blur(10px);

  font-family: 'Outfit', system-ui, sans-serif;
}



`;
const style = document.createElement('style');
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);