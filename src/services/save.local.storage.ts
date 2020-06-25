
export class StorageService {

    /**
     * Set the custom item in local storage
     */
    set(key: string, value: any) {
            return localStorage.setItem(key, JSON.stringify(value));
    }
    /**
     * get the custom item in local storage
     */
    get(key: string) {
            return JSON.parse(<string>localStorage.getItem(key));
    }
    /**
     * destroy the custom item in local storage
     */
    destroy(key: string) {
            return localStorage.removeItem(key);
    }

}
