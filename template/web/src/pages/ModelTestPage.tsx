import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { SkeletonList } from '../components/Skeleton'

export default function ModelTestPage() {
    const testRuns = useQuery(api.modelTests.getTestRuns)

    return (
        <div className="model-test-page">
            <h1>🧪 Model Tests</h1>
            <p style={{ color: 'var(--color-smoke-gray)', marginBottom: '24px' }}>
                View AI model test results and performance metrics.
            </p>

            {testRuns === undefined ? (
                <SkeletonList count={3} />
            ) : testRuns.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 16px', color: 'var(--color-smoke-gray)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🧪</div>
                    <p>No test runs yet. Use the admin panel to run model tests.</p>
                </div>
            ) : (
                <div className="model-test-runs">
                    {testRuns.map((run: any) => (
                        <div key={run.testRunId} className="model-test-run">
                            <div className="model-test-run__header">
                                <strong>{run.testRunId}</strong>
                                <span style={{ color: 'var(--color-smoke-gray)' }}>
                                    {new Date(run.startedAt).toLocaleString()}
                                </span>
                            </div>
                            <div className="model-test-run__stats">
                                <span>{run.totalTests} tests</span>
                                <span style={{ color: 'var(--color-neon-emerald)' }}>{run.successCount} passed</span>
                                <span>Avg {Math.round(run.avgDurationMs)}ms</span>
                                <span>{[...new Set(run.models)].length} models</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
