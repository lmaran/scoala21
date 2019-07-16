export const createAbsences = async data => {
    return fetchHelpers.post("/catalog/absences", data);
};

export const deleteGradebookItem = async itemId => {
    return fetchHelpers.delete(`/catalog/${itemId}`);
};

// https://medium.com/yellowcode/download-api-files-with-react-fetch-393e4dae0d9e
const fetchHelpers = {
    get: async url => {
        const config = {
            method: "GET",
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
            method: "POST",
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
    },
    delete: async url => {
        const config = {
            method: "DELETE"
        };
        const response = await fetch(url, config);
        if (response.ok && response.status === 204) {
            return null; // OK, no content
        }
        // if an errors, then reject with the actual response
        return Promise.reject(response);
    }
};
