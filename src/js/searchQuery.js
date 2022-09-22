const axios = require('axios').default;

export class searchQuery {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async request() {
    const params = {
      url: 'https://pixabay.com/api/',
      key: '30029348-12068a2fdca19007a6804d89e',
      q: this.query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: this.page,
    };
    try {
      const rest = await axios.get(params.url, { params });
      const data = await rest.data;
      // console.log(data);
      return data;
    } catch (error) {
      error = new Error().stack;
    }
  }

  get query() {
    return this.searchQuery;
  }
  set query(value) {
    this.searchQuery = value;
  }
  updatePage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
