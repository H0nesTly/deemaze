import { useEffect, useState } from "react"
import { DocumentItem } from "../components/DocumentItem/DocumentItem";
import '../style.css'
import apiInstance from '../services/APIInstance'
import { useNavigate } from "react-router";

function DocumentPage() {
  const [userName, setUserName] = useState<string>('Joao')
  const [loading,setLoading]= useState(true)
  const [data,setData]= useState<{id:string, fileName:string}[]>([])
  let navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try {
        const {data: response} = await apiInstance.get('/');
        setData(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }

    fetchData();
  }, []);


      
  const handlerOnClick= (event:any)=>{   
    navigate(`/document/${event.target.id}`)
  }

  return (
    
    <div id='docExplorer' className="flex flex-col">
    <div id='topBarContainer' className="flex flex-row basis-1/3">
        <div id='topBarNameContainer' className="basis-2/3 justify-start">
        <span> ola User :{userName}</span>
        </div>
        <div id='topBarActionContainer' className="basis-1/3 justify-start">
        <span> criar novo button</span>
        </div>
    </div>
    <div id='documentListContainer' className="flex justify-items-start">

      {loading && <div>Loading</div>}
    {!loading && (
      <div>
    <ul  style={{cursor:'pointer'}} onClick={(event)=>handlerOnClick(event)}>
      {...data.map((key) => <DocumentItem itemKey={key.id} itemVal={key.fileName} />)}
    </ul> 
    </div>
    )}
    </div>
    </div>

  )
}

export default DocumentPage
