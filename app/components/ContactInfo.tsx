import { getContact } from "../lib/getContact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

export default async function ContactInfo() {
  const contactInfo = await getContact();

  return (
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={faPhone} className="text-[#1271CE] size-4"/> 
      <span className="text-sm">{contactInfo.phoneNumber}</span>
      <span className="text-sm text-gray-400 ml-2">
        {contactInfo.workingHours}
      </span>
    </div>
  );
} 