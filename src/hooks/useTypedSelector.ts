import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../features'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
