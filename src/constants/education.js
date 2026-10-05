export const SEARCH_TYPE_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'courseName', label: '과정명' },
  { value: 'institution', label: '교육기관' },
]

export const STATUS_OPTIONS = [
  { value: '', label: '전체' },
  { value: 'IN_PROGRESS', label: '수강' },
  { value: 'COMPLETED', label: '수료' },
  { value: 'NOT_COMPLETED', label: '미수료' },
]

export const STATUS_LABEL = Object.fromEntries(
  STATUS_OPTIONS.filter((o) => o.value).map((o) => [o.value, o.label]),
)

export const KEYWORD_MAX_LENGTH = 100

export const INITIAL_CONDITION = {
  type: '',
  keyword: '',
  startDate: '',
  endDate: '',
  status: '',
}
