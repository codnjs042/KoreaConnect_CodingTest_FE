import { STATUS_LABEL } from '../constants/education'

const COLUMNS = [
  { header: '교육자', value: (row) => row.name },
  { header: '교육시작일', value: (row) => row.startDate },
  { header: '교육종료일', value: (row) => row.endDate },
  { header: '과정명', value: (row) => row.courseName },
  { header: '교육기관', value: (row) => row.institution },
  { header: '수강상태', value: (row) => STATUS_LABEL[row.status] ?? row.status },
]

// 쉼표, 따옴표, 줄바꿈이 포함된 값은 따옴표로 감싸고 내부 따옴표는 두 번 쓴다.
function escape(value) {
  const s = String(value ?? '')
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function downloadEducationCsv(rows) {
  const lines = [
    COLUMNS.map((c) => escape(c.header)).join(','),
    ...rows.map((row) => COLUMNS.map((c) => escape(c.value(row))).join(',')),
  ]
  // BOM을 붙여야 엑셀에서 한글이 깨지지 않는다.
  const blob = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = '교육 수강내역.csv'
  a.click()
  URL.revokeObjectURL(url)
}
