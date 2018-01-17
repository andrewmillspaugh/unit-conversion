class BaseUnit {
  constructor(name, symbol, quantity, alternativeSpellings = []) {
    this.name = name;
    this.quantity = quantity;
    this.symbol = symbol;
    
    this.spellings = new Set(alternativeSpellings);
    this.spellings.add(symbol);
    this.spellings.add(name);
  }
  toThe(exponent) {
    return Object.assign({ exponent }, this);
  }
}

class ApprovedUnit {
  constructor(name, symbol, quantity, conversionFactor, baseUnits, alternativeSpellings = []) {
    this.name = name;
    this.symbol = symbol;
    this.quantity = quantity;
    this.baseUnits = baseUnits;
    this.conversionFactor = conversionFactor;
    
    this.spellings = new Set(alternativeSpellings);
    this.spellings.add(symbol);
    this.spellings.add(name);
  }
}

class UnknownQuantity {
  constructor(string) {
    this.string = string;
  }

}

// Base Units, per https://en.wikipedia.org/wiki/SI_base_unit 
// Limited to those specifically listed in the challenge prompt.
// Additionally, for simplicity, the radian unit is treated as 
// a base unit, despite actually being an SI derived unit of m/m
const meter = new BaseUnit('meter', 'm', 'length');
const kilogram = new BaseUnit('kilogram', 'kg', 'mass');
const second = new BaseUnit('second', 's', 'time', ['sec']);
const radian = new BaseUnit('radian', 'rad', 'angle');
const BASE_UNITS = new Map([ meter, kilogram, second, radian ].map(unit => [unit.name, unit]));

// Non-SI units accepted for SI usage, per https://en.wikipedia.org/wiki/Non-SI_units_mentioned_in_the_SI
// Limited to those specifically listed in the challenge prompt.
const APPROVED_UNITS = new Map([
  new ApprovedUnit('minute', 'min', 'time', 60.0, [ second ]),
  new ApprovedUnit('hour', 'h', 'time', 60.0 * 60.0, [ second ], ['hr']),
  new ApprovedUnit('day', 'd', 'time', 60.0 * 60.0 * 24.0, [ second ]),
  new ApprovedUnit('litre', 'L', 'volume', 0.001, [ meter.toThe(3) ], ['liter', 'ltr']),
  new ApprovedUnit('hectare', 'ha', 'area', 10000.0, [ meter.toThe(2) ]),
  new ApprovedUnit('tonne', 't', 'mass', 1000.0, [ kilogram ], ['metric ton']),
  new ApprovedUnit('degree', '°', 'angle', Math.PI / 180.0, [ radian ], ['deg']),
  new ApprovedUnit('arcminute', '′', 'angle', 1000.0, [ radian ], ['\'', 'arcmin', 'amin']),
  // NOTE: The use of "second" to denote arcsecond is nonstandard, but it is used in accordance with the challenge prompt 
  new ApprovedUnit('arcsecond', '″', 'angle', 1000.0, [ radian ], ['"', 'second', 'arcsec', 'asec']),
].map(unit => [unit.name, unit]));
