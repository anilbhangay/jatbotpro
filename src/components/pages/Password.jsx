import React from 'react'

const Password = () => {
  return (
    <div>
        <div>
        <h2>Reset your jackBot password</h2>
    </div>
    <div>
        <h3>Reset password for</h3>
    <form >
    <div>
        <input type={type} onChange={handleChange} id="password" name='Password' placeholder='Password' /><br />
        {type==="Password"?(<span id='icon-eye-signup' onClick={()=>setType("text")}><FontAwesomeIcon  icon={faEyeSlash} size={18}/></span>):
        (<span id='icon-eye-signup' onClick={()=>setType("Password")}><FontAwesomeIcon icon={faEye} size={18}/></span>)}
        {errors.Password&&<span className='error-name-sign' id='error-name-pass'>{errors.Password}</span>}
    </div>
       <div><button type="submit" id="button-sigup">Conintnue</button></div>
      </form>
    </div>
  </div>
  )
}

export default Password;