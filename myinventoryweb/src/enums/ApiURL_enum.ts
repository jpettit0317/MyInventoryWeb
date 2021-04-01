
enum ApiURL {
    createUser="/api/createUser",
    verifyLogin="/api/verifyUserLogin",
    addItem="/api/addItem",
    getItems="/api/getItems/:owner/:pageNumber",
    editItem="/api/editItem",
    deleteItem="/api/deleteItem",
    getSessionExpDate="/api/getExpirationDate/:sessionId",
    deleteSession = "/api/deleteSession"
};

export default ApiURL;