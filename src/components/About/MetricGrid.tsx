import { metrics } from '../../data/portfolio'

export function MetricGrid() {
  return (
    <div className="metric-grid">
      {metrics.map((item) => (
        <div className="metric-item" key={item.label}>
          <div className="metric-value">{item.value}</div>
          <div className="metric-copy">
            <span>{item.label}</span>
            <small>{item.note}</small>
          </div>
        </div>
      ))}
    </div>
  )
}
