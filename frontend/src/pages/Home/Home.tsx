import SearchBox from "~/components/SearchBox/SearchBox"
import ApplicationTools from "./ApplicationTools/ApplicationTools"
import TopEmployers from "./TopEmployers/TopEmployers"
import NewJobs from "./NewJobs/NewJobs"


function Home(){
    return<>
        <SearchBox/>
        <ApplicationTools/>
        <TopEmployers/>
        <NewJobs/>

    
    </>
}
export default Home