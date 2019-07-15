// export const getAbsencesBySubjectId = async (subjectId, academicYear, semester) => {
//     return fetchHelpers.get(`https://api.github.com/users/${subjectId}/repos`);
// };

export const createAbsences = async data => {
    return fetchHelpers.post("/catalog/absences", data);
};

// https://medium.com/yellowcode/download-api-files-with-react-fetch-393e4dae0d9e
const fetchHelpers = {
    get: async url => {
        const config = {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        };
        const response = await fetch(url, config);
        if (response.ok) {
            return response.json(); // it returns a Promise here, not a concrete object
        }
        // if an errors, anything but 200 then reject with the actual response
        return Promise.reject(response);
    },
    post: async (url, data) => {
        const config = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data) // data can be `string` or {object}!
        };
        const response = await fetch(url, config);
        if (response.ok) {
            return response.json(); // it returns a Promise here, not a concrete object
        }
        // if an errors, anything but 200 then reject with the actual response
        return Promise.reject(response);
    }
};
