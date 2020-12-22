export class Clipboard {
    maxSize: number;
    data: string[];

    constructor(maxSize: number=5) {
        this.data = [];
        this.maxSize = maxSize;
    }

    copy(text: string) {
        if (this.data.length >= this.maxSize) {
            this.data.shift();
        } 
        this.data.push(text);
    }

    mergeCopy(text: string) {
        if (this.data) {
            this.data[this.data.length - 1] += text;
        } else {
            this.copy(text);
        }
    }

    paste(): string | undefined {
        if (this.data) {
            return this.data[this.data.length - 1];
        } else {
            return undefined;
        }
    }

    removePaste(): string | undefined {
        return this.data.pop();
    }

    getData() : string[] {
        return this.data;
    }
}