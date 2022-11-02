const PROXY_URL = 'https://cors-proxy.ilhamabdillah123.workers.dev/?'
const BASE_URL = PROXY_URL + 'https://betis23-oprec.herokuapp.com'
const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY5ODI4OTIxLCJpYXQiOjE2NjcyMzY5MjEsImp0aSI6Ijg2ODU3MzhkM2I0NTRjNmI5YTQxZDVmNDMwNDM0NzY4IiwidXNlcl9pZCI6MTB9.b2We3W-o2ycl-jjddKsobRyHEp2b2BZFPAZdn8qkpEw"


const post = async (url, data) => {
  const response = await fetch(BASE_URL + url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Referer': '',
      referrerPolicy: "no-referrer",
      'Accept': 'application/json, text/plain'
    },
    body: data
  });

  return await response.json()
}

const get = async (url) => {
  const response = await fetch(BASE_URL + url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${TOKEN}`
    }
  })
  return await response.json()
}

export { post, get }