import './Skeleton.scss'

interface SkeletonProps {
  height: string;
  width: string;
  variant?: string;
}

export default function Skeleton({ width, height, variant = "text" }: SkeletonProps) {
  return (
    <span className={`skeleton ${variant}`} style={{ height, width }} />
  )
}