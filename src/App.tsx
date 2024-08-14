import './App.css'
import { Badge } from './components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable'
import { cn } from './lib/utils'

function ProjectBadge(title: string) {
  return (
    <div className='bg-background flex rounded-full'>
      <Badge>{title}</Badge>
    </div>
  )
}

const badges = [
  ProjectBadge("This"),
  ProjectBadge("works"),
  ProjectBadge("even"),
  ProjectBadge("with"),
  ProjectBadge("server"),
  ProjectBadge("components"),
]

function App() {
  return (
    <div className='text-left'>
      <h2>Default</h2>
      <p>usable on severSide, does not require js to wrap or calculate remaining elements</p>
      <ResizablePanelGroup direction="horizontal" >
        <ResizablePanel
          className="rounded-lg border p-4"
          defaultSize={25}

        >
          <span className={cn('flex flex-row flex-wrap basis-44 grow h-[22px] gap-2', "clipToOneLine")}>
            {badges.map((badge, index) => {
              const remainingBadgesCount = badges.length - (index + 1);
              const remainingBadgesCountIndicator = `+${remainingBadgesCount}`
              return (
                <span key={index} className="flex flex-row gap-x-2 items-center [&+&]:-ml-6">
                  {badge}
                  {!!remainingBadgesCount && <span className="text-xs text-gray-500 font-medium h-[22px] w-4 content-center" aria-hidden>{remainingBadgesCountIndicator}</span>}
                </span>
              )
            }) ?? null
            }
          </span>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel />
      </ResizablePanelGroup>
      <h2>With clickable indicator</h2>
      <ResizablePanelGroup direction="horizontal" >
        <ResizablePanel
          className="rounded-lg border p-4"
          defaultSize={25}

        >
          <span className={cn('flex flex-row flex-wrap basis-44 grow h-[22px] gap-2', "clipToOneLine")}>
            {badges.map((badge, index) => {
              const remainingBadgesCount = badges.length - (index + 1);
              return (
                <span key={index} className="flex flex-row gap-x-2 items-center [&+&]:-ml-6">
                  {badge}
                  <BadgeRemainingIndicator remainingBadgesCount={remainingBadgesCount} badges={badges} />
                </span>
              )
            }) ?? null
            }
          </span>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel />
      </ResizablePanelGroup>
    </div>
  )
}

interface BadgeIndicatorProps {
  remainingBadgesCount: number;
  badges: readonly JSX.Element[];
}


function BadgeRemainingIndicator(props: BadgeIndicatorProps) {
  const { remainingBadgesCount } = props;
  if (!remainingBadgesCount) return null
  const remainingBadgesCountIndicator = `+${remainingBadgesCount}`

  return (
    <Popover>
      <PopoverTrigger className="flex items-center" title={remainingBadgesCountIndicator ?? undefined}><span className="text-xs text-gray-500 font-medium h-[22px] w-4 content-center" aria-hidden>{remainingBadgesCountIndicator}</span></PopoverTrigger>
      <PopoverContent sideOffset={0} className="min-w-0 bg-transparent border-none shadow-none w-auto h-0 p-0">
        {props.badges.slice(-remainingBadgesCount).map((badge, index) => (
          <span className="flex bg-transparent focus:bg-transparent mt-2 w-max" key={index}>{badge}</span>
        ))}
      </PopoverContent>
    </Popover>
  )
}

export default App
