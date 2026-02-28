import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { SkeletonList } from '../components/Skeleton'

export default function LogsPage() {
    const logs = useQuery(api.auditLog.list, { limit: 200 })

    return (
        <div className="logs-page">
            <h1>📋 System Logs</h1>
            <p style={{ color: 'var(--color-smoke-gray)', marginBottom: '24px' }}>
                Comprehensive system activity log.
            </p>

            {logs === undefined ? (
                <SkeletonList count={5} />
            ) : logs.length === 0 ? (
                <p style={{ color: 'var(--color-smoke-gray)' }}>No logs found.</p>
            ) : (
                <div className="logs-list">
                    {logs.map((log: any) => (
                        <div key={log._id} className="log-item">
                            <div className="log-item__header">
                                <span className={`audit-category-badge audit-category-badge--${log.category}`}>
                                    {log.category}
                                </span>
                                <span className="log-item__action">{log.action}</span>
                                <span className="log-item__time">
                                    {new Date(log.timestamp).toLocaleString()}
                                </span>
                            </div>
                            <pre className="log-item__details">{log.details}</pre>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
