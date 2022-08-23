import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";

const AddContact = () => {
  let navigate = useNavigate();

  const [data, setdata] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
    },
    errorMessage: "",
  });

  let updateInput = (event) => {
    setdata({
      ...data,
      contact: {
        ...data.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.createContact(data.contact);
      if (response) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      setdata({ ...data, errorMessage: error.message });
      navigate("/contacts/add", { replace: false });
    }
  };

  let { loading, contact, errorMessage } = data;

  return (
    <div className="flex flex-col space-y-4 p-8 ">
      <div className="flex space-x-2 items-center">
        <span className="text-3xl text-[#067845]">Add Contact</span>
      </div>
      {/* Middle */}
      <div className=" text-gray-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ullam
        temporibus ipsa earum, debitis, veritatis illum pariatur totam dicta in
        et perferendis nemo officiis, quo magni dignissimos nihil eligendi
        fugiat? Vitae beatae error assumenda, ab corporis eos dolores, minus
        repellendus a neque ut quisquam dolorem ratione magnam rem! Ducimus,
        corrupti.
      </div>
      {/* form */}
      <form onSubmit={submitForm} className="w-full md:w-1/3 space-y-5">
        <label className="block">
          <span className=" block text-sm font-medium text-slate-700">
            Name
          </span>
          <input
            required={true}
            value={contact.name}
            onChange={updateInput}
            type="text"
            name="name"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Name …"
          />
        </label>
        <label className="block">
          <span className=" block text-sm font-medium text-slate-700">
            Photo
          </span>
          <input
            required={true}
            value={contact.photo}
            onChange={updateInput}
            type="url"
            name="photo"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Photo url (https://example.com)"
          />
        </label>
        <label className="block">
          <span className=" block text-sm font-medium text-slate-700">
            Mobile
          </span>
          <input
            required={true}
            value={contact.mobile}
            onChange={updateInput}
            type="text"
            name="mobile"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Mobile"
          />
        </label>
        <label className="block">
          <span className=" block text-sm font-medium text-slate-700">
            Email
          </span>
          <input
            required={true}
            value={contact.email}
            onChange={updateInput}
            type="email"
            name="email"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="you@example.com"
          />
        </label>
        <div className="flex space-x-3">
          <input
            type="submit"
            value="Create"
            className="bg-[#067845] text-white p-2 rounded-md text-lg "
          />
          <Link
            to={"/"}
            className="bg-[#e03737] text-white p-3 rounded-md text-lg "
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};
export default AddContact;
