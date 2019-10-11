function required(value){
	if (value === null || value === ''){
		return true
	} else {
		return false
	}
}

function email(value) {
 	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
    	return false
  } else {
    return true
  }
}

function min(value, min) {
 	if (value.length >= min){
    	return false
  } else {
    return true
  }
}

function max(value, max) {
 	if (value.length <= max){
    	return false
  } else {
    return true
  }
}

function number(value) {
  if (value.match(/^[0-9]+$/)){
      return false
  } else {
    return true
  }
}

export default { required, email, min, max, number }