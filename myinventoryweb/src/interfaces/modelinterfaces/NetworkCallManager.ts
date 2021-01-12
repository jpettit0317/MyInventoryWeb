export abstract class NetworkCallManager {
    readonly urlString: string;

    protected constructor(newUrlString: string = "") {
        this.urlString = newUrlString;
    }

    logResult(): void {}
}

export default NetworkCallManager;