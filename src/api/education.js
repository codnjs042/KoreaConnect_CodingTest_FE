export class ApiError extends Error {}

// 빈 값은 쿼리스트링에서 제외해 백엔드에서 해당 조건이 적용되지 않도록 한다.
function toQueryString(condition) {
  const entries = Object.entries(condition).filter(([, v]) => v !== '' && v != null)
  return new URLSearchParams(entries).toString()
}

export async function fetchEducations(condition, signal) {
  const qs = toQueryString(condition)
  const res = await fetch(`/api/educations${qs ? `?${qs}` : ''}`, { signal })

  if (res.status === 400) {
    const body = await res.json().catch(() => null)
    throw new ApiError(body?.message ?? '검색 조건이 올바르지 않습니다.')
  }
  if (!res.ok) {
    throw new ApiError('조회 중 오류가 발생했습니다.')
  }
  return res.json()
}
