import axios from 'axios';
const url = `https://localhost:7212/api/EmployeePayslip`

//Axios call for post an item
export const postItem = async (item) => {
    const response = await axios.post(
        url, item
    );

    return response;
};
