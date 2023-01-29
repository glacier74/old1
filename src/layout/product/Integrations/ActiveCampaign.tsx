export const ActiveCampaign = () => {
  return (
    <div className="py-2 space-y-2">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center p-2 rounded-full shadow">
            <img className="h-8 w-8 aspect-1" src="/static/active-campaign.png" alt="" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <div className="text-sm font-medium text-gray-900 truncate">ActiveCampaign</div>
            <div className="px-1 py-0.5 text-[11px] leading-[1] font-bold uppercase rounded bg-yellow-500 text-white">
              By Zapier
            </div>
          </div>
          <p className="text-sm text-gray-500 truncate">
            Create ActiveCampaign contacts from new lead captures.
          </p>
        </div>
        <div>
          <a
            href="https://zapier.com/apps/earlybird/integrations/activecampaign"
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
