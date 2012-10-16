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
            if (!numbers) return 0;
            if (numbers.length === 1) {
                return parseInt(numbers || 0) 
            }
            if (this.hasSpecialSeparator(numbers)) {
                this.addSpecialSeparator(numbers);
                var numbers = this.stripFirstLine(numbers);
            }
            var items: string[] = this.getParts([numbers],this.separators);
            this.throwIfNegative(items);
            var nums:number[] = this.removeNumbersLargerThan100(items);
            return this.calculateSumOfParts(nums);
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
            var specialSeparator = nums[2];
            this.separators.push(specialSeparator);
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