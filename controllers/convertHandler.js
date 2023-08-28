function ConvertHandler() {
  
  this.getNum = function(input) {
    let i = input.search(/[a-zA-Z]+$/)
    let result = input.slice(0, i>=0 ? i : undefined);
    if (result === "" ) return 1;
    if (!/^-?\d+(\.\d+)?(\/?-?\d+(\.\d+)?)?$/.test(result)) {
      return "invalid"
    };
    if (/\//.test(result)) {
        let parts = result.split("/");
        result = +(parts[0]) / +(parts[1]);
        return result;
    }
    return +(result);
  };
  
  this.getUnit = function(input) {
    let i = input.search(/[a-zA-Z]+$/)
    let result = input.slice(i>=0 ? i : undefined);
    if (!/^gal$|^L$|^lbs$|^kg$|^mi$|^km$/i.test(result)) {
    return "invalid"
    };
    let units = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];
    return units[units.map((e) => e.toLowerCase()).indexOf(result.toLowerCase())];
  };
  
  this.getReturnUnit = function(initUnit) {
    let imperial = ['gal', 'lbs', 'mi'];
    let metric = ['L', 'kg', 'km'];
    let impIndex = imperial.indexOf(initUnit);
    let metIndex = metric.indexOf(initUnit);
    if (impIndex >= 0) {
      return metric[impIndex];
    } else {
      return imperial[metIndex];
    }
  };

  this.spellOutUnit = function(unit) {
    let unitObj = {
      gal: "gallons",
      L: "liters",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometers"
    }

    return unitObj[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
    }
    return +(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
  };
  
}

module.exports = ConvertHandler;
