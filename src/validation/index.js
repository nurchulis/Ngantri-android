import data from './data'

function validate(name, value) {
	var message
	var valid
	switch(name) {
	  case 'email':
	  	valid = data.required(value)
	  	if (valid) {
	  		message = 'email tidak boleh kosong !'
	  		break
	  	}
	  	valid = data.email(value)
	  	if (valid) {
	  		message = 'format email salah !'
	  		break
	  	}
	  	message = ''
	  	break
	  case 'password':
	  	valid = data.required(value)
	  	if (valid) {
	  		message = 'password tidak boleh kosong !'
	  		break
	  	}
	    valid = data.min(value,6)
	    if (valid) {
	  		message = 'minimal password 6 karakter !'
	  		break
	  	}
	  	message = ''
	    break
	  case 'name':
	  	valid = data.required(value)
	  	if (valid) {
	  		message = 'nama tidak boleh kosong !'
	  		break
	  	}
	  	valid = data.max(value, 50)
	  	if (valid) {
	  		message = 'maximal nama 50 karakter !'
	  		break
	  	}
	  	message = ''
	   	break
	  case 'phone':
	  	valid = data.required(value)
	  	if (valid) {
	  		message = 'nomor telepon tidak boleh kosong !'
	  		break
	  	}
	  	valid = data.max(value, 15)
	  	if (valid) {
	  		message = 'maximal nama 15 karakter !'
	  		break
	  	}
	  	valid = data.number(value)
	  	if (valid) {
	  		message = 'nomor telepon harus angka !'
	  		break
	  	}
	  	message = ''
	   	break
	  case 'password_repeat':
	  	let pass = value.split(":::::::")
	  	valid = data.required(pass[0])
	  	if (valid) {
	  		message = 'ulang password tidak boleh kosong !'
	  		break
	  	}
	  	if (pass[0] != pass[1]) {
	  		message = 'password tidak cocok!'
	  		break
	  	}
	  	message = ''
	   	break
	  case 'address':
	  	valid = data.required(value)
	  	if (valid) {
	  		message = 'alamat tidak boleh kosong !'
	  		break
	  	}
	  	message = ''
	   	break
	  case 'area':
	  	valid = data.required(value)
	  	if (valid) {
	  		message = 'kota Wajib dipilih !'
	  		break
	  	}
	  	message = ''
	   	break
	  case 'category':
	  	valid = data.required(value)
	  	if (valid) {
	  		message = 'kategori Wajib dipilih !'
	  		break
	  	}
	  	message = ''
	   	break
	  case 'location':
	  	valid = data.required(value)
	  	if (valid) {
	  		message = 'Wajib menyertakan lokasi !'
	  		break
	  	}
	  	message = ''
	   	break
	  case 'prefix':
	  	valid = data.required(value)
	  	if (valid) {
	  		message = 'kode layanan tidak boleh kosong !'
	  		break
	  	}
	  	valid = data.max(value, 3)
	  	if (valid) {
	  		message = 'maximal kode layanan 3 karakter !'
	  		break
	  	}
	  	message = ''
	   	break
	  case 'counters':
	  	valid = data.required(value)
	  	if (valid) {
	  		message = 'Jumlah loket tidak boleh kosong !'
	  		break
	  	}
	  	valid = data.number(value)
	  	if (valid) {
	  		message = 'jumlah loket harus angka !'
	  		break
	  	}
	  	message = ''
	   	break
	  default:
	    // code block
	}
	return message
}

export default { validate }
