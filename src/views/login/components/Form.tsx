import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import logo from '../../../assets/logo.png'
import '../styles/formSignIn.css'
import '../styles/button.css'
import { Person, Envelope } from 'phosphor-react'
import { api } from '../../../lib/axios'

const form = () => {
  const [emailState, setEmailState] = useState({ value: '' })
  const [passState, setPassState] = useState({ value: '' })



  function handleEmailChange(event: ChangeEvent<HTMLInputElement>): void {
    setEmailState({ value: event.target.value })
  }

  function handlePassChange(event: ChangeEvent<HTMLInputElement>): void {
    setPassState({ value: event.target.value })
  }

  async function login(event: FormEvent) {
    event.preventDefault()

    if (!emailState.value || !passState.value) {
      return
    }

    const teste = await api.post('/user/auth', {
      email: emailState,
      senha: passState
    })

    setEmailState({value: ''})
    setPassState({value: ''})

    console.log(teste)
  }

  return (
    <form onSubmit={login} className="sign-in-form">
      <img src={logo} className='logoo' alt="logo" />
      <h2 className='title'>Entrar</h2>
      <div className="input-field">
        <i><Person /></i>
        <input autoComplete='current-password' type="email" name='email' placeholder="Email" value={emailState.value} onChange={handleEmailChange} />
      </div>

      <div className="input-field">
        <i><Envelope /></i>
        <input value={passState.value} name='pass' type="password" placeholder="Senha" onChange={handlePassChange} />
      </div>

      <button type="submit" value="Entrar" className="btn solid">Entrar</button>


    </form>
  )
}

export default form