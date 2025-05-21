import { Middleware } from "@reduxjs/toolkit"
import { setLoading } from "@store/ui/slice"

interface ActionWithType {
  type: string
}

export const loadingMiddleware: Middleware = (store) => (next) => (action) => {
  const actionWithType = action as ActionWithType

  const isPending = actionWithType.type.endsWith("/pending")
  const isFulfilled = actionWithType.type.endsWith("/fulfilled")
  const isRejected = actionWithType.type.endsWith("/rejected")

  if (isPending) {
    store.dispatch(setLoading(true))
  }

  if (isFulfilled || isRejected) {
    store.dispatch(setLoading(false))
  }

  return next(action)
}
