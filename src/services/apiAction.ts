import axios from 'axios';
import {useDispatch} from 'react-redux';
const dispatch = useDispatch();

const fetchProductData = (url: string) => {
  return new Promise(() => {
    axios
      .get(url)
      .then(response => {})
      .catch(error => {
        console.log(error);
      });
  });
};

export default fetchProductData;
