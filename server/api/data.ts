import { readFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(() => {
  try {
    const filePath = resolve('assets/data/data.json')
    const jsonData = readFileSync(filePath, 'utf-8')
    return JSON.parse(jsonData)
  } catch (error) {
    console.error('Error reading JSON file:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load JSON data'
    })
  }
})
