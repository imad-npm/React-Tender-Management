import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
  const linkStyles = "px-3 py-2 rounded-md text-sm font-medium";
  const activeLinkStyles = "bg-blue-100 text-blue-700";
  const inactiveLinkStyles = "text-gray-500 hover:bg-gray-100 hover:text-gray-700";

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start h-16">
          <div className="flex items-baseline space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`
              }
            >
              Tender List
            </NavLink>
            <NavLink
              to="/pipeline"
              className={({ isActive }) =>
                `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`
              }
            >
              Pipeline View
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
