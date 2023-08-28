'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    if (initUnit === "invalid" && initNum === "invalid") {
      return res.send("invalid number and unit");
    } else if (initUnit === "invalid") {
      return res.send("invalid unit");
    } else if (initNum === "invalid") {
      return res.send("invalid number");
    };
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    let returnObj = {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    };
    res.json(returnObj);
  });
};
