/* eslint-disable @typescript-eslint/no-explicit-any */
import { GameState } from '../models/GameState'

export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  postMany,
}

function query(entityType: string) {
  const entitiesToParse = localStorage.getItem(entityType)
  if (entitiesToParse) {
    const entities: GameState[] = JSON.parse(entitiesToParse)
    return entities
  }
  return []
}

function get(entityType: string, entityId: string) {
  const entities = query(entityType)
  return entities.find((entity: any) => entity._id === entityId)
}

function post(entityType: string, newEntity: GameState) {
  newEntity._id = _makeId(5)
  newEntity.createdAt = new Date().getTime()
  const entities = query(entityType)
  entities.push(newEntity)
  _save(entityType, entities)
  return newEntity
}

function postMany(entityType: string, newEntities: GameState[]) {
  const entities = query(entityType)
  entities.push(...newEntities)
  _save(entityType, entities)
  return entities
}

function put(entityType: string, updatedEntity: GameState) {
  const entities: GameState[] = query(entityType)
  const idx = entities.findIndex(
    (entity: GameState) => entity._id === updatedEntity._id
  )
  entities.splice(idx, 1, updatedEntity)
  _save(entityType, entities)
  return updatedEntity
}

function remove(entityType: string, entityId: string) {
  const entities: GameState[] = query(entityType)
  const idx = entities.findIndex((entity: any) => entity._id === entityId)
  entities.splice(idx, 1)
  _save(entityType, entities)
}

function _save(entityType: string, entities: any) {
  localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 8) {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
