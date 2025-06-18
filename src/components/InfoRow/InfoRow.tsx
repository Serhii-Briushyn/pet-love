interface InfoRowProps {
  label: string
  value?: string | null
  href?: string
  isExternal?: boolean
}

const InfoRow = ({ label, value, href, isExternal = false }: InfoRowProps) => {
  return (
    <span className="flex gap-0.5 text-sm text-black/50 dark:text-white/50">
      {label}:
      {value && href ? (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="line-clamp-1 text-black hover:underline dark:text-white"
          title={value}
        >
          {value}
        </a>
      ) : (
        <span className="text-black/30 italic dark:text-white/30">Not available</span>
      )}
    </span>
  )
}

export default InfoRow
