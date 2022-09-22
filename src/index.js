import axios from 'axios';

axios
  .get(
    'https://pixabay.com/api/?key=30029348-12068a2fdca19007a6804d89e&q=yellow+flowers&image_type=photo'
  )
  .then(console.log);
