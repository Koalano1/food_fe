import { User } from '~/types/user'

export const LocalStorageEventTarget = new EventTarget()

export const clearLS = () => {
  localStorage.removeItem('useFood')
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getProfileFromLS = (): User => {
  const result = localStorage.getItem('useFood')
  return result ? JSON.parse(result) : null
}

export const setProfileToLS = (profile: User) => {
  localStorage.setItem('useFood', JSON.stringify(profile))
}
