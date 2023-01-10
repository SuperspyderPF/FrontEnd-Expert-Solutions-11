import React, {useState} from 'react';
const complete_number_length=14;
export default function PhoneInput() {
  const [value, setValue] = useState('')
  const onChange=event=>{
    setValue(format(event.target.value))
  }

  return (
    <>
      <input 
        type="tel"
        value={value}
        onChange={onChange}
        placeholder="(555) 555-5555" 
        />
      <button
        disabled={value.length < complete_number_length}
        onClick={() => setValue('')}
        >
        Submit
        </button>
    </>
  );
}
function format(str){
  const rawstring = str.replace(/\D/g, '');
  let output='';
  if(rawstring.length>0){
    output+='('
    output+=rawstring.substring(0, 3)
  }
  if(rawstring.length>3){
    output+=')';
    output += rawstring.substring(6, 10)
  }
  if(rawstring.length>3){
    output+='-'
    output+=rawstring.substring(6, 10)
  }
  return output
                        
}