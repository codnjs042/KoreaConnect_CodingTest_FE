import { useState } from 'react'
import {
  INITIAL_CONDITION,
  KEYWORD_MAX_LENGTH,
  SEARCH_TYPE_OPTIONS,
  STATUS_OPTIONS,
} from '../constants/education'

// 백엔드 EducationSearchRequest 검증과 동일한 규칙/메시지
function validate({ keyword, startDate, endDate }) {
  if (keyword.length > KEYWORD_MAX_LENGTH) return '검색어는 100자 이내로 입력해 주세요.'
  if (!startDate !== !endDate) return '시작일과 종료일을 모두 입력해 주세요.'
  if (startDate && endDate && startDate > endDate) return '시작일은 종료일보다 늦을 수 없습니다.'
  return null
}

function SearchForm({ onSearch, disabled }) {
  const [form, setForm] = useState(INITIAL_CONDITION)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const condition = { ...form, keyword: form.keyword.trim() }
    const message = validate(condition)
    if (message) {
      setError(message)
      return
    }
    onSearch(condition)
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <div className="field field-keyword">
        <label htmlFor="type">검색어</label>
        <div className="keyword-group">
          <select id="type" name="type" value={form.type} onChange={handleChange}>
            {SEARCH_TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <input
            name="keyword"
            type="search"
            aria-label="검색어"
            placeholder="과정명 또는 교육기관"
            maxLength={KEYWORD_MAX_LENGTH}
            value={form.keyword}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="field field-period">
        <label htmlFor="startDate">교육기간</label>
        <div className="period-group">
          <input id="startDate" name="startDate" type="date" value={form.startDate} onChange={handleChange} />
          <span aria-hidden="true">~</span>
          <input name="endDate" type="date" aria-label="교육종료일" value={form.endDate} onChange={handleChange} />
        </div>
      </div>

      <div className="form-footer">
        <div className="field field-status">
          <label htmlFor="status">수강상태</label>
          <select id="status" name="status" value={form.status} onChange={handleChange}>
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="actions">
          <button type="submit" className="btn-primary" disabled={disabled}>
            조회
          </button>
        </div>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}
    </form>
  )
}

export default SearchForm
