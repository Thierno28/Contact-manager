import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Search from "../../../assets/Search.png";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../spinner/Spinner";
const ContactList = () => {
  let [query, setQuery] = useState({
    text: "",
  });

  let searchContact = (event) => {
    setQuery({
      ...query,
      text: event.target.value,
    });
    let theContacts = data.contacts.filter((contact) => {
      return contact.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setdata({
      ...data,
      filterContacts: theContacts,
    });
  };

  const [data, setdata] = useState({
    loading: false,
    contacts: [],
    filterContacts: [],
    errorMessage: "",
  });

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setdata({ ...data, loading: true });
        let response = await ContactService.getAllContacts();
        setdata({
          ...data,
          loading: false,
          contacts: response.data,
          filterContacts: response.data,
        });
      } catch (error) {
        setdata({
          ...data,
          loading: false,
          contacts: error.message,
        });
      }
    };
    fetchdata();
  }, []);

  let clickDelete = async (id) => {
    try {
      let response = await ContactService.deleteContact(id);
      if (response) {
        setdata({ ...data, loading: true });
        let response = await ContactService.getAllContacts();
        setdata({
          ...data,
          loading: false,
          contacts: response.data,
          filterContacts: response.data,
        });
      }
    } catch (error) {
      setdata({
        ...data,
        loading: false,
        contacts: error.message,
      });
    }
  };

  let { loading, contacts, filterContacts, errorMessage } = data;

  return (
    <div className="flex flex-col space-y-3 p-8 bg-[#caf0f8]">
      {/* Contact Search */}
      <div className="flex flex-col space-y-4">
        {/* top */}
        <div className="flex space-x-2 items-center">
          <span className="text-lg">Phone Directory</span>
          <Link
            to={"/contacts/add"}
            className="flex items-center text-white bg-green-700 p-2 pr-3 rounded-lg hover:bg-green-600"
          >
            <AddIcon fontSize="small" className="" />
            <span>New</span>
          </Link>
        </div>
        {/* Middle */}
        <div className=" text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ullam
          temporibus ipsa earum, debitis, veritatis illum pariatur totam dicta
          in et perferendis nemo officiis, quo magni dignissimos nihil eligendi
          fugiat? Vitae beatae error assumenda, ab corporis eos dolores, minus
          repellendus a neque ut quisquam dolorem ratione magnam rem! Ducimus,
          corrupti.
        </div>
        {/* search bar */}
        <div className="flex pt-8">
          <form className="flex items-center space-x-2">
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <img src={Search} alt="" />
              </span>
              <input
                className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-full py-1 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Search …"
                type="text"
                name="text"
                value={query.text}
                onChange={searchContact}
              />
            </label>
            <button className="bg bg-[#03045e] text-white  p-1 px-2 rounded-md hover:bg-[#023e8a]">
              Search
            </button>
          </form>
        </div>
        {/* contacs */}
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid md:grid-cols-2 gap-7 px-8 grid-cols-1">
            {/* contact */}
            {filterContacts.length > 0 &&
              filterContacts.map((contact) => {
                return (
                  <div
                    key={contact.id}
                    className="flex flex-col md:flex-row p-3 rounded-lg bg-white  items-center"
                  >
                    <img
                      src={contact.photo}
                      alt=""
                      className="w-48 h-48 rounded-full"
                    />

                    {/* Contact information */}
                    <ul className="p-4 w-full">
                      <li className="p-3 border space-x-2 flex items-center">
                        <span className="bg font-light text-gray-500">
                          Name:
                        </span>
                        <span className="font-semibold">{contact.name}</span>
                      </li>
                      <li className="p-3 border space-x-2">
                        <span className="bg font-light text-gray-500">
                          Mobile:
                        </span>
                        <span className="font-semibold">{contact.mobile}</span>
                      </li>
                      <li className="p-3 border space-x-2">
                        <span className="bg font-light text-gray-500">
                          Email:
                        </span>
                        <span className="font-semibold">{contact.email}</span>
                      </li>
                    </ul>
                    {/* buttons */}
                    <ul className="p-4 w-full space-y-1 flex flex-col">
                      <Link to={`/contacts/view/${contact.id}`} className="">
                        <li className=" p-3   flex justify-center bg-yellow-300 hover:bg-yellow-200 rounded-md">
                          <VisibilityIcon />
                        </li>
                      </Link>
                      <Link to={`/contacts/edit/${contact.id}`}>
                        <li className="p-3   flex justify-center bg-blue-600 hover:bg-blue-500 text-white rounded-md">
                          <ModeEditOutlineIcon />
                        </li>
                      </Link>
                      <Link
                        to={"/"}
                        onClick={() => {
                          clickDelete(contact.id);
                        }}
                      >
                        <li className="p-3  space-x-2 flex justify-center bg-red-600 hover:bg-red-500 text-white rounded-md">
                          <DeleteForeverIcon />
                        </li>
                      </Link>
                    </ul>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};
export default ContactList;
