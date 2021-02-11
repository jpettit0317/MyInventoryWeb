import axios from "axios";

class MyInventoryNetworkCallManager {

    static getItemsForUser(user: string): Promise<string> {
        return new Promise ( async (resolve, reject) => {
            const url = MyInventoryNetworkCallManager.getItemUrl(user);
            await axios.get(url).then((data) => {
                const dataAsJson = JSON.stringify(data.data);
                resolve(dataAsJson);
            }).catch((rejectionReason) => {
                console.log("Failed to get data " + rejectionReason);
                reject("");
            });
        });
    }

    private static getItemUrl(user: string): string {
        return `http://localhost:4000/api/getItems/${user}`;
    }
}

export default MyInventoryNetworkCallManager;