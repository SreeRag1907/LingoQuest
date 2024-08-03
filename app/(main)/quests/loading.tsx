import { Loader } from "lucide-react"

const Loading = () =>{
    return(
        <div className="h-full w-full flex items-center justify-center ">
            <Loader className='animate-spin w-12 h-12 text-green-500 ' />
        </div>
    )
}

export default Loading;