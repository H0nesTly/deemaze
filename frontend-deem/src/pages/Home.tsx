import MyInput from '../components/MyInput/MyInput'
import { useNavigate } from "react-router";

import { ErrorBoundary } from "react-error-boundary";


function Home() {

    let navigate = useNavigate();

  async function search( formData:any) {
    const name = formData.get('username');
    console.log('user name',name);
    navigate("/document")
    
    // throw new Error("search error");
  }
  
  return (
    <>
      <div className="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">

        <img
          className="size-12 shrink-0"
          src="src/assets/react.svg"
          alt="ChitChat Logo"
        />
        <div>
      
          <div className="text-xl font-medium text-black dark:text-white">
            Login
          </div>
        <div className="text-xl font-medium text-black dark:text-white">
        <ErrorBoundary
            fallback={<p>There was an error while submitting the form</p>}
          >
            <form action={search} id="signup-form">
              <MyInput content='User' placeholder='User Name' name="username" />
              <button type="submit">Search</button>
            </form>
          </ErrorBoundary>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
