export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

export function load_categories(categories) {
  return {
    type: LOAD_CATEGORIES,
    categories
  }
}
