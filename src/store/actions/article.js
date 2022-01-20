import { http } from '@/utils'

export const getChannels = () => {
  return async (dispatch) => {
    const data = await http.get('channels')
    dispatch({ type: 'article/setChannels', payload: data.channels })
  }
}
