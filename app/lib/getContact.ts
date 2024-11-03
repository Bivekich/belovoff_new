import { client } from "./sanity";

export async function getContact() {
  const defaultContact = {
    phoneNumber: "7 (999) 999-99-99",
    workingHours: "ежедневно с 11:00 до 22:30"
  };

  try {
    const query = `*[_type == "contact"][0]`;
    const data = await client.fetch(query, {}, { 
      cache: 'no-store' 
    });
    
    if (!data) {
      return defaultContact;
    }

    return {
      phoneNumber: data.phoneNumber || defaultContact.phoneNumber,
      workingHours: data.workingHours || defaultContact.workingHours
    };
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return defaultContact;
  }
} 