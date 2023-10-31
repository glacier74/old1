import { WidgetConfig, WidgetData } from '../WidgetProps'

export class GroupTitleWidget {
  protected config?: WidgetConfig<WidgetData>

  constructor(config?: WidgetConfig<WidgetData>) {
    this.config = config
  }

  public getComponent() {
    if (this.config) {
      return <GroupTitleWidget.Render {...this.config} />
    }

    return null
  }

  private static Render(config: WidgetConfig<WidgetData>) {
    return (
      <div className="text-lg p-4 mt-8 font-bold first-of-type:mt-0" data-id={config.id}>
        {config.data.overrides?.title}
      </div>
    )
  }
}
