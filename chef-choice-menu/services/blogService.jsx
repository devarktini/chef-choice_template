// /c:/Arktini/Awdesh_Gupta/chef-choice_template/chef-choice-menu/services/blogService.jsx

const BASE_URL = 'https://blogapi.gyprc.com/api';

export async function getChefBlogs() {
    const url = `${BASE_URL}/blogs/type/Chef`;
    const res = await fetch(url, {
        method: 'GET',
        headers: { Accept: '*/*' }
    });

    if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`GET ${url} failed: ${res.status} ${res.statusText} ${body}`);
    }

    return res.json();
}

// curl -X 'GET' \
//   'https://blogapi.gyprc.com/api/blogs/details/6901dab3942a57b90b2cbec0' \
//   -H 'accept: */*'

export async function getBlogById(id) {
  try {
    const response = await fetch(`${BASE_URL}/blogs/details/${id}`);
    console.log("sssssss", response)
    if (!response.ok) {
      throw new Error('Failed to fetch blog');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blog:', error);
    throw error;
  }
}

export default { getChefBlogs, getBlogById };