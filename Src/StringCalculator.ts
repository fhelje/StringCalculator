interface IStringCalculator {
    calculate(numbers: string): number;
}

module Kata {
    export class StringCalculator implements IStringCalculator {
        separators: string[];

        constructor () { 
            this.separators = new Array();
            this.separators.push(',');
            this.separators.push('\n');
        };

        calculate(numbers: string): number {
            if (this.isNullOrEmpty(numbers)) return 0;
            
            this.addSpecialDelimiters(numbers);
            
            numbers = this.removeBracketDelimitersIfExists(numbers);

            var items: string[] = this.getParts([numbers],this.separators);

            this.throwIfNegative(items);
            
            var nums:number[] = this.removeNumbersLargerThan100(items);
            
            return this.calculateSumOfParts(nums);
        }
        removeBracketDelimitersIfExists(value: string): string {
            if (this.hasSpecialSeparator(value)) {
                return this.stripFirstLine(value);
            }
            return value;
        }
        addSpecialDelimiters(value: string) {
            if (this.hasSpecialSeparator(value)) {
                this.addSpecialSeparator(value);
                var numbers = this.stripFirstLine(value);
            }
        }
        isNullOrEmpty(value: string):bool {
            return !value;
        }
        removeNumbersLargerThan100(items: string[]) {
            var retval: number[] = new Array();
            for (var i: number = 0; i < items.length; i++) {
                var int: number = parseInt(items[i]);
                if (int < 1001) {
                    retval.push(int);
                }
            }
            return retval;
        }
        addSpecialSeparator(nums: string) {
            var firstLine: string = this.getFirstLine(nums);
            if (this.hasBracketDelimiter(firstLine)) {
                var sepParts = this.getBracketDelimiters(firstLine);
                for (var i: number = 0; i < sepParts.length; i++) {
                    this.separators.push(sepParts[i]);
                }
            }
            else {
                this.separators.push(nums[2]);
            }
        }
        getBracketDelimiters(value: string): string[]{
                var firstbracket = value.indexOf('[');
                var lastbracket = value.lastIndexOf(']');
                
            return value.substring(firstbracket + 1, lastbracket).split('][');
        }
        getFirstLine(value: string): string {
            return value.split('\n', 1)[0];
        }
        hasBracketDelimiter(delimiterString: string): bool {
            return delimiterString.indexOf('[') > -1
        }
        stripFirstLine(str: string): string {
            return str.substring(4)
        }
        throwIfNegative(items: string[]) {
            for (var i: number = 0; i < items.length; i++) {
                var int: number = parseInt(items[i]);
                if (int < 0) {
                    throw "No negative numbers allowed";
                }
            }
        }
        getParts(nums: string[], separator:string[]):string[] {
            if (separator.length === 0) {
                return nums;
            }
            var result: string[] = new Array();
            var delimiter = separator.pop();

            for (var i: number = 0; i < nums.length; i++) {
                var result = result.concat(nums[i].split(delimiter));
            }

            return this.getParts(result, separator);
        }

        hasSpecialSeparator(numbers: string): bool {
            return numbers[0] === '/';
        }

        calculateSumOfParts(parts: number[]): number {
            var sum: number = 0;
            for (var i: number = 0; i < parts.length; i++) {
                sum += parts[i];
            }
            return sum;
        }
    }
}