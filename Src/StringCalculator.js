var Kata;
(function (Kata) {
    var StringCalculator = (function () {
        function StringCalculator() {
            this.separators = new Array();
            this.separators.push(',');
            this.separators.push('\n');
        }
        StringCalculator.prototype.calculate = function (numbers) {
            if(this.isNullOrEmpty(numbers)) {
                return 0;
            }
            this.addSpecialDelimiters(numbers);
            numbers = this.removeBracketDelimitersIfExists(numbers);
            var items = this.getParts([
                numbers
            ], this.separators);
            this.throwIfNegative(items);
            var nums = this.removeNumbersLargerThan100(items);
            return this.calculateSumOfParts(nums);
        };
        StringCalculator.prototype.removeBracketDelimitersIfExists = function (value) {
            if(this.hasSpecialSeparator(value)) {
                return this.stripFirstLine(value);
            }
            return value;
        };
        StringCalculator.prototype.addSpecialDelimiters = function (value) {
            if(this.hasSpecialSeparator(value)) {
                this.addSpecialSeparator(value);
                var numbers = this.stripFirstLine(value);
            }
        };
        StringCalculator.prototype.isNullOrEmpty = function (value) {
            return !value;
        };
        StringCalculator.prototype.removeNumbersLargerThan100 = function (items) {
            var retval = new Array();
            for(var i = 0; i < items.length; i++) {
                var int = parseInt(items[i]);
                if(int < 1001) {
                    retval.push(int);
                }
            }
            return retval;
        };
        StringCalculator.prototype.addSpecialSeparator = function (nums) {
            var firstLine = this.getFirstLine(nums);
            if(this.hasBracketDelimiter(firstLine)) {
                var sepParts = this.getBracketDelimiters(firstLine);
                for(var i = 0; i < sepParts.length; i++) {
                    this.separators.push(sepParts[i]);
                }
            } else {
                this.separators.push(nums[2]);
            }
        };
        StringCalculator.prototype.getBracketDelimiters = function (value) {
            var firstbracket = value.indexOf('[');
            var lastbracket = value.lastIndexOf(']');
            return value.substring(firstbracket + 1, lastbracket).split('][');
        };
        StringCalculator.prototype.getFirstLine = function (value) {
            return value.split('\n', 1)[0];
        };
        StringCalculator.prototype.hasBracketDelimiter = function (delimiterString) {
            return delimiterString.indexOf('[') > -1;
        };
        StringCalculator.prototype.stripFirstLine = function (str) {
            return str.substring(4);
        };
        StringCalculator.prototype.throwIfNegative = function (items) {
            for(var i = 0; i < items.length; i++) {
                var int = parseInt(items[i]);
                if(int < 0) {
                    throw "No negative numbers allowed";
                }
            }
        };
        StringCalculator.prototype.getParts = function (nums, separator) {
            if(separator.length === 0) {
                return nums;
            }
            var result = new Array();
            var delimiter = separator.pop();
            for(var i = 0; i < nums.length; i++) {
                var result = result.concat(nums[i].split(delimiter));
            }
            return this.getParts(result, separator);
        };
        StringCalculator.prototype.hasSpecialSeparator = function (numbers) {
            return numbers[0] === '/';
        };
        StringCalculator.prototype.calculateSumOfParts = function (parts) {
            var sum = 0;
            for(var i = 0; i < parts.length; i++) {
                sum += parts[i];
            }
            return sum;
        };
        return StringCalculator;
    })();
    Kata.StringCalculator = StringCalculator;    
})(Kata || (Kata = {}));

