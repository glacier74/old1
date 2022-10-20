export {}

declare global {
  type AnyMap<V, K = string> = Record<K, T>
  type StringMap = AnyMap<string>
}
