import MyHeader from '../../4__widgets/MyHeader/MyHeader';
import { Feed } from '../../4__widgets/Feed/Feed';

export default function Home() {

  return (
    <>
      <MyHeader />
 
      <Feed className="w-full transition max-w-6xl mt-20 bg-background px-5 m-auto flex gap-10"/>
    </>
  )
}