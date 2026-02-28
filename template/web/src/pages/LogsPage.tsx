import { useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { SkeletonList } from '../components/Skeleton'

type LogLevel = "debug" | "info" | "warn" | "error" | "";

export default function LogsPage() {
    const [level, setLevel] = useState<LogLevel>("")
    const logs = useQuery(api.devLogs.list, level ? { level: level as any, limit: 200 } : { limit: 200 })

    return (
        <div className="logs-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h1>📋 System Dev Logs</h1>
                    <p style={{ color: 'var(--color-smoke-gray)', marginTop: '8px' }}>
                        Structured developer logs for debugging and system monitoring.
                    </p>
                </div>

                <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as LogLevel)}
                    className="admin-role-select"
                    style={{ minWidth: '160px' }}
                >
                    <option value="">All Levels</option>
                    <option value="error">Error Only</option>
                    <option value="warn">Warning & Error</option>
                    <option value="info">Info</option>
                    <option value="debug">Debug</option>
                </select>
            </div>

            {logs === undefined ? (
                <SkeletonList count={5} />
            ) : logs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 16px', color: 'var(--color-smoke-gray)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📭</div>
                    <p>No dev logs found for the selected level.</p>
                </div>
            ) : (
                <div className="logs-list">
                    {logs.map((log: any) => (
                        <div key={log._id} className={`log-item log-item--${log.level}`}>
                            <div className="log-item__header">
                                <span className={`log-level-badge log-level-badge--${log.level}`}>
                                    {log.level.toUpperCase()}
                                </span>
                                <span className="log-item__component">
                                    [{log.component}]
                                </span>
                                <span className="log-item__message" style={{ fontWeight: 500, marginLeft: '8px' }}>
                                    {log.message}
                                </span>
                                <span className="log-item__time">
                                    {new Date(log._creationTime).toLocaleString()}
                                </span>
                            </div>
                            {log.context && (
                                <pre className="log-item__details">
                                    {log.context}
                                </pre>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
