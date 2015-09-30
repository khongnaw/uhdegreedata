/*
 * Analytics for UH Data sets
 * Created by sora1234 on 9/26/2015.
 */

/* globals _, uhdata*/
/* exported testdata, percentageHawaiian, totalDegreesByYear, listCampuses*/
/* exported listCampusDegrees, maxDegrees, doctoralDegreePrograms */

/**
 * Provides a small set of records from the UH dataset
 * @type {string}
 */
var testdata = uhdata.slice(0,2);

/**
 * This function returns the total number of degrees awarded in the uhdata set
 * @param data, The UH dataset.
 * @returns The total number of degrees
 */
function totalDegrees(data) {
  return _.reduce(data, function (memo, value) {
    return memo + value["AWARDS"];
  }, 0);
}

/**
 * This function returns the percentage of degrees awarded to those of
 * Hawaiian ancestry
 * @param datam The UH dataset
 * @returns Percentage degrees to the Hawaiians
 */

function percentageHawaiian(data) {
  var totalHawaiianAward = _.reduce(data, function (memo, num) {
    if (num["HAWAIIAN_LEGACY"] === "HAWAIIAN") {
      return memo + num["AWARDS"];
    }
    else {
      return memo + 0;
    }
  }, 0);

  return 100 * (totalHawaiianAward / totalDegrees(data));
}

/**
 * This function returns a number of degrees awarded in the a given year.
 * @param data, The UH dataset
 * @param year, The year of interest
 * @returns The total degrees for that year.
 */

function totalDegreesByYear(data, year) {
  return _.reduce(data, function (memo, num) {
    if (num["FISCAL_YEAR"] === year) {
      return memo + num["AWARDS"];
    }
    else {
      return memo + 0;
    }
  }, 0);
}

/**
 * This function returns the campuses in the passed dataset
 * @param data, The UH dataset
 * @returns An array of strings, one for each campus in the dataset
 */
function listCampuses(data) {
  var campusNames = _.pluck(data, 'CAMPUS');
  return _.uniq(campusNames);
}

/**
 * listCampusDegrees, this function returns an object where the property keys are campuses and the values are the number of degrees awarded by the campus.
 * @param data, uhdata set
 */

function listCampusDegrees(data) {
  var groupByCampus = _.groupBy(data, function (num) {
    return num["CAMPUS"];
  });
  return _.mapObject(groupByCampus, function (val) {
    return _.reduce(val, function (memo, num) {
      return memo + num["AWARDS"];
    }, 0);
  });
}

/**
 * This function returns the maximum number of degrees awarded in a single
 * year in the dataset
 * @param data, The UH dataset
 * @returns The maximum number of degrees.
 */

function maxDegrees(data) {
  var groupByYear = _.groupBy(data, function (val) {
    return val["FISCAL_YEAR"];
  });

  var mapAwards = _.map(groupByYear, function (val) {
    return _.reduce(val, function (memo, num) {
      return memo + num["AWARDS"];
    }, 0);
  });
  return _.max(mapAwards);
}

/**
 * This function returns a list of programs with a doctoral degree.
 * @param data, The UH dataset
 * @returns A list of string, one per program with a doctoral degree
 */

function doctoralDegreePrograms(data) {
  var listDoc = _.filter(data, function (val) {
    return val["OUTCOME"] === "Doctoral Degrees";
  });

  var pluckDeg = _.pluck(listDoc, 'CIP_DESC');

  return _.uniq(pluckDeg);

}