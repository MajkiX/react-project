import React, { useContext, useEffect, useState } from 'react';
import bemCssModules from 'bem-css-modules'
import { StoreContext } from '../../store/StoreProvider';
import Modal from '../Modal/Modal';

import { default as LoginFormStyles } from './LoginForm.module.scss'
import request from '../../helpers/request';

const style = bemCssModules(LoginFormStyles)

const LoginForm = ({ handleOnClose, isModalOpen }) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [validateMessage, setValidateMessage] = useState('')

  const { setUser } = useContext(StoreContext)

  const resetStateOfInputs = () => {
    setLogin('')
    setPassword('')
    setValidateMessage('')
  }
  const handleOnChangeLogin = ({ target: { value } }) => setLogin(value)
  const handleOnChangePassword = ({ target: { value } }) => setPassword(value)
  const handleOnCloseModal = event => {
    event.preventDefault()
    handleOnClose()
  }
  const handleOnSubmit = async event => {
    event.preventDefault()
    const { data, status } = await request.post(
      '/users',
      { login, password }
    )
    if (status === 200) {
      setUser(data.user)
      resetStateOfInputs()
      handleOnClose()
    } else {
      setValidateMessage(data.message)
    }
  }

  useEffect(() => {
    if (isModalOpen) {
      resetStateOfInputs()
    }
  }, [isModalOpen])

  const validateMessageComponent = validateMessage.length
    ? <p className={style('validate-message')}>{validateMessage}</p> : null

  return (
    <Modal handleOnClose={handleOnClose} isOpen={isModalOpen} shouldBeCloseOnOutsideClick={true}>
      {validateMessageComponent}
      <form method='post' onSubmit={handleOnSubmit} className={style()}>
        <div className={style('row')}>
          <label>
            Login:
            <input onChange={handleOnChangeLogin} type="text" value={login} />
          </label>
        </div>
        <div className={style('row')}>
          <label>
            Hasło:
            <input onChange={handleOnChangePassword} type="password" value={password} />
          </label>
        </div>
        <div className={style('row')}>
          <button type='submit'>Zaloguj</button>
          <button onClick={handleOnCloseModal} type='button'>Anuluj</button>
        </div>
      </form>
    </Modal >
  );
}

export default LoginForm;