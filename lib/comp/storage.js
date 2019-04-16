const STORAGE_VERSION = 1
const STORAGE_KEY = 'uzkk.quiz.settings'

const getFallback = () => ({
  level: 'Easy',
  range: 'abcdefz',
})

export function getSettings () {
  const fallbackSettings = getFallback()

  if (typeof localStorage === 'undefined') return fallbackSettings

  const oldSettings = localStorage.getItem(STORAGE_KEY)
  if (!oldSettings) return fallbackSettings

  try {
    const { version, settings } = JSON.parse(oldSettings)
    if (version === STORAGE_VERSION) {
      return { ...fallbackSettings, ...settings }
    } else {
      return fallbackSettings
    }
  } catch (error) {
    console.warn('An error was encounted when parsing settings:\n' + oldSettings)
    return fallbackSettings
  }
}

export function setSettings (settings) {
  const userSettings = {}
  for (const key in getFallback()) {
    userSettings[key] = settings[key]
  }

  if (typeof localStorage !== 'undefined') {
    try {
      const newSettings = { version: STORAGE_VERSION, settings: userSettings }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings))
    } catch (error) {
      console.warn('An error was encounted when stringifying settings.')
      console.warn(error)
    }
  }

  return userSettings
}

export function useFallback (settings) {
  const fallbackSettings = getFallback()
  return Object.assign(settings, fallbackSettings)
}
