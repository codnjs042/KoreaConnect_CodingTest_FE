import { STATUS_LABEL } from '../constants/education'
import { downloadEducationCsv } from '../utils/csv'

function EducationTable({ rows, loading }) {
  return (
    <section className="result" aria-busy={loading}>
      <div className="result-toolbar">
        <span className="count">
          총 <strong>{rows.length.toLocaleString()}</strong>건
        </span>
        <button
          type="button"
          className="btn-excel"
          onClick={() => downloadEducationCsv(rows)}
          disabled={loading || rows.length === 0}
        >
          엑셀 다운로드
        </button>
      </div>

      <h2 className="result-title">교육 수강내역 목록</h2>

      <div className={`table-wrap${loading ? ' is-loading' : ''}`}>
        <table>
          <thead>
            <tr>
              <th scope="col">교육자</th>
              <th scope="col">교육시작일</th>
              <th scope="col">교육종료일</th>
              <th scope="col">과정명</th>
              <th scope="col">교육기관</th>
              <th scope="col">수강상태</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty">
                  {loading ? '조회 중입니다…' : '검색 결과가 없습니다.'}
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                // 응답에 식별자가 없어 순번을 키로 사용 (목록은 조회 단위로 통째로 교체됨)
                <tr key={i}>
                  <td className="nowrap">{row.name}</td>
                  <td className="nowrap">{row.startDate}</td>
                  <td className="nowrap">{row.endDate}</td>
                  <td className="col-course">{row.courseName}</td>
                  <td>{row.institution}</td>
                  <td className="nowrap">{STATUS_LABEL[row.status] ?? row.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default EducationTable
