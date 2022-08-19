import { useEffect, useState } from "react";
import { Link, useParams, useNavigate} from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
const EditContact = () => {

  let navigate = useNavigate();
  let { contactId } = useParams();

  let [data, setdata] = useState({
    loading: false,
    contact: {},
    errorMessage: " ",
  });

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setdata({ ...data, loading: true });
        let response = await ContactService.getContact(contactId);
        setdata({
          ...data,
          loading: false,
          contact: response.data,
        });
      } catch (error) {
        setdata({
          ...data,
          loading: false,
          errorMessage: error.message,
        });
      }
    };
    fetchdata();
  }, [contactId]);

  let updateInput = (event) => {
    setdata({
      ...data,
      contact: {
        ...data.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  let submitForm = async (event) => {
    
    try {
    const response = await ContactService.updateContact(data.contact, contactId);
    
    if (response) {
      navigate("/", { replace: true });
    }
  } catch (error) {
    setdata({ ...data, errorMessage: error.message });
    navigate(`/contacts/edit/${contactId }`, { replace: false });
  }
  
  event.prevenDefault();

  };

  let { loading, contact, errorMessage } = data;

  return (
    <div className="flex flex-col space-y-4 p-8 ">
      <div className="flex space-x-2 items-center">
        <span className="text-3xl">Edit Contact</span>
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
      <div className="flex flex-col-reverse md:flex-row items-center md:space-x-10 ">
        {/* form */}
        <form className="w-full md:w-1/3 space-y-5" onSubmit={submitForm}>
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
              placeholder="Photo url"
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
              value="Update"
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
        <img src={contact.photo} alt="" className="w-48 h-48 rounded-full" />
      </div>
    </div>
  );
};
export default EditContact;
