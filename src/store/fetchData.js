import axios from 'axios';
import { actions } from './index';

const getData = (fetchData, headers) => async (dispatch) => {
  const { setRequestState, setError } = actions;
  dispatch(setRequestState('REQUEST'));
  try {
    await Promise.all(
      fetchData.map(async (item) => {
        const { data } = await axios.get(item.url, {
          headers,
        });
        dispatch(item.action(data));
      }),
    );

    dispatch(setRequestState('SUCCESS'));
  } catch (error) {
    console.log(error);
    dispatch(setRequestState('FAILURE'));
    dispatch(setError(error.message));
  }
};
export default getData;
