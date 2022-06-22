module.exports = function toReadable(number) {
    const ones = {
        0: "zero",
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
        7: "seven",
        8: "eight",
        9: "nine",
        10: "ten",
        11: "eleven",
        12: "twelve",
        13: "thirteen",
        14: "fourteen",
        15: "fifteen",
        16: "sixteen",
        17: "seventeen",
        18: "eighteen",
        19: "nineteen",
    };
    const tens = {
        10: "ten",
        20: "twenty",
        30: "thirty",
        40: "forty",
        50: "fifty",
        60: "sixty",
        70: "seventy",
        80: "eighty",
        90: "ninety",
    };

    const numString = number.toString(); // переводим число в строку
    const numArray = numString.split(""); // переводим строку с числом в массив
    // функция поиска нужной цифры в существующих объектах ones и tens
    const numResult = function (array) {
        return Object.keys(array).find((n) => n === numString);
    };
    // Получение массива из первых элементов подмассивов (для двухзначных чисел)
    const getFirstElemArray = Object.keys(tens)
        .map((elem) => elem.split(""))
        .map((arr) => arr[0]);

    // Получение первой цифры искомого числа (для двухзначных/трехзначных чисел)
    const findFirstElemNum = getFirstElemArray.find(
        (elem) => elem === numArray[0]
    );

    // Получаем первую цифру прописью для двухзначных чисел
    const firstNumInWordsTwo = tens[`${findFirstElemNum}0`];

    // Получаем первую цифру прописью для трехзначных чисел
    const firstNumInWordsThree =
        ones[Object.keys(ones).find((n) => n === numString[0])];

    // Получaем вторую цифру искомого числа прописью для двухзначных чисел
    const secondNumInWordsTWo =
        ones[Object.keys(ones).find((n) => n === numString[1])];

    // Получaем вторую цифру искомого числа прописью для трехзначных чисел
    const secondNumInWordsThree =
        tens[`${Object.keys(ones).find((n) => n === numString[1])}0`];

    // Получaем третью цифру для трехзначных
    const thirdNumInWordsThree =
        ones[Object.keys(ones).find((n) => n === numString[2])];

    if (number >= 0 && number <= 19) {
        return ones[numResult(ones)];
    } else if (number < 100 && number % 10 === 0) {
        return tens[numResult(tens)];
    } else if (number < 100 && number % 10 !== 0) {
        return `${firstNumInWordsTwo} ${secondNumInWordsTWo}`;
    } else if (number > 99 && number < 1000) {
        const indexNumInOnes = Number(numArray[1] + numArray[2]);
        if (indexNumInOnes < 20 && indexNumInOnes !== 0) {
            return `${firstNumInWordsThree} hundred ${ones[indexNumInOnes]}`;
        } else if (indexNumInOnes === 0) {
            return `${firstNumInWordsThree} hundred`;
        } else if (indexNumInOnes > 19 && indexNumInOnes % 10 === 0) {
            return `${firstNumInWordsThree} hundred ${secondNumInWordsThree}`;
        } else {
            return `${firstNumInWordsThree} hundred ${secondNumInWordsThree} ${thirdNumInWordsThree}`;
        }
    } else {
        return "The number cannot be greater than 1000!";
    }
};
