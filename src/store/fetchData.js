import axios from 'axios';
import { actions } from './index';

const { setRequestState } = actions;

const getData = (fetchData, headers) => async (dispatch) => {
  dispatch(setRequestState('REQUEST'));
  console.log(dispatch);
  try {
    const response = await Promise.all(
      fetchData.map(async (item) => {
        const { data } = await axios.get(item.url, {
          headers,
        });
        return { data, action: item.action };
      }),
    );
    response.map((item) => {
      const { data, action } = item;
      return dispatch(action(data));
    });

    dispatch(setRequestState('SUCCESS'));
  } catch (error) {
    console.log(error);
    dispatch(setRequestState('FAILURE'));
  }
};
export default getData;
