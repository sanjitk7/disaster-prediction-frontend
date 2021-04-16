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
    parse_float(arr2);
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] in new_obj && arr2[i] !== NaN && arr2[i]!== "") {
        new_obj[arr1[i]] += arr2[i];
      } else {
        new_obj[arr1[i]] = arr2[i];
      }
    }
    console.log(new_obj);
    return new_obj;
  }
  
  function obj_to_array_of_obj(obj, labels) {
    let resArr = [];
    var temp_obj = {}
    var [x,y] = labels
    Object.keys(obj).forEach(function (key, index) {
      temp_obj={}
      temp_obj[x] = key;
      temp_obj[y] = obj[key]
      resArr.push(temp_obj);
    });
    console.log("resArr: ",resArr);
    return resArr;
  }
  
  function get_attribute_from_json(json,attr_name){
    var new_arr = [];
    for (let i =0;i<json.length;i++){
      new_arr.push(json[i][attr_name]);
    }
    return new_arr;
  }
export {
      parse_float,
      get_attribute,
      create_object,
      obj_to_array_of_obj,
      get_attribute_from_json
  }