import React from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import Navbar from "../../components/Dashboard/Navbar";
import DashboardFooter from "../../components/Dashboard/DashboardFooter";
import CategoryManager from "../../components/Dashboard/CategoryManager";

const CategoryManagerPage = () => {
  return (
    <div className="ad-dashboard-layout">
      <Sidebar />
      <div className="ad-main-content">
        <Navbar />

        <div className="ad-category-content">
          <CategoryManager />
        </div>

        <DashboardFooter className="ad-dashboard-footer" />
      </div>
    </div>
  );
};

export default CategoryManagerPage;


const css =  `
.ad-category-content {
 
  display: flex;
  flex-direction: column;
  gap: 25px;
  flex-grow: 1;
   background: linear-gradient(135deg, #fbf9f4ff 0%, #e6edf5 100%);
}

.ad-dashboard-layout {
  display: flex;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}

.ad-main-content {
  flex: 1;
  min-width: 0; /* VERY IMPORTANT */
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

   ;`
const style = document.createElement('style');
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);
  