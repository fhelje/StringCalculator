/// <reference path="../modules/Jasmine.d.ts" />
/// <reference path="../src/StringCalculator.ts" />

describe("String calculator", function () {
    var stringShouldHaveSum = (numbers: string, result: number) => {
        it('when string is "' + numbers.replace("\n", "\\n") + '" sum should be ' + result, function () {
            var calulator = new Kata.StringCalculator();
            expect(calulator.calculate(numbers)).toEqual(result);

        });
    }
    var stringShouldThrow = (numbers: string, exception: string) => {
        it('when string is "' + numbers.replace("\n", "\\n") + '" exception should be thrown', function () {
            var calulator = new Kata.StringCalculator();
            expect(() => calulator.calculate(numbers)).toThrow(exception);

        });
    }
    describe("No values", function () {
        it("when empty string sum should be 0", function () {
            var calulator = new Kata.StringCalculator();
            expect(calulator.calculate("")).toEqual(0);

        });
        it("when null string sum should be 0", function () {
            var calulator = new Kata.StringCalculator();
            expect(calulator.calculate(null)).toEqual(0);

        });
    });
    describe("Simple values", function () {
        stringShouldHaveSum("0", 0);
        stringShouldHaveSum("1", 1);
        stringShouldHaveSum("100", 100);
    });
    describe("Comma seperated values", function () {
        stringShouldHaveSum("1,2", 3);
        stringShouldHaveSum("1,2,3", 6);
        stringShouldHaveSum("1,2,3,4,5", 15);
    });
    describe("New line seperated values", function () {
        stringShouldHaveSum("1\n2", 3);
        stringShouldHaveSum("1\n2\n3", 6);
    });
    describe("Any separator seperated values", function () {
        stringShouldHaveSum("1\n2", 3);
        stringShouldHaveSum("1\n2,3", 6);
        stringShouldHaveSum("//;\n1;2", 3);
        stringShouldHaveSum("//;\n1;2,3", 6);
        stringShouldHaveSum("//;\n1;2,3\n4;5", 15);
    });
    describe("Negativ numbers not allowed", function () {
        stringShouldThrow("-1", "No negative numbers allowed");
        stringShouldThrow("1,-2", "No negative numbers allowed");
        stringShouldThrow("//;\n1;2,3\n4;-5", "No negative numbers allowed");
    });
});