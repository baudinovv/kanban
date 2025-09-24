
type Props = {
  className?: string;
}

export const MyLoader = (props: Props) => {
  return (
    <div className={"loader w-12 h-12 border-2 border-theme-text self-center animate-spin " + props.className}></div>
  )
}