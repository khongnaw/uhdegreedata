/**
 * Created by sora1234 on 9/26/2015.
 */

var test = uhdata.splice(0,3);

/**
 * totalDegrees, this function returns the total number of degrees awarded in the uhdata set
 * @param data, uhdata set.
 */
function totalDegrees(data){
  return _.reduce(data,function(memo,num){
    return memo + num["AWARDS"];
  },0);
};

/**
 * percentageHawaiian, this function returns the percentage of degrees that were awarded to students of Hawaiian Legacy in the uhdata set.
 * @param data, uhdata set
 */

function percentageHawaiian(data){
  var totalHawaiianAward = _.reduce(data,function(memo,num){
    if(num["HAWAIIAN_LEGACY"] === "HAWAIIAN")
      return memo + num["AWARDS"];
    else
      return memo + 0;
  },0)

  return 100*(totalHawaiianAward/totalDegrees(data));
};

/**
 * totalDegreesByYear, this function returns a number of degrees awarded in the passed year.
 * @param data, uhdata set
 * @param year
 */

function totalDegreesByYear(data,year){
  return _.reduce(data,function(memo,num){
    if(num["FISCAL_YEAR"] === year)
      return memo +  num["AWARDS"];
    else
      return memo + 0;
  },0)
};

/**
 * listCampuses, this function returns an array containing all the campuses referenced in the passed dataset.
 * @param data, uhdata set
 */
function listCampuses(data){
  var campusNames = _.pluck(data,'CAMPUS');
  return _.uniq(campusNames);
}

/**
 * listCampusDegrees, this function returns an object where the property keys are campuses and the values are the number of degrees awarded by the campus.
 * @param data, uhdata set
 */

function listCampusDegrees(data){
  var groupByCampus = _.groupBy(data,function(num){
    return num["CAMPUS"];
  });
  return _.mapObject(groupByCampus,function(val){
    return _.reduce(val,function(memo,num){
      return memo + num["AWARDS"];
    },0);
  });
};

/**
 * maxDegrees, this function returns an integer indicating the maximum number of degrees awarded in a year.
 * @param data, uhdata set
 */

function maxDegrees(data){
  var groupByYear = _.groupBy(data,function(val){
    return val["FISCAL_YEAR"];
  });

  var mapAwards = _.map(groupByYear,function(val){
    return _.reduce(val,function(memo,num){
      return memo + num["AWARDS"];
    },0)
  });
  return _.max(mapAwards);
}

/**
 * doctoralDegreePrograms, this function returns a list of the degree programs ("CIP_DESC") for which a doctoral degree is granted
 * @param data, uhdata set
 */

function doctoralDegreePrograms(data){
  var listDoc = _.filter(data,function(val){
    return val["OUTCOME"] === "Doctoral Degrees";
  });

  var pluckDeg = _.pluck(listDoc,'CIP_DESC');

  return _.uniq(pluckDeg);

}