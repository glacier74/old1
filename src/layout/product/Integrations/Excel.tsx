export const Excel = () => {
  return (
    <div className="py-2 space-y-2">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center p-2 rounded-full shadow">
            <img className="h-8 w-8 aspect-1" src="/static/excel.png" alt="" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <div className="text-sm font-medium text-slate-900 truncate">Microsoft Excel</div>
            <div className="px-1 py-0.5 text-[11px] leading-[1] font-bold uppercase rounded bg-yellow-500 text-white">
              By Zapier
            </div>
          </div>
          <p className="text-sm text-slate-500 truncate">
            Send new lead captures to an Excel spreadsheet.
          </p>
        </div>
        <div>
          <a
            href="https://zapier.com/apps/earlybird/integrations/excel"
            className="link-button !px-2.5 !py-1.5"
            target="_blank"
          >
            Connect
          </a>
        </div>
      </div>
    </div>
  )
}
