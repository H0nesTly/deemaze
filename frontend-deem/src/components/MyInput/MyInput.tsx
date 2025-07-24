import './MyInput.css'
//use html type
type MyInputProps =  {
    content: string;
    placeholder: string
    name: string
}

const MyInput = ({content, placeholder,name}: MyInputProps) => {

  return (
    <>
    <div id='inputContainer' >
        <label content={content}>
            <input placeholder={placeholder} name={name} />
        </label>
       
    </div>
    </>
  )
}

export default MyInput