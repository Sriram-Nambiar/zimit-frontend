import type { InjectionKey } from 'vue'
import type { Config } from './config'

export default {
  not_set_magic_value: 'Not set',
  config: Symbol() as InjectionKey<Config>,
  rules: {
    required: (value: string) => !!value || 'Required.',
    email: (value: string) => !value || /.+@.+\..+/.test(value) || 'E-mail must be valid.',
    number: (value: string) => !value || !isNaN(Number(value)) || 'Must be a number.',
    url: (value: string) => {
      if (!value) return true
      if (!value.startsWith('http://') && !value.startsWith('https://')) {
        return 'Must be an HTTP(S) URL'
      }
      try {
        const parsed = new URL(value)
        return !!parsed.hostname || 'Must be an HTTP(S) URL'
      } catch {
        return 'Must be an HTTP(S) URL'
      }
    },
    integer: (value: string) =>
      !value || Number.isInteger(Number(value)) || 'Must be an integer value'
  }
}
