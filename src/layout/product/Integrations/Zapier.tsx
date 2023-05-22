export const Zapier = () => {
  return (
    <div className="py-2 space-y-2">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center p-2 rounded-full shadow">
            <img className="h-8 w-8 aspect-1" src="/static/zapier.png" alt="" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <div className="text-sm font-medium text-slate-900 truncate">Zapier</div>
          </div>
          <p className="text-sm text-slate-500 truncate">
            Send conversions to your favorite tools.
          </p>
        </div>
        <div>
          <a
            href="https://zapier.com/apps/earlybird"
            className="link-button !px-2.5 !py-1.5"
            target="_blank"
            rel="noreferrer"
          >
            Connect
          </a>
        </div>
      </div>
    </div>
  )
}
