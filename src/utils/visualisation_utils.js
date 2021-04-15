function parse_float(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = parseFloat(1 * arr[i]);
    }
  }
  
  function get_attribute(matrix_dataset, col) {
    var attribute = [];
    for (var i = 0; i < matrix_dataset.length; i++) {
      attribute.push(matrix_dataset[i][col]);
    }
    return attribute; // return attribute data..
  }
  
  function create_object(arr1, arr2) {
    var new_obj = {};
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] in new_obj && arr2[i] != NaN) {
        new_obj[arr1[i]] += arr2[i];
      } else {
        new_obj[arr1[i]] = arr2[i];
      }
    }
    return new_obj;
  }
  
  function obj_to_array_of_obj(obj, labels) {
    let x,
      y = [labels];
    let resArr = [];
    Object.keys(obj).forEach(function (key, index) {
      resArr.push({
        x: key,
        y: obj[key],
      });
    });
    return resArr;
  }
  
export {
      parse_float,
      get_attribute,
      create_object,
      obj_to_array_of_obj
  }