import { useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { SkeletonList } from '../components/Skeleton'

export default function AuditLogsPage() {
    const [category, setCategory] = useState<string>('')
    const logs = useQuery(api.auditLog.list, category ? { category: category as any } : {})
    const stats = useQuery(api.auditLog.stats)

    return (
        <div className="audit-page">
            <h1>📋 Audit Logs</h1>

            {stats && (
                <div className="audit-stats">
                    <div className="audit-stat">
                        <span className="audit-stat__value">{stats.total24h}</span>
                        <span className="audit-stat__label">Events (24h)</span>
                    </div>
                    {Object.entries(stats.byCategory).map(([cat, count]) => (
                        <div key={cat} className="audit-stat">
                            <span className="audit-stat__value">{count as number}</span>
                            <span className="audit-stat__label">{cat}</span>
                        </div>
                    ))}
                </div>
            )}

            <div style={{ marginBottom: '16px' }}>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="admin-role-select"
                    style={{ minWidth: '160px' }}
                >
                    <option value="">All Categories</option>
                    <option value="auth">Auth</option>
                    <option value="admin">Admin</option>
                    <option value="system">System</option>
                    <option value="billing">Billing</option>
                </select>
            </div>

            {logs === undefined ? (
                <SkeletonList count={5} />
            ) : logs.length === 0 ? (
                <p style={{ color: 'var(--color-smoke-gray)' }}>No audit logs found.</p>
            ) : (
                <div className="audit-logs">
                    {logs.map((log: any) => (
                        <div key={log._id} className="audit-log-item">
                            <div className="audit-log-item__header">
                                <span className={`audit-category-badge audit-category-badge--${log.category}`}>
                                    {log.category}
                                </span>
                                <span className="audit-log-item__action">{log.action}</span>
                                <span className="audit-log-item__time">
                                    {new Date(log.timestamp).toLocaleString()}
                                </span>
                            </div>
                            <pre className="audit-log-item__details">{log.details}</pre>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
