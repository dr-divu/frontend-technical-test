const createRequest = (method, url) => {
	return new Promise((resolve, reject) => {
	  const request = new XMLHttpRequest()
	  request.open(method, url)
	
	  request.onreadystatechange = () => {
		if (request.readyState === 4) {
		  if (request.status >= 200 && request.status < 300) {
			try {
			  resolve(JSON.parse(request.responseText))
			} catch (e) {
			  reject('Oops! The data is not Ok!')
			}
		  } else {
			reject(request.response)
		  }
		}
	  }
	
	  request.send()
	})
  }
  
  const getGetRequest = path => createRequest('GET', `http://localhost:9988${path}`)
  
  export const getVehicles = () => getGetRequest('/api/vehicle')
  export const getVehicle = path => getGetRequest(path)
  