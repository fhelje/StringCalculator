// module for Jasmine

interface expectResults {
}

interface IJasmineSinonExpectResults {
    toBeTruthy(): bool;
    (): string;
    (): number;
    (): any;
    toEqual(expected: string): bool;
    toEqual(expected: any): bool;
    toHaveBeenCalled(): bool;
    toHaveBeenCalledOnce(): bool;
    toHaveBeenCalledTwice(): bool;
    toHaveBeenCalledThrice(): bool;
    toHaveBeenCalledWith(x: any): bool;
    toBe(x: any): any;
    toHaveClass(x: string): bool;
    toThrow(x: string): bool;
    toHaveAttr(name: string, value: string): bool;
    toHaveText(text: string): bool;
    toBeVisible(): bool;
    not: any;
}

declare module describe {
    export function(testDescription: string, f: Function) : any ;
}

declare module it {
    export function(testDescription: string, f: Function) : any ;
}

declare module expect {
    //export function (actual: any): expectResults;
    export function (actual: any): IJasmineSinonExpectResults;
}

declare module beforeEach {
    export function (f: Function): any;
}

declare module afterEach {
    export function (f: Function): any;
}

declare module waits {
    export function (seconds: number): any;
}

declare module runs {
    export function (f: Function): any;
}
