export class Clipboard {
    maxSize: number;
    data: string[];

    /**
     * Initialize clipboard object's internal state
     * @param {number} maxSize Maximum number of entries in clipboard
     */
    constructor(maxSize: number=5) {
        this.data = [];
        this.maxSize = maxSize;
    }

    /**
     * Add selected text as a new entry
     * @param {string} text entry to be added to clipboard
     */
    copy(text: string) {
        if (this.data.length >= this.maxSize) {
            this.data.shift();
        } 
        this.data.push(text);
    }

    /**
     * Append selected text to the most recent entry
     * @param {string} text entry to be added to clipboard
     */
    mergeCopy(text: string) {
        if (this.data) {
            this.data[this.data.length - 1] += text;
        } else {
            this.copy(text);
        }
    }

    /**
     * Get the most recent copied text
     * @returns {string | undefined} most recent entry in clipboard or undefined if clipboard is empty
     */
    paste(): string | undefined {
        if (this.data) {
            return this.data[this.data.length - 1];
        } else {
            return undefined;
        }
    }

    /**
     * Remove and get the most recent copied text 
     * @returns {string | undefined} most recent entry in clipboard or undefined if clipboard is empty
     */
    removePaste(): string | undefined {
        return this.data.pop();
    }

    /**
     * @returns {string[]} current entries in clipboard 
     */
    getData() : string[] {
        return this.data;
    }
}