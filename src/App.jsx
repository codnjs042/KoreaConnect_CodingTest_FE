import { useEffect, useState } from 'react'
import { ApiError, fetchEducations } from './api/education'
import EducationTable from './components/EducationTable'
import SearchForm from './components/SearchForm'
import { INITIAL_CONDITION } from './constants/education'
import './App.css'

function App() {
  // 조회할 때마다 새 객체로 교체되므로 같은 조건이어도 다시 조회한다.
  const [condition, setCondition] = useState(INITIAL_CONDITION)
  const [result, setResult] = useState({ condition: null, rows: [], error: null })

  useEffect(() => {
    const controller = new AbortController()
    fetchEducations(condition, controller.signal)
      .then((rows) => setResult({ condition, rows, error: null }))
      .catch((err) => {
        if (err.name === 'AbortError') return
        const error = err instanceof ApiError ? err.message : '서버에 연결할 수 없습니다.'
        setResult({ condition, rows: [], error })
      })
    return () => controller.abort()
  }, [condition])

  // 현재 조건에 대한 응답이 아직 도착하지 않았으면 로딩 중
  const loading = result.condition !== condition

  return (
    <main className="page">
      <header className="page-header">
        <h1>교육 수강내역</h1>
      </header>

      <SearchForm onSearch={(c) => setCondition({ ...c })} disabled={loading} />

      {result.error && !loading && (
        <p className="alert" role="alert">{result.error}</p>
      )}

      <EducationTable rows={result.rows} loading={loading} />
    </main>
  )
}

export default App
