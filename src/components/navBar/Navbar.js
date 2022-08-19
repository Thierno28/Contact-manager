import { Link } from "react-router-dom";

import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
const Navbar = () => {
  return (<div className="Container flex items-center pl-20 p-4 bg-[#023e8a]">
  
        <Link to={"/"} className="text-white font-semibold text-xl space-x-2 flex "><PermContactCalendarIcon/><span>Contact Manager</span></Link>
   
  </div>);
};
export default Navbar;
