const BALANCER_KEY = 'ru.ifmo.networks.balancer'

export const setBalancer = url => localStorage.setItem(BALANCER_KEY, url)
export const getBalancer = () => localStorage.getItem(BALANCER_KEY)
export const removeBalancer = () => localStorage.removeItem(BALANCER_KEY)


const API_URL_KEY = 'ru.ifmo.networks.api'

export const setApiURL = url => sessionStorage.setItem(API_URL_KEY, url)
export const getApiURL = () => sessionStorage.getItem(API_URL_KEY)
