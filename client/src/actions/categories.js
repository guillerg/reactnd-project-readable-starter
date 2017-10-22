import * as api from '../util/api'
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

export function load_categories(categories) {
  return {
    type: LOAD_CATEGORIES,
    categories
  }
}
export const getAllCategories = () => dispatch => {
  api.getAllCategories().then((categories) => {
    dispatch(load_categories(categories))
  })
}
