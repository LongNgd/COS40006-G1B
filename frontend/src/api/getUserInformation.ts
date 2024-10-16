const getUser = localStorage.getItem('user')
export const user = getUser ? JSON.parse(getUser) : null
