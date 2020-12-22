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

    }

    paste(): string | undefined {
        return this.data.pop();
    }

    getData() : string[] {
        return this.data;
    }
}