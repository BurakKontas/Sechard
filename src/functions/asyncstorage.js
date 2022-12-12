import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      return value != null ? JSON.parse(value) : null
    } catch(e) {
      console.log(e)
    }
}

export const setData = async (key,value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch(e) {
    console.log(e)
  }
}

export const clearData = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch(e) {
    console.log(e)
  }
}
