export const ERRORS = {
  METAMASK_NOT_INSTALLED: {
    code: -600,
    message: "Metamask not installed",
  },
  USER_NOT_CONNECTED: {
    code: -601,
    message: "User not connected",
  },
} as const

export const EVENTS = {
  ON_METAMASK_ERROR: "ON_METAMASK_ERROR",
} as const

export const STR_TRUE = "true"
export const STR_FALSE = "false"
