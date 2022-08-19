import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../spinner/Spinner";
const ViewContact = () => {
  let { contactId } = useParams();

  const [data, setdata] = useState({
    loading: false,
    contact: [],
    errorMessage: "",
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

  let { loading, contact, errorMessage } = data;
  return loading ? (
    <Spinner />
  ) : (
    Object.keys(contact).length > 0 && (
      <div className="flex flex-col md:flex-row space-x-6 justify-center p-40 items-center">
        <img src={contact.photo} alt="" className="w-80 h-80 rounded-full" />
        <div className="flex flex-col divide-x  ">
          <div className="flex flex-row space-x-2 p-6 items-center">
            <span className="text text-gray-600">Name:</span>
            <span className=" text-lg">{contact.name}</span>
          </div>
          <div className="flex flex-row space-x-2 p-6 items-center">
            <span className="text text-gray-600">Mobile:</span>
            <span className=" text-lg">{contact.mobile}</span>
          </div>
          <div className="flex flex-row space-x-2 p-6 items-center">
            <span className="text text-gray-600">Email:</span>
            <span className=" text-lg">{contact.email}</span>
          </div>
        </div>
        <Link to={"/"} className="p-5 bg-green-700 text-white rounded-md">
          Back
        </Link>
      </div>
    )
  );
};
export default ViewContact;
