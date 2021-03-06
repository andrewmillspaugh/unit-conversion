require('./utils').setPrecision();

const Decimal = require('decimal.js');

const WORD_REGEX = /[a-zA-Z]+[^s]/;

class Unit {
  constructor(name, symbol, quantity, alternativeSpellings = []) {
    this.name = name;
    this.quantity = quantity;
    this.symbol = symbol;
    this.conversionFactor = new Decimal(1.0);

    this.spellings = new Set();
    for (const spelling of alternativeSpellings.concat([ name, symbol ])) {
      if (WORD_REGEX.test(spelling)) {
        this.spellings.add(spelling + 's');
      }
      this.spellings.add(spelling);
    }
  }
  asString() {
    return this.symbol;
  }
}

class BaseUnit extends Unit { }

class ApprovedUnit extends Unit {
  constructor(name, symbol, quantity, conversionFactor, baseUnits, alternativeSpellings = []) {
    super(name, symbol, quantity, alternativeSpellings);
    this.baseUnits = baseUnits;
    this.conversionFactor = conversionFactor;
  }
}

module.exports = { BaseUnit, ApprovedUnit };
