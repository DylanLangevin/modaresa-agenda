import { Appointment } from "../models/Appointment"
import { Vendor } from "../models/Vendor"
import { Buyer } from "../models/Buyer"

const index = async(): Promise<Appointment> => {

    const vendor: Vendor = { id: 1, name: 'Vendor X' };
    const buyer: Buyer = { id: 1, name: 'Buyer A', companyName: 'Company A' };

    const mockAppointment = {
        id:1,
        title:"RDV",
        type:'virtual',
        location:"Rue des mecs stylés",
        host:vendor,
        client:buyer,
        startTime:new Date('2024-09-09T10:00:00Z'),
        endTime:new Date('2024-09-09T10:00:00Z')
    }

    try {
        // return await mockAppointment;
        return mockAppointment;
    }
    catch(error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
}

export default {
    index
}