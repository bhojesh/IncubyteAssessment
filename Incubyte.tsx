class StringCalculator {
  add(numbersString: string): number {
    if (numbersString.length === 0) return 0;

    // get delimiter
    // check the delimiters and return the final array elements
    const numbersArray = this.multiDelimiterCheck(numbersString);
    
    // verify if any negative numbers
    const negativeNumbers = numbersArray.filter(num => Number(num) < 0);
    
    // raise Error in case of negative numbers
    if (negativeNumbers.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negativeNumbers.join(',')}`);
    }

    let numbers = numbersArray.map(num => Number(num));
    // ignores numbers bigger than 1000
    numbers = this.ignoreNumbersAbove1000(numbers);
    return numbers.reduce((sum, num) => sum + num, 0);
  }

  private multiDelimiterCheck(numbersString: string): string[] {
    let delimiter = /[\n,]/; // Default delimiter
    let numbers = numbersString.split(delimiter);
    
    // check for any custom delimiter
    if (numbers[0].includes('//')) {
      // get the delimiter
      delimiter = new RegExp(numbers[0].replace('//', '').replace(/\[|\]/g, ''));
      // delete the delimiters and create number array
      numbers = numbers[1].split(delimiter);
    }

    return numbers;
  }

  private ignoreNumbersAbove1000(numbers: number[]): number[] {
    return numbers.map(num => (num >= 1000 ? 0 : num));
  }
}

