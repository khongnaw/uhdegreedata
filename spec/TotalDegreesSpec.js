
/*global uhdata, totalDegrees*/

describe("totalDegrees", function() {
  var testdata = uhdata.slice(0,2);
  var testdata2 = uhdata.slice(0,2);
  testdata2.push({foo:"hi"});
  var testdata3 = uhdata.slice(0,2);
  testdata3.push({AWARDS:"hi"});
  console.log(testdata);
  console.log(testdata2);
  console.log(testdata3);
  it("Should return correct total given sample dataset", function() {
    expect(totalDegrees(testdata)).toEqual(391);
  });

  it("Should throw error when a record is missing the AWARDS field", function() {
    expect(function(){totalDegrees(testdata2);}).toThrowError("ERROR: missing AWARDS field");

  });
  it("Should throw error when an AWARDS field contains a non-integer value", function() {

    expect(function(){totalDegrees(testdata3);}).toThrowError("ERROR: AWARDS field contains non number");
  });

});


