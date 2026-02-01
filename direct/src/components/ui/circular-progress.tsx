
interface CircularProgressProps {
    value: number; // 0 to 100
    size?: number;
    strokeWidth?: number;
    color?: string;
}

export default function CircularProgress({
    value,
    size = 40,
    strokeWidth = 3,
    color = "#10b981"
}: CircularProgressProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                style={{ transform: 'rotate(-90deg)' }}
            >
                {/* Background Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke="#27272a"
                    strokeWidth={strokeWidth}
                />
                {/* Progress Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                />
            </svg>
            <span style={{
                position: 'absolute',
                fontSize: `${size * 0.25}px`,
                fontWeight: 600,
                color: '#e4e4e7'
            }}>
                {value}
            </span>
        </div>
    );
}
